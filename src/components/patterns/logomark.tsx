import logoUrl from '/ghost-logo.png?url'

export function Logomark({ className }: { className?: string }) {
  return (
    <div className={`size-6 flex items-center justify-center ${className ?? ''}`}>
      <img
        src={logoUrl}
        alt="Ghost"
        className="size-full object-contain"
        draggable={false}
      />
    </div>
  )
}
