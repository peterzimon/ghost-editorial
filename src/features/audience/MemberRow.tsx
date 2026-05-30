import { MemberAvatar } from './MemberAvatar'
import type { Member } from './mockMembers'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatCreated(d: Date) {
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()} ${d.getUTCFullYear()}`
}

export function MemberRow({ member }: { member: Member }) {
  return (
    <div className="flex gap-2 items-center px-5 py-4 border-b border-border hover:bg-row-hover cursor-pointer">
      <div className="flex-1 min-w-0 flex gap-[14px] items-center">
        <MemberAvatar avatar={member.avatar} name={member.name} />
        <p className="text-[14px] font-medium text-foreground truncate">{member.name}</p>
      </div>
      <p className="flex-1 min-w-0 text-[12px] text-foreground">{member.openRate}%</p>
      <p className="flex-1 min-w-0 text-[12px] text-foreground">{member.location}</p>
      <p className="flex-1 min-w-0 text-[12px] text-foreground">{formatCreated(member.createdAt)}</p>
    </div>
  )
}
