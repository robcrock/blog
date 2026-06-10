import { ExhibitTile } from "./exhibit-tile";
import type { Exhibit } from "./registry";

interface LabGalleryProps {
  exhibits: Exhibit[];
}

/**
 * Hairline lattice: the container draws the top/left edges, each tile
 * draws its own bottom/right — so partial last rows stay clean at
 * every breakpoint.
 */
export function LabGallery({ exhibits }: LabGalleryProps) {
  return (
    <div className="grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {exhibits.map((exhibit) => (
        <ExhibitTile key={exhibit.slug} exhibit={exhibit} />
      ))}
    </div>
  );
}
