import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import {
  BEZEL_PX,
  DeviceFrameTopBar,
  TOP_BAR_H_PX,
} from '@/components/patterns/device-frame'
import { FloatingChrome } from '@/components/patterns/floating-chrome'
import { SITE_MENU_WIDTH_PX } from '@/components/patterns/site-menu'
import { cn } from '@/lib/cn'

// Bezel left + capsule left inset + width + right gap before content starts.
const PINNED_OFFSET_PX = BEZEL_PX + 16 + SITE_MENU_WIDTH_PX + 16 // 309
// Once inside the white card (already inset by BEZEL_PX), the extra padding
// the card itself needs to clear the pinned sidebar.
const PINNED_CARD_PAD_PX = PINNED_OFFSET_PX - BEZEL_PX // 301

// Radius of the white card's rounded corners — visible as the inner frame.
const CARD_RADIUS_PX = 10

/** A single fixed transparent rounded rectangle whose huge box-shadow paints
 *  the entire bezel area around it. The content scrolls behind via the
 *  body; the shadow stays put. The inset values + radius animate when the
 *  page switches between bezel-on (Ghost / Network) and bezel-off (View
 *  site), so the side + bottom bezels visually retract / extend.
 */
function FrameMask({ showBezels }: { showBezels: boolean }) {
  return (
    <div
      aria-hidden
      className="fixed pointer-events-none z-30"
      style={{
        top: TOP_BAR_H_PX,
        left: showBezels ? BEZEL_PX : 0,
        right: showBezels ? BEZEL_PX : 0,
        bottom: showBezels ? BEZEL_PX : 0,
        borderRadius: showBezels ? CARD_RADIUS_PX : 0,
        boxShadow: '0 0 0 9999px #191919',
        transitionProperty: 'left, right, bottom, border-radius',
        transitionDuration: '520ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    />
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const viewSite = pathname === '/site'
  const network = pathname === '/network' || pathname.startsWith('/network/')
  // Floating chrome only appears in "Ghost mode" — everywhere except the
  // two top-bar tabs that have their own content treatment.
  const showChrome = !viewSite && !network
  // Side + bottom bezels render for every mode except View site.
  const showBezels = !viewSite

  const [pinned, setPinned] = useState(false)
  // Only the content inside the white card gets shifted when pinned. The
  // frame stays put.
  const cardPaddingLeft = pinned && showChrome ? PINNED_CARD_PAD_PX : 0

  return (
    <div
      className="min-h-full bg-background relative"
      style={
        {
          // Exposed for full-bleed content (e.g. the member-detail map
          // backdrop) to compensate for the pinned-sidebar shift.
          '--pinned-shift': `${cardPaddingLeft}px`,
        } as React.CSSProperties
      }
    >
      {/* Frame mask — same fixed element in every mode. Its insets animate
          between bezel-on (Ghost / Network) and bezel-off (View site). */}
      <FrameMask showBezels={showBezels} />

      {/* Top bar — fixed, above the frame mask so the nav text + stats sit on
          top of the black band the mask paints. */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <DeviceFrameTopBar />
      </div>

      {/* Floating chrome — only the Ghost mode shows the pill capsules. */}
      {showChrome && (
        <FloatingChrome pinned={pinned} onPinChange={setPinned} framed />
      )}

      {/* Wrapper provides the frame insets via padding. The black bg of the
          outer div shows through the side padding as the side bezels. */}
      <div
        className="min-h-full"
        style={{
          paddingTop: TOP_BAR_H_PX,
          paddingLeft: showBezels ? BEZEL_PX : 0,
          paddingRight: showBezels ? BEZEL_PX : 0,
          paddingBottom: showBezels ? BEZEL_PX : 0,
        }}
      >
        {/* White content card. Corners are NOT rounded here — the fixed
            InnerCorners overlays handle that so the curves stay visible at
            the viewport corners during scroll. */}
        <div
          className="bg-background"
          style={{
            minHeight: showBezels
              ? `calc(100vh - ${TOP_BAR_H_PX + BEZEL_PX}px)`
              : `calc(100vh - ${TOP_BAR_H_PX}px)`,
            paddingLeft: cardPaddingLeft,
            // Only animate padding-left while the floating chrome is mounted
            // (i.e. for pin / unpin clicks). On route changes that toggle
            // chrome off (View site / Network), snap the padding so the
            // iframe / page doesn't slide in from the sidebar offset.
            transitionProperty: showChrome ? 'padding-left' : 'none',
            transitionDuration: '520ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <main
            className={cn(
              'w-full',
              viewSite
                ? 'h-[calc(100vh-36px)] bg-[#2a2a2a]'
                : 'relative min-h-full max-w-[1080px] min-[1380px]:max-w-[1280px] mx-auto px-10 pt-[max(100px,4vw)]',
            )}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
