interface StableLabelProps {
  /** The label text. Rendered twice so the element reserves its widest (bold) width. */
  children: string
}

/**
 * Reserves space for the bold (active) version of a label so toggling between
 * medium and semibold weights doesn't shift the layout.
 *
 * Trick: a hidden semibold copy in a CSS grid cell sets the width, the visible
 * copy stacks in the same cell at whatever weight the parent applies.
 */
export function StableLabel({ children }: StableLabelProps) {
  return (
    <span className="grid">
      <span aria-hidden className="invisible font-semibold col-start-1 row-start-1 whitespace-nowrap">
        {children}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap">{children}</span>
    </span>
  )
}
