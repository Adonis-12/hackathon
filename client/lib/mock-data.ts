import type {
  MeResponse,
  TenantDetail,
  Project,
  Task,
  Member,
} from "./types"

export const mockMe: MeResponse = {
  user: { id: "u1", email: "alex@demo.com", name: "Alex Chen" },
  tenants: [
    { id: "t1", name: "Acme Corp", role: "owner" },
    { id: "t2", name: "Startup Labs", role: "admin" },
    { id: "t3", name: "Freelance Co", role: "member" },
  ],
}

export const mockTenantDetail: Record<string, TenantDetail> = {
  t1: { id: "t1", name: "Acme Corp", role: "owner", memberCount: 12 },
  t2: { id: "t2", name: "Startup Labs", role: "admin", memberCount: 5 },
  t3: { id: "t3", name: "Freelance Co", role: "member", memberCount: 3 },
}

export const mockProjects: Record<string, Project[]> = {
  t1: [
    { id: "p1", name: "Website Redesign", description: "Overhaul the marketing site with new brand", taskCount: 8, createdAt: "2026-01-15" },
    { id: "p2", name: "Mobile App v2", description: "Build the next version of our iOS/Android app", taskCount: 14, createdAt: "2026-02-01" },
    { id: "p3", name: "API Integration", description: "Connect third-party payment and analytics services", taskCount: 5, createdAt: "2026-02-10" },
    { id: "p4", name: "Internal Tools", description: "Dashboard and admin tools for the ops team", taskCount: 3, createdAt: "2026-02-14" },
  ],
  t2: [
    { id: "p5", name: "MVP Launch", description: "Get the core product live by end of month", taskCount: 10, createdAt: "2026-01-20" },
    { id: "p6", name: "User Research", description: "Conduct interviews and compile insights", taskCount: 4, createdAt: "2026-02-05" },
  ],
  t3: [
    { id: "p7", name: "Client Portal", description: "Self-service portal for client deliverables", taskCount: 6, createdAt: "2026-02-08" },
  ],
}

export const mockTasks: Record<string, Task[]> = {
  p1: [
    { id: "tk1", title: "Design homepage mockups", description: "Create Figma designs for the new homepage", status: "done", assigneeId: "u1", assigneeName: "Alex Chen", createdAt: "2026-01-16" },
    { id: "tk2", title: "Implement hero section", description: "Code the hero banner with animations", status: "in_progress", assigneeId: "u2", assigneeName: "Jordan Lee", createdAt: "2026-01-18" },
    { id: "tk3", title: "SEO audit", description: "Review meta tags and page structure", status: "not_started", assigneeId: null, assigneeName: null, createdAt: "2026-01-20" },
    { id: "tk4", title: "Mobile responsiveness", description: "Ensure all pages work on mobile devices", status: "not_started", assigneeId: "u3", assigneeName: "Sam Rivera", createdAt: "2026-01-22" },
    { id: "tk5", title: "Content migration", description: "Move blog posts to the new CMS", status: "in_progress", assigneeId: "u1", assigneeName: "Alex Chen", createdAt: "2026-01-25" },
  ],
  p2: [
    { id: "tk6", title: "Set up React Native project", description: "Initialize project with TypeScript template", status: "done", assigneeId: "u2", assigneeName: "Jordan Lee", createdAt: "2026-02-02" },
    { id: "tk7", title: "Authentication flow", description: "Implement login, signup, and password reset", status: "in_progress", assigneeId: "u2", assigneeName: "Jordan Lee", createdAt: "2026-02-03" },
    { id: "tk8", title: "Push notifications", description: "Set up Firebase Cloud Messaging", status: "not_started", assigneeId: null, assigneeName: null, createdAt: "2026-02-05" },
  ],
  p3: [
    { id: "tk9", title: "Stripe integration", description: "Connect Stripe for payment processing", status: "in_progress", assigneeId: "u1", assigneeName: "Alex Chen", createdAt: "2026-02-11" },
    { id: "tk10", title: "Analytics setup", description: "Add Mixpanel tracking events", status: "not_started", assigneeId: null, assigneeName: null, createdAt: "2026-02-12" },
  ],
  p4: [
    { id: "tk11", title: "Admin dashboard layout", description: "Create the base layout for internal tools", status: "not_started", assigneeId: "u3", assigneeName: "Sam Rivera", createdAt: "2026-02-15" },
  ],
  p5: [
    { id: "tk12", title: "Landing page", description: "Build a conversion-focused landing page", status: "done", assigneeId: "u1", assigneeName: "Alex Chen", createdAt: "2026-01-21" },
    { id: "tk13", title: "User onboarding", description: "Create the first-time user experience", status: "in_progress", assigneeId: "u4", assigneeName: "Casey Kim", createdAt: "2026-01-25" },
  ],
  p6: [
    { id: "tk14", title: "Interview script", description: "Prepare questions for user interviews", status: "done", assigneeId: "u4", assigneeName: "Casey Kim", createdAt: "2026-02-06" },
  ],
  p7: [
    { id: "tk15", title: "File upload feature", description: "Allow clients to upload deliverables", status: "in_progress", assigneeId: "u1", assigneeName: "Alex Chen", createdAt: "2026-02-09" },
  ],
}

export const mockMembers: Record<string, Member[]> = {
  t1: [
    { id: "m1", userId: "u1", name: "Alex Chen", email: "alex@demo.com", role: "owner", joinedAt: "2025-06-01" },
    { id: "m2", userId: "u2", name: "Jordan Lee", email: "jordan@demo.com", role: "admin", joinedAt: "2025-07-15" },
    { id: "m3", userId: "u3", name: "Sam Rivera", email: "sam@demo.com", role: "member", joinedAt: "2025-08-20" },
    { id: "m4", userId: "u4", name: "Casey Kim", email: "casey@demo.com", role: "member", joinedAt: "2025-09-10" },
    { id: "m5", userId: "u5", name: "Morgan Patel", email: "morgan@demo.com", role: "member", joinedAt: "2025-10-05" },
  ],
  t2: [
    { id: "m6", userId: "u1", name: "Alex Chen", email: "alex@demo.com", role: "admin", joinedAt: "2025-09-01" },
    { id: "m7", userId: "u4", name: "Casey Kim", email: "casey@demo.com", role: "owner", joinedAt: "2025-08-01" },
    { id: "m8", userId: "u6", name: "Taylor Brooks", email: "taylor@demo.com", role: "member", joinedAt: "2025-10-15" },
  ],
  t3: [
    { id: "m9", userId: "u1", name: "Alex Chen", email: "alex@demo.com", role: "member", joinedAt: "2025-11-01" },
    { id: "m10", userId: "u7", name: "Riley Nguyen", email: "riley@demo.com", role: "owner", joinedAt: "2025-10-01" },
  ],
}
