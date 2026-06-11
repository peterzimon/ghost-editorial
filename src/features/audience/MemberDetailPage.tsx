import { useId } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MoreHorizontal, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Page } from '@/components/templates/page'
import { SectionHeading } from '@/components/patterns/section-heading'
import { Breadcrumb } from '@/components/patterns/breadcrumb'
import { cn } from '@/lib/cn'
import { mockMembers, type Member } from './mockMembers'
import { MemberAvatar } from './MemberAvatar'
import { MemberSubscriptions } from './MemberSubscriptions'
import { MemberNewsletters } from './MemberNewsletters'
import { MemberDetailMap } from './MemberDetailMap'
import { coordsFor } from './city-coords'
import { newslettersFor, subscriptionsFor } from './member-subscriptions-data'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function formatDate(d: Date) {
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function emailFor(member: Member): string {
  if (member.name.includes('@')) return member.name
  const handle = member.name
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .trim()
    .replace(/\s+/g, '.')
  return `${handle}@example.com`
}

function deriveDetail(member: Member) {
  const hash = [...member.id].reduce((s, c) => s + c.charCodeAt(0), 0)
  const emailsReceived = 1800 + (hash % 21) * 100
  const emailsOpened = Math.round((emailsReceived * member.openRate) / 100)
  const lastSeen = new Date(member.createdAt)
  lastSeen.setUTCDate(lastSeen.getUTCDate() + 41)
  return { emailsReceived, emailsOpened, lastSeen }
}

export function MemberDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const member = mockMembers.find((m) => m.id === id)

  if (!member) {
    return (
      <Page>
        <Page.Header>
          <Page.Title>Member not found</Page.Title>
        </Page.Header>
        <Page.Content>
          <button
            type="button"
            onClick={() => navigate('/audience/members')}
            className="t-button text-foreground hover:text-muted transition-colors cursor-pointer"
          >
            Back to members
          </button>
        </Page.Content>
      </Page>
    )
  }

  const email = emailFor(member)
  const { emailsReceived, emailsOpened, lastSeen } = deriveDetail(member)
  const labels = id === 'm2' ? ['VIP'] : ['Subscriber']
  const commentStatus: 'active' | 'blocked' = id === 'm2' ? 'blocked' : 'active'
  const subscriptions = subscriptionsFor(member.id)
  const newsletters = newslettersFor(member.id)

  return (
    <Page>
      <div className="absolute top-[46px] left-10 right-10 z-20">
        <Breadcrumb
          items={[
            { label: 'Members', to: '/audience/members' },
            { label: member.name },
          ]}
        />
      </div>
      <div className="relative mt-6 pt-[120px]">
        <div
          aria-hidden
          className="absolute -top-[148px] bottom-0 z-0 pointer-events-none overflow-hidden"
          style={{
            left: `calc((100% - 100vw) / 2)`,
            right: `calc((100% - 100vw) / 2)`,
          }}
        >
          <MemberDetailMap lat={coordsFor(member.location)[0]} lng={coordsFor(member.location)[1]} />
        </div>
        <Page.Header className="relative z-10 items-center border-b-0">
          <div className="flex-1 flex items-center gap-4">
            <MemberAvatar avatar={member.avatar} name={member.name} className="size-10 rounded-[4px]" />
            <h1 className="t-h1">{member.name}</h1>
          </div>
          <Page.Actions>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal className="size-4" />
            </Button>
            <Button variant="primary">Save</Button>
          </Page.Actions>
        </Page.Header>
      </div>

      <Page.Content className="pt-8">
        <div className="grid grid-cols-3 gap-10">
          <div className="col-span-2 flex flex-col gap-14 border-r border-border pr-10">
            <DetailsSection name={member.name} email={email} labels={labels} />
            <section>
              <SectionHeading className="border-b-0 pb-0">Subscriptions</SectionHeading>
              <MemberSubscriptions subscriptions={subscriptions} />
            </section>
            <section>
              <SectionHeading className="border-b-0 pb-0">Newsletters</SectionHeading>
              <MemberNewsletters newsletters={newsletters} />
            </section>
          </div>

          <aside className="flex flex-col gap-10 pt-2">
            <EmailStats
              emailsReceived={emailsReceived}
              emailsOpened={emailsOpened}
              openRate={member.openRate}
            />
            <InfoBlock
              location={member.location}
              createdAt={member.createdAt}
              lastSeen={lastSeen}
            />
            <CommentStatusBlock status={commentStatus} />
          </aside>
        </div>
      </Page.Content>
    </Page>
  )
}

function DetailsSection({ name, email, labels }: { name: string; email: string; labels: string[] }) {
  return (
    <section>
      <SectionHeading className="border-b-0 pb-0">Details</SectionHeading>
      <div className="grid grid-cols-2 gap-8 mt-6">
        <div className="flex flex-col gap-5">
          <TextField label="Name" defaultValue={name} />
          <TextField label="Email" defaultValue={email} type="email" />
          <TextField label="Labels" defaultValue={labels.join(', ')} />
        </div>
        <TextField label="Notes" placeholder="No notes" multiline />
      </div>
    </section>
  )
}

interface TextFieldProps {
  label: string
  defaultValue?: string
  placeholder?: string
  multiline?: boolean
  type?: 'text' | 'email'
}

function TextField({
  label,
  defaultValue,
  placeholder,
  multiline = false,
  type = 'text',
}: TextFieldProps) {
  const id = useId()
  const inputClasses = cn(
    'w-full bg-elevated rounded-[2px] px-3 text-foreground text-[14px] border-0 outline-none',
    'placeholder:text-muted focus:ring-1 focus:ring-foreground/30',
    multiline ? 'min-h-[172px] py-3 resize-none' : 'h-8',
  )

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="t-info text-muted">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClasses}
        />
      ) : (
        <input
          id={id}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  )
}

function EmailStats({
  emailsReceived,
  emailsOpened,
  openRate,
}: {
  emailsReceived: number
  emailsOpened: number
  openRate: number
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 gap-6">
        <StatNumber label="Emails received" value={emailsReceived.toLocaleString('en-US')} />
        <StatNumber label="Emails opened" value={emailsOpened.toLocaleString('en-US')} />
      </div>
      <StatNumber label="Open rate" value={`${openRate}%`} />
    </div>
  )
}

function StatNumber({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="t-info text-muted">{label}</p>
      <p
        className="font-sans text-[32px] leading-none tracking-[-0.025em] text-foreground"
        style={{ fontVariationSettings: "'opsz' 36, 'wght' 400" }}
      >
        {value}
      </p>
    </div>
  )
}

function InfoBlock({
  location,
  createdAt,
  lastSeen,
}: {
  location: string
  createdAt: Date
  lastSeen: Date
}) {
  return (
    <div className="flex flex-col gap-6">
      <InfoRow label="Location" value={location} />
      <InfoRow label="Created" value={formatDate(createdAt)} />
      <InfoRow label="Last seen" value={formatDate(lastSeen)} />
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="t-info text-muted">{label}</p>
      <p className="text-foreground text-[14px]">{value}</p>
    </div>
  )
}

function CommentStatusBlock({ status }: { status: 'active' | 'blocked' }) {
  const isBlocked = status === 'blocked'
  return (
    <div className="flex flex-col gap-3">
      <p className="t-info text-muted">Comment status</p>
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center gap-2">
          <ShieldAlert
            className={cn('size-4', isBlocked ? 'text-accent' : 'text-positive')}
            strokeWidth={1.75}
          />
          <span className="t-info text-foreground">{isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
        <button
          type="button"
          className="t-info text-foreground hover:text-muted transition-colors cursor-pointer"
        >
          Manage
        </button>
      </div>
    </div>
  )
}
