import type { Avatar } from './mockMembers'
import { cn } from '@/lib/cn'

interface MemberAvatarProps {
  avatar: Avatar
  name: string
  /** Tailwind class for sizing — defaults to size-8 (32px). */
  className?: string
}

export function MemberAvatar({ avatar, name, className = 'size-8' }: MemberAvatarProps) {
  if (avatar.kind === 'photo') {
    return (
      <div className={cn('shrink-0 overflow-hidden rounded-full', className)}>
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
      className={cn(
        'shrink-0 flex items-center justify-center rounded-full text-foreground text-[13px] font-semibold',
        className,
      )}
      style={{ backgroundColor: avatar.bg }}
    >
      {avatar.text}
    </div>
  )
}
