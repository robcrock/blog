import type { ComponentType } from "react";

import { DistanceTriangleExhibit } from "./exhibits/distance-triangle-exhibit";
import { DotGridExhibit } from "./exhibits/dot-grid-exhibit";
import { FeyChartExhibit } from "./exhibits/fey-chart-exhibit";
import { LikeButtonExhibit } from "./exhibits/like-button-exhibit";
import { PopoverOriginExhibit } from "./exhibits/popover-origin-exhibit";
import { ProximityRevealExhibit } from "./exhibits/proximity-reveal-exhibit";
import { RangeMappingExhibit } from "./exhibits/range-mapping-exhibit";
import { RippleExhibit } from "./exhibits/ripple-exhibit";
import { TimerExhibit } from "./exhibits/timer-exhibit";
import { ToastExhibit } from "./exhibits/toast-exhibit";
import { TransformExhibit } from "./exhibits/transform-exhibit";

export type ChapterId = "interaction" | "svg" | "particles";

export interface Chapter {
  id: ChapterId;
  numeral: string;
  title: string;
  intro: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: "interaction",
    numeral: "I",
    title: "Interaction Studies",
    intro:
      "Cursor distance, transform origins, and the small feedback loops that make interfaces feel attentive. Built natively for this site.",
  },
  {
    id: "svg",
    numeral: "II",
    title: "Drawing with SVG",
    intro:
      "Strokes that draw themselves, paths as motion rails, masks, morphs, and the odd corners of the SVG spec. Exercises straight out of the sandbox.",
  },
  {
    id: "particles",
    numeral: "III",
    title: "Particles & Play",
    intro:
      "Keyframes from scratch, then particle systems — one dispersion study at a time, from first burst to magic wand.",
  },
];

export interface Exhibit {
  number: string;
  slug: string;
  title: string;
  description: string;
  chapter: ChapterId;
  /** How to interact; omit for pieces you just look at */
  hint?: "Hover" | "Click" | "Drag" | "Auto";
  /** Link to the long-form craft essay, when one is published */
  essayHref?: string;
  /** Native exhibit component */
  Component?: ComponentType;
  /** Static demo URL for sandbox-exported exhibits */
  src?: string;
  /** Scale-down factor for demos designed for a full browser window */
  frameScale?: number;
}

type ExhibitInput = Omit<Exhibit, "number">;

const sandboxSrc = (slug: string) => `/lab/sandboxes/${slug}/index.html`;

const INTERACTION: ExhibitInput[] = [
  {
    slug: "distance-triangle",
    title: "Distance Triangle",
    description:
      "Pythagoras, live — the right triangle behind every cursor distance.",
    chapter: "interaction",
    hint: "Hover",
    essayHref: "/craft/proximity-reveal",
    Component: DistanceTriangleExhibit,
  },
  {
    slug: "range-mapping",
    title: "Range Mapping",
    description:
      "clampedNormalize — one range in, another out, never past the rails.",
    chapter: "interaction",
    hint: "Hover",
    essayHref: "/craft/interactive-dot-grid",
    Component: RangeMappingExhibit,
  },
  {
    slug: "dot-grid-field",
    title: "Dot Grid Field",
    description:
      "Hundreds of SVG dots scaled by proximity, painted outside the React render path.",
    chapter: "interaction",
    hint: "Hover",
    essayHref: "/craft/interactive-dot-grid",
    Component: DotGridExhibit,
  },
  {
    slug: "proximity-reveal",
    title: "Proximity Reveal",
    description: "Blur and lift resolve as the cursor closes the distance.",
    chapter: "interaction",
    hint: "Hover",
    essayHref: "/craft/proximity-reveal",
    Component: ProximityRevealExhibit,
  },
  {
    slug: "transform-play",
    title: "Transform Play",
    description:
      "Pointer position drives rotation and scale through a single transform.",
    chapter: "interaction",
    hint: "Hover",
    essayHref: "/craft/transform-explorer",
    Component: TransformExhibit,
  },
  {
    slug: "origin-aware-popover",
    title: "Origin-Aware Popover",
    description:
      "Same animation, nine origins — growth should start at the anchor.",
    chapter: "interaction",
    hint: "Click",
    Component: PopoverOriginExhibit,
  },
  {
    slug: "ripple-button",
    title: "Ripple Button",
    description:
      "Two staggered keyframes spawn a wave at the exact click point.",
    chapter: "interaction",
    hint: "Click",
    Component: RippleExhibit,
  },
  {
    slug: "toast-choreography",
    title: "Toast Choreography",
    description:
      "Stacked, timed, dismissed — notification motion that stays out of the way.",
    chapter: "interaction",
    hint: "Click",
    Component: ToastExhibit,
  },
];

const SVG_DRAWING: ExhibitInput[] = [
  {
    slug: "draw-the-path",
    title: "Draw the Path",
    description:
      "stroke-dasharray plus dashoffset — the classic self-drawing line.",
    chapter: "svg",
    hint: "Hover",
    src: sandboxSrc("draw-the-path"),
  },
  {
    slug: "setting-path-length",
    title: "Setting Path Length",
    description:
      "pathLength normalizes any path to 100 — draw loops without measuring.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("setting-path-length"),
  },
  {
    slug: "swoop-template",
    title: "Swoop Template",
    description:
      "A reusable underline swoop, drawn on hover through an SVG <use>.",
    chapter: "svg",
    hint: "Hover",
    src: sandboxSrc("swoop-template"),
  },
  {
    slug: "masked-line-animation",
    title: "Masked Line",
    description: "A dash animation revealed through an SVG mask.",
    chapter: "svg",
    hint: "Hover",
    src: sandboxSrc("masked-line-animation"),
  },
  {
    slug: "animate-dotted-line",
    title: "Dotted Line Draw",
    description:
      "A dotted path draws itself by masking a solid twin underneath.",
    chapter: "svg",
    hint: "Auto",
    src: sandboxSrc("animate-dotted-line"),
  },
  {
    slug: "bell-icon",
    title: "Bell Mute Toggle",
    description:
      "The strike-through draws across the bell — and unmasks itself on the way out.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("bell-icon"),
  },
  {
    slug: "light-along-a-path",
    title: "Light Along a Path",
    description: "A pulse of light travels the wire between two nodes.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("light-along-a-path"),
  },
  {
    slug: "animating-light",
    title: "Animating Light",
    description:
      "A repeating gradient slides along the strokes like current through wires.",
    chapter: "svg",
    hint: "Auto",
    src: sandboxSrc("animating-light"),
  },
  {
    slug: "animate-along-path",
    title: "Animate Along a Path",
    description:
      "SMIL sends a dash of light around a tangled scribble.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("animate-along-path"),
  },
  {
    slug: "animate-along-path-open-close",
    title: "Open / Close Along a Path",
    description:
      "A menu icon whose dashes travel their paths between states.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("animate-along-path-open-close"),
  },
  {
    slug: "morph-path-inbox",
    title: "Inbox Arrow Morph",
    description:
      "A chained SMIL sequence — the arrow drops, morphs, and resets.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("morph-path-inbox"),
  },
  {
    slug: "morphing-svgs-simple",
    title: "Polygon Morph",
    description:
      "Point interpolation morphs a triangle flat and back again.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("morphing-svgs-simple"),
  },
  {
    slug: "play-button-with-motion",
    title: "Play / Pause Morph",
    description:
      "Path interpolation via the Motion library — play melts into pause.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("play-button-with-motion"),
  },
  {
    slug: "move-along-curved-path-cd",
    title: "CD Insert",
    description:
      "offset-path slides the disc into the player along a curve.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("move-along-curved-path-cd"),
  },
  {
    slug: "path-circuit",
    title: "Path Circuit",
    description:
      "Shapes traced with raw M, L, and Z commands — the path syntax, learned by hand.",
    chapter: "svg",
    src: sandboxSrc("path-circuit"),
  },
  {
    slug: "animated-circuit",
    title: "Animated Circuit",
    description:
      "Three dashes race a circuit board, growing and shrinking as they go.",
    chapter: "svg",
    hint: "Auto",
    src: sandboxSrc("animated-circuit"),
  },
  {
    slug: "arc-playground",
    title: "Arc Playground",
    description: "The SVG arc command dissected, one A segment at a time.",
    chapter: "svg",
    src: sandboxSrc("arc-playground"),
  },
  {
    slug: "viewbox-animation",
    title: "viewBox Camera",
    description:
      "Pan the camera, not the shapes — animating the viewBox with rAF.",
    chapter: "svg",
    hint: "Click",
    src: sandboxSrc("viewbox-animation"),
  },
  {
    slug: "non-scaling-stroke",
    title: "Non-Scaling Stroke",
    description:
      "vector-effect keeps line weight constant while the artwork scales.",
    chapter: "svg",
    src: sandboxSrc("non-scaling-stroke"),
  },
  {
    slug: "squishy-svg-with-min-width",
    title: "Squishy SVG",
    description:
      "min-width lets the artwork squish gracefully instead of shrinking away.",
    chapter: "svg",
    src: sandboxSrc("squishy-svg-with-min-width"),
  },
  {
    slug: "paint-order",
    title: "Paint Order",
    description:
      "paint-order: stroke fill — outlined type without the crusty overlap.",
    chapter: "svg",
    src: sandboxSrc("paint-order"),
  },
  {
    slug: "radial-progress",
    title: "Radial Progress",
    description:
      "A range input drives a circular progress ring through dashoffset.",
    chapter: "svg",
    hint: "Drag",
    src: sandboxSrc("radial-progress"),
  },
  {
    slug: "sparkline",
    title: "Sparkline",
    description:
      "A chart that draws itself on hover, scaled with normalize().",
    chapter: "svg",
    hint: "Hover",
    src: sandboxSrc("sparkline"),
  },
  {
    slug: "animated-timer",
    title: "Animated Timer",
    description:
      "The ring drains and the hand sweeps — SMIL triggered straight from the play button.",
    chapter: "svg",
    hint: "Click",
    Component: TimerExhibit,
  },
  {
    slug: "fey-chart",
    title: "Fey Radar Chart",
    description:
      "The polygon morphs on a spline while the labels count along the same curve.",
    chapter: "svg",
    hint: "Click",
    Component: FeyChartExhibit,
  },
];

const PARTICLES: ExhibitInput[] = [
  {
    slug: "requestion-animation-frame",
    title: "rAF From Scratch",
    description:
      "A hand-rolled animate() — easing functions over requestAnimationFrame.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("requestion-animation-frame"),
  },
  {
    slug: "bounce-animation",
    title: "Bounce",
    description:
      "Three balls, one keyframe — distance and duration set by custom properties.",
    chapter: "particles",
    hint: "Auto",
    src: sandboxSrc("bounce-animation"),
  },
  {
    slug: "dynamic-keyframes",
    title: "Dynamic Keyframes",
    description:
      "Oscillation tuned per ball with CSS variables; the button freezes them mid-flight.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dynamic-keyframes"),
  },
  {
    slug: "blinky-face",
    title: "Blinky Face",
    description:
      "Eyes blink by animating the ellipse ry attribute straight from CSS.",
    chapter: "particles",
    hint: "Auto",
    src: sandboxSrc("blinky-face"),
  },
  {
    slug: "shimmer",
    title: "Shimmer",
    description:
      "A sheen sweeps the buy button on hover — and on focus, for keyboards.",
    chapter: "particles",
    hint: "Hover",
    src: sandboxSrc("shimmer"),
  },
  {
    slug: "rocket-ship",
    title: "Rocket Ship",
    description:
      "Exhaust particles spawn on an interval beneath a gently hovering rocket.",
    chapter: "particles",
    hint: "Auto",
    src: sandboxSrc("rocket-ship"),
  },
  {
    slug: "disperse-from-center",
    title: "Disperse From Center",
    description:
      "The first burst — particles scatter from the heart with random offsets.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("disperse-from-center"),
  },
  {
    slug: "dispersion-using-css-variables",
    title: "Dispersion: CSS Variables",
    description:
      "JS does the math once and hands the offsets to CSS as custom properties.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dispersion-using-css-variables"),
  },
  {
    slug: "dispersion-with-polar-coordinates",
    title: "Dispersion: Polar Coordinates",
    description:
      "Angle and distance instead of x/y — even spread around the circle.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dispersion-with-polar-coordinates"),
  },
  {
    slug: "dispersion-with-less-randomness",
    title: "Dispersion: Less Randomness",
    description:
      "Evenly spaced angles with a touch of jitter — order, with a little chaos.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dispersion-with-less-randomness"),
  },
  {
    slug: "dispersion-with-linear-iterpolation",
    title: "Dispersion: Interpolation",
    description:
      "Twenty-five particles interpolated around the full circle.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dispersion-with-linear-iterpolation"),
  },
  {
    slug: "dispersion-with-partial-keyframes",
    title: "Dispersion: Partial Keyframes",
    description:
      "Keyframes without a from block inherit each particle's starting state.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dispersion-with-partial-keyframes"),
  },
  {
    slug: "dispersion-trig-magic-wand",
    title: "Magic Wand",
    description:
      "Click anywhere — sparkles burst from the cursor with sin/cos offsets.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("dispersion-trig-magic-wand"),
  },
  {
    slug: "color-shifting",
    title: "Color Shifting",
    description:
      "Particles hue-rotate as they fade — one filter, the whole rainbow.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("color-shifting"),
  },
  {
    slug: "heart-particles-simple",
    title: "Heart Particles",
    description: "The minimal cut of the heart-burst pattern.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("heart-particles-simple"),
  },
  {
    slug: "popping-circle-mask",
    title: "Popping Circle",
    description:
      "A pop ring grown with an SVG mask — r is animatable from CSS.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("popping-circle-mask"),
  },
  {
    slug: "masked-heart",
    title: "Masked Heart",
    description:
      "Each like slides a rect beneath the mask — exponential easing tops it off.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("masked-heart"),
  },
  {
    slug: "falling-emojis",
    title: "Falling Emojis",
    description:
      "Confetti rain — emoji spawned, animated, and cleaned up on a timer.",
    chapter: "particles",
    hint: "Auto",
    src: sandboxSrc("falling-emjois-joshs-solution"),
  },
  {
    slug: "prefers-reduced-motion",
    title: "Reduced Motion",
    description:
      "The same burst, gated by prefers-reduced-motion in both CSS and JS.",
    chapter: "particles",
    hint: "Click",
    src: sandboxSrc("prefers-reduced-motion"),
  },
  {
    slug: "like-button-react",
    title: "Like Button, in React",
    description:
      "Where the dispersion series lands — pop, hue-shift, and twinkle, with React owning the particle list.",
    chapter: "particles",
    hint: "Click",
    Component: LikeButtonExhibit,
  },
];

export const EXHIBITS: Exhibit[] = [
  ...INTERACTION,
  ...SVG_DRAWING,
  ...PARTICLES,
].map((exhibit, index) => ({
  ...exhibit,
  number: String(index + 1).padStart(2, "0"),
}));

export const exhibitsByChapter = (id: ChapterId): Exhibit[] =>
  EXHIBITS.filter((exhibit) => exhibit.chapter === id);
