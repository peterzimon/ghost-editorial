import { MemberRow } from './MemberRow'
import { mockMembers } from './mockMembers'

const COLUMNS = ['Name', 'Open rate', 'Location', 'Created'] as const

export function MemberList() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 items-center h-[52px] px-4 py-4 border-b border-border t-info text-muted">
        {COLUMNS.map((label) => (
          <p key={label} className="flex-1 min-w-0">
            {label}
          </p>
        ))}
      </div>
      {mockMembers.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  )
}
