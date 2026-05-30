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
import { MembersPage } from './features/audience/MembersPage'
import { CommentsPage } from './features/audience/CommentsPage'
import { AutomationsPage } from './features/growth/AutomationsPage'
import { GrowthToolsPage } from './features/growth/GrowthToolsPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/content/posts" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/*" element={<DashboardPage />} />

          <Route path="/network" element={<NetworkPage />} />
          <Route path="/network/*" element={<NetworkPage />} />

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
          <Route path="/audience/members" element={<MembersPage />} />
          <Route path="/audience/members/*" element={<MembersPage />} />
          <Route path="/audience/comments" element={<CommentsPage />} />

          <Route path="/growth" element={<Navigate to="/growth/automations" replace />} />
          <Route path="/growth/automations" element={<AutomationsPage />} />
          <Route path="/growth/tools" element={<GrowthToolsPage />} />

          <Route path="/posts" element={<Navigate to="/content/posts" replace />} />

          <Route path="*" element={<Navigate to="/content/posts" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
