import logoUrl from '/ghost-logo.png?url'

export function Logomark({ className }: { className?: string }) {
  return (
    <div className={`size-6 shrink-0 flex items-center justify-center ${className ?? ''}`}>
      <img
        src={logoUrl}
        alt="Shmøergh"
        width={24}
        height={24}
        className="size-6 object-contain"
        draggable={false}
      />
    </div>
  )
}
