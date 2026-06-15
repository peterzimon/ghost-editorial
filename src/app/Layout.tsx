import { useEffect, useRef, useState } from 'react'
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

// Shared timing for the frame ↔ automation-editor transition.
const FRAME_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'
const FRAME_DURATION_MS = 520

/** A single fixed transparent rounded rectangle whose huge box-shadow paints
 *  the entire bezel area around it. All four insets + radius animate so the
 *  frame can shrink to "nothing" (automation editor) or retract just the
 *  side+bottom bezels (View site).
 */
function FrameMask({
  showBezels,
  showTopBezel,
}: {
  showBezels: boolean
  showTopBezel: boolean
}) {
  return (
    <div
      aria-hidden
      className="fixed pointer-events-none z-30"
      style={{
        top: showTopBezel ? TOP_BAR_H_PX : 0,
        left: showBezels ? BEZEL_PX : 0,
        right: showBezels ? BEZEL_PX : 0,
        bottom: showBezels ? BEZEL_PX : 0,
        borderRadius: showBezels ? CARD_RADIUS_PX : 0,
        boxShadow: '0 0 0 9999px #191919',
        transitionProperty: 'top, left, right, bottom, border-radius',
        transitionDuration: `${FRAME_DURATION_MS}ms`,
        transitionTimingFunction: FRAME_EASE,
      }}
    />
  )
}

export function Layout() {
  const { pathname } = useLocation()
  const viewSite = pathname === '/site'
  const network = pathname === '/network' || pathname.startsWith('/network/')
  // Automation editor: full-bleed, the device chrome animates out and the
  // editor's own top bar slides in (handled in AutomationDetailPage).
  const isAutomationEditor = /^\/growth\/automations\/[^/]+$/.test(pathname)
  // Floating chrome only appears in "Ghost mode" — everywhere except the
  // top-bar tabs and the automation editor.
  const showChrome = !viewSite && !network && !isAutomationEditor
  // Side + bottom bezels render for every mode except View site and the
  // automation editor.
  const showBezels = !viewSite && !isAutomationEditor
  // The top bar slides up out of view in the automation editor.
  const hideTopBar = isAutomationEditor

  const [pinned, setPinned] = useState(false)
  // Only the content inside the white card gets shifted when pinned. The
  // frame stays put.
  const cardPaddingLeft = pinned && showChrome ? PINNED_CARD_PAD_PX : 0

  // Detect when showChrome itself flips (route in/out of Ghost mode) so we
  // can suppress the padding-left transition on that specific render —
  // otherwise navigating back into a pinned Ghost route would visibly
  // animate the content sliding in from the left edge.
  const prevShowChromeRef = useRef(showChrome)
  const showChromeJustChanged = prevShowChromeRef.current !== showChrome
  useEffect(() => {
    prevShowChromeRef.current = showChrome
  })

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
      {/* Frame mask — top inset retracts when entering the automation editor
          so the whole frame disappears. */}
      <FrameMask showBezels={showBezels} showTopBezel={!isAutomationEditor} />

      {/* Top bar — slides up out of view when entering the automation editor. */}
      <div
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          transform: hideTopBar ? 'translateY(-100%)' : 'translateY(0)',
          transitionProperty: 'transform',
          transitionDuration: `${FRAME_DURATION_MS}ms`,
          transitionTimingFunction: FRAME_EASE,
        }}
      >
        <DeviceFrameTopBar />
      </div>

      {/* Floating chrome — only the Ghost mode shows the pill capsules. */}
      {showChrome && (
        <FloatingChrome pinned={pinned} onPinChange={setPinned} framed />
      )}

      {/* Wrapper provides the frame insets via padding. Insets animate so the
          page content grows to fill the viewport when the chrome retracts. */}
      <div
        className="min-h-full"
        style={{
          paddingTop: isAutomationEditor ? 0 : TOP_BAR_H_PX,
          paddingLeft: showBezels ? BEZEL_PX : 0,
          paddingRight: showBezels ? BEZEL_PX : 0,
          paddingBottom: showBezels ? BEZEL_PX : 0,
          transitionProperty: 'padding',
          transitionDuration: `${FRAME_DURATION_MS}ms`,
          transitionTimingFunction: FRAME_EASE,
        }}
      >
        <div
          className="bg-background"
          style={{
            // AE needs an explicit height so its h-full children can cascade
            // to fill the viewport; other modes only need min-height.
            height: isAutomationEditor ? '100vh' : undefined,
            minHeight: isAutomationEditor
              ? undefined
              : showBezels
                ? `calc(100vh - ${TOP_BAR_H_PX + BEZEL_PX}px)`
                : `calc(100vh - ${TOP_BAR_H_PX}px)`,
            paddingLeft: cardPaddingLeft,
            // Only animate padding-left for pin / unpin clicks inside Ghost
            // mode. Snap on route changes that toggle chrome on or off
            // (View site / Network / AE), otherwise the content would
            // visibly slide in from the left when re-entering Ghost.
            transitionProperty:
              showChrome && !showChromeJustChanged ? 'padding-left' : 'none',
            transitionDuration: '520ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <main
            className={cn(
              'w-full',
              isAutomationEditor
                ? 'h-full'
                : viewSite
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
