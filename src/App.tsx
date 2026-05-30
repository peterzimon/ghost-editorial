import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './app/Layout'
import { PostsPage } from './features/posts/PostsPage'
import { PostEditorPage } from './features/posts/PostEditorPage'
import { PostAnalyticsPage } from './features/posts/PostAnalyticsPage'
import { PagesPage } from './features/pages/PagesPage'
import { TagsPage } from './features/tags/TagsPage'
import { MediaPage } from './features/media/MediaPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { NetworkPage } from './features/network/NetworkPage'
import { ReaderPage } from './features/network/ReaderPage'
import { MembersPage } from './features/audience/MembersPage'
import { CommentsPage } from './features/audience/CommentsPage'
import { AutomationsPage } from './features/growth/AutomationsPage'
import { GrowthToolsPage } from './features/growth/GrowthToolsPage'
import { SitePreviewPage } from './features/site/SitePreviewPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage view="overview" />} />
          <Route path="/dashboard/web-analytics" element={<DashboardPage view="web-analytics" />} />
          <Route path="/dashboard/newsletters" element={<DashboardPage view="newsletters" />} />
          <Route path="/dashboard/growth" element={<DashboardPage view="growth" />} />
          <Route path="/dashboard/sources" element={<DashboardPage view="sources" />} />

          <Route path="/network" element={<Navigate to="/network/reader" replace />} />
          <Route path="/network/reader" element={<ReaderPage />} />
          <Route path="/network/notes" element={<NetworkPage view="notes" />} />
          <Route path="/network/explore" element={<NetworkPage view="explore" />} />
          <Route path="/network/profile" element={<NetworkPage view="profile" />} />

          <Route path="/content" element={<Navigate to="/content/posts" replace />} />
          <Route path="/content/posts" element={<PostsPage filter="all" />} />
          <Route path="/content/posts/drafts" element={<PostsPage filter="draft" />} />
          <Route path="/content/posts/scheduled" element={<PostsPage filter="scheduled" />} />
          <Route path="/content/posts/published" element={<PostsPage filter="published" />} />
          <Route path="/content/posts/:id/edit" element={<PostEditorPage />} />
          <Route path="/content/posts/:id/analytics" element={<PostAnalyticsPage />} />
          <Route path="/content/pages" element={<PagesPage />} />
          <Route path="/content/tags" element={<TagsPage />} />
          <Route path="/content/media" element={<MediaPage />} />

          <Route path="/audience" element={<Navigate to="/audience/members" replace />} />
          <Route path="/audience/members" element={<MembersPage filter="all" />} />
          <Route path="/audience/members/vip" element={<MembersPage filter="vip" />} />
          <Route path="/audience/members/friends" element={<MembersPage filter="friends" />} />
          <Route path="/audience/members/early-birds" element={<MembersPage filter="early-birds" />} />
          <Route path="/audience/comments" element={<CommentsPage />} />

          <Route path="/growth" element={<Navigate to="/growth/automations" replace />} />
          <Route path="/growth/automations" element={<AutomationsPage />} />
          <Route path="/growth/tools" element={<GrowthToolsPage />} />

          <Route path="/site" element={<SitePreviewPage />} />

          <Route path="/posts" element={<Navigate to="/content/posts" replace />} />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
