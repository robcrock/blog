#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────
# process-craft-video.sh
#
# Wraps the 3-step ffmpeg workflow into a single command:
#   1. Web-optimized MP4 (H.264)
#   2. WebM (VP9)
#   3. Blur placeholder (base64, copied to clipboard)
#
# Usage:
#   ./scripts/process-craft-video.sh <source-video> <slug>
#
# Example:
#   ./scripts/process-craft-video.sh ~/Desktop/recordings/dot-grid.mp4 interactive-dot-grid
#
# Prerequisites:
#   - ffmpeg installed (brew install ffmpeg)
#   - macOS (uses pbcopy for clipboard)
# ─────────────────────────────────────────────────────────

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <source-video> <slug>"
  echo "Example: $0 ~/Desktop/recording.mp4 interactive-dot-grid"
  exit 1
fi

SOURCE="$1"
SLUG="$2"

# Resolve project root relative to this script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

OUTPUT_DIR="$PROJECT_ROOT/public/video/$SLUG"

if [[ ! -f "$SOURCE" ]]; then
  echo "Error: Source file not found: $SOURCE"
  exit 1
fi

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg is not installed. Run: brew install ffmpeg"
  exit 1
fi

echo "Processing: $SOURCE → $SLUG"
echo "Output dir: $OUTPUT_DIR"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# ── 1. Web-optimized MP4 ────────────────────────────────
echo "▸ Encoding MP4 (H.264)..."
ffmpeg -y -i "$SOURCE" \
  -c:v libx264 -crf 28 -preset slow \
  -vf "scale=1280:-2" \
  -an -movflags +faststart -pix_fmt yuv420p \
  "$OUTPUT_DIR/preview.mp4" \
  2>/dev/null

# ── 2. WebM version ─────────────────────────────────────
echo "▸ Encoding WebM (VP9)..."
ffmpeg -y -i "$SOURCE" \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -vf "scale=1280:-2" \
  -an \
  "$OUTPUT_DIR/preview.webm" \
  2>/dev/null

# ── 3. Blur placeholder ─────────────────────────────────
echo "▸ Generating blur placeholder..."
POSTER_TMP="/tmp/craft-poster-$SLUG.jpg"

ffmpeg -y -i "$SOURCE" \
  -vframes 1 -vf "scale=40:-1" -q:v 5 \
  -update 1 \
  "$POSTER_TMP" \
  2>/dev/null

POSTER_BASE64=$(base64 -i "$POSTER_TMP" | tr -d '\n')
POSTER_DATA_URI="data:image/jpeg;base64,$POSTER_BASE64"

# Copy to clipboard
echo -n "$POSTER_DATA_URI" | pbcopy

# Clean up temp file
rm -f "$POSTER_TMP"

# ── Summary ──────────────────────────────────────────────
MP4_SIZE=$(ls -lh "$OUTPUT_DIR/preview.mp4" | awk '{print $5}')
WEBM_SIZE=$(ls -lh "$OUTPUT_DIR/preview.webm" | awk '{print $5}')

echo ""
echo "✓ Done!"
echo ""
echo "  MP4:  $MP4_SIZE  ($OUTPUT_DIR/preview.mp4)"
echo "  WebM: $WEBM_SIZE ($OUTPUT_DIR/preview.webm)"
echo "  Poster: copied to clipboard (${#POSTER_BASE64} chars)"
echo ""
echo "── Frontmatter to paste into content/craft/$SLUG.mdx ──"
echo ""
echo "video: \"/video/$SLUG/preview.mp4\""
echo "poster: \"$POSTER_DATA_URI\""
