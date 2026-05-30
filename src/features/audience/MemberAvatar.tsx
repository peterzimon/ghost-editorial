import type { Avatar } from './mockMembers'

export function MemberAvatar({ avatar, name }: { avatar: Avatar; name: string }) {
  if (avatar.kind === 'photo') {
    return (
      <div className="size-8 shrink-0 overflow-hidden">
        <img
          src={avatar.src}
          alt={name}
          loading="lazy"
          className="size-full object-cover"
          draggable={false}
        />
      </div>
    )
  }

  return (
    <div
      className="size-8 shrink-0 flex items-center justify-center text-foreground text-[13px] font-semibold"
      style={{ backgroundColor: avatar.bg }}
    >
      {avatar.text}
    </div>
  )
}
