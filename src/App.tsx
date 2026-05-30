import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './app/Layout'
import { PlaceholderPage } from './app/PlaceholderPage'
import { PostsPage } from './features/posts/PostsPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/content/posts" replace />} />

          <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" note="Coming soon — pages for this section are designed but not built yet." />} />
          <Route path="/dashboard/*" element={<PlaceholderPage title="Dashboard" note="Coming soon — pages for this section are designed but not built yet." />} />

          <Route path="/network" element={<PlaceholderPage title="Network" note="Coming soon." />} />
          <Route path="/network/*" element={<PlaceholderPage title="Network" note="Coming soon." />} />

          <Route path="/content" element={<Navigate to="/content/posts" replace />} />
          <Route path="/content/posts" element={<PostsPage filter="all" />} />
          <Route path="/content/posts/drafts" element={<PostsPage filter="draft" />} />
          <Route path="/content/posts/scheduled" element={<PostsPage filter="scheduled" />} />
          <Route path="/content/posts/published" element={<PostsPage filter="published" />} />
          <Route path="/content/posts/:id/edit" element={<PlaceholderPage title="Editor" note="Coming soon — post editing isn't part of this prototype yet." />} />
          <Route path="/content/posts/:id/analytics" element={<PlaceholderPage title="Post analytics" note="Coming soon." />} />
          <Route path="/content/pages" element={<PlaceholderPage title="Pages" note="Coming soon." />} />
          <Route path="/content/tags" element={<PlaceholderPage title="Tags" note="Coming soon." />} />
          <Route path="/content/media" element={<PlaceholderPage title="Media" note="Coming soon." />} />

          <Route path="/audience" element={<Navigate to="/audience/members" replace />} />
          <Route path="/audience/*" element={<PlaceholderPage title="Audience" note="Coming soon." />} />

          <Route path="/growth" element={<Navigate to="/growth/automations" replace />} />
          <Route path="/growth/*" element={<PlaceholderPage title="Growth" note="Coming soon." />} />

          <Route path="/posts" element={<Navigate to="/content/posts" replace />} />

          <Route path="*" element={<PlaceholderPage title="Not found" />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
