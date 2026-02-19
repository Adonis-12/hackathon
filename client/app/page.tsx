"use client"

import { useState, useCallback } from "react"
import { useAuth } from "@/lib/auth-context"
import type { Tenant, Project, Task, TenantDetail, Member } from "@/lib/types"
import {
  mockMe,
  mockTenantDetail,
  mockProjects,
  mockTasks,
  mockMembers,
} from "@/lib/mock-data"
import { LoginForm } from "@/components/login-form"
import { TenantSelector } from "@/components/tenant-selector"
import { AppShell } from "@/components/app-shell"
import { DashboardView } from "@/components/dashboard-view"
import { ProjectsView } from "@/components/projects-view"
import { ProjectDetailView } from "@/components/project-detail-view"
import { MembersView } from "@/components/members-view"
import { toast } from "sonner"

type AppScreen = "login" | "tenant-select" | "app"
type AppView = "dashboard" | "projects" | "project-detail" | "members"

export default function Page() {
  const {
    user,
    tenants,
    currentTenant,
    setAuth,
    setCurrentTenant,
    clearAuth,
  } = useAuth()

  const [screen, setScreen] = useState<AppScreen>("login")
  const [view, setView] = useState<AppView>("dashboard")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Local mutable state for mock data
  const [projectsData, setProjectsData] = useState(mockProjects)
  const [tasksData, setTasksData] = useState(mockTasks)

  // Login handler (mock - accepts any credentials)
  const handleLogin = useCallback(
    async (_email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 600))
      setAuth(mockMe.user, mockMe.tenants)
      setScreen("tenant-select")
    },
    [setAuth]
  )

  // Logout handler
  const handleLogout = useCallback(() => {
    clearAuth()
    setScreen("login")
    setView("dashboard")
    setSelectedProject(null)
  }, [clearAuth])

  // Tenant selection
  const handleSelectTenant = useCallback(
    (tenant: Tenant) => {
      setCurrentTenant(tenant)
      setView("dashboard")
      setSelectedProject(null)
      setScreen("app")
    },
    [setCurrentTenant]
  )

  // Switch tenant (go back to selector)
  const handleSwitchTenant = useCallback(() => {
    setScreen("tenant-select")
    setView("dashboard")
    setSelectedProject(null)
  }, [])

  // Navigate views
  const handleNavigate = useCallback((v: AppView) => {
    setView(v)
    if (v !== "project-detail") setSelectedProject(null)
  }, [])

  // Project selection
  const handleSelectProject = useCallback((project: Project) => {
    setSelectedProject(project)
    setView("project-detail")
  }, [])

  // Create project
  const handleCreateProject = useCallback(
    (data: { name: string; description: string }) => {
      if (!currentTenant) return
      const newProject: Project = {
        id: `p-${Date.now()}`,
        name: data.name,
        description: data.description,
        taskCount: 0,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setProjectsData((prev) => ({
        ...prev,
        [currentTenant.id]: [...(prev[currentTenant.id] || []), newProject],
      }))
      toast.success("Project created")
    },
    [currentTenant]
  )

  // Create task
  const handleCreateTask = useCallback(
    (data: { title: string; description: string }) => {
      if (!selectedProject) return
      const newTask: Task = {
        id: `tk-${Date.now()}`,
        title: data.title,
        description: data.description,
        status: "not_started",
        assigneeId: null,
        assigneeName: null,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTasksData((prev) => ({
        ...prev,
        [selectedProject.id]: [...(prev[selectedProject.id] || []), newTask],
      }))
      toast.success("Task created")
    },
    [selectedProject]
  )

  // Update task
  const handleUpdateTask = useCallback(
    (taskId: string, data: Partial<Task>) => {
      if (!selectedProject) return
      setTasksData((prev) => ({
        ...prev,
        [selectedProject.id]: (prev[selectedProject.id] || []).map((t) =>
          t.id === taskId ? { ...t, ...data } : t
        ),
      }))
      toast.success("Task updated")
    },
    [selectedProject]
  )

  // Invite member (mock)
  const handleInvite = useCallback(
    (email: string, role: string) => {
      toast.success(`Invite sent to ${email} as ${role}`)
    },
    []
  )

  // --- Render ---

  if (screen === "login") {
    return <LoginForm onLogin={handleLogin} />
  }

  if (screen === "tenant-select" && user) {
    return (
      <TenantSelector
        user={user}
        tenants={tenants}
        onSelectTenant={handleSelectTenant}
        onLogout={handleLogout}
      />
    )
  }

  if (screen === "app" && currentTenant) {
    const tenantDetail: TenantDetail =
      mockTenantDetail[currentTenant.id] || {
        ...currentTenant,
        memberCount: 0,
      }
    const projects = projectsData[currentTenant.id] || []
    const tasks = selectedProject
      ? tasksData[selectedProject.id] || []
      : []
    const members: Member[] = mockMembers[currentTenant.id] || []
    const canEdit = currentTenant.role === "owner" || currentTenant.role === "admin"

    return (
      <AppShell
        currentView={view}
        onNavigate={handleNavigate}
        onSwitchTenant={handleSwitchTenant}
        onLogout={handleLogout}
      >
        {view === "dashboard" && (
          <DashboardView
            tenant={tenantDetail}
            projects={projects}
            onNavigateProjects={() => handleNavigate("projects")}
            onNavigateMembers={() => handleNavigate("members")}
          />
        )}
        {view === "projects" && (
          <ProjectsView
            projects={projects}
            canCreate={canEdit}
            onCreateProject={handleCreateProject}
            onSelectProject={handleSelectProject}
          />
        )}
        {view === "project-detail" && selectedProject && (
          <ProjectDetailView
            project={selectedProject}
            tasks={tasks}
            members={members}
            canEdit={canEdit}
            onBack={() => handleNavigate("projects")}
            onCreateTask={handleCreateTask}
            onUpdateTask={handleUpdateTask}
          />
        )}
        {view === "members" && (
          <MembersView
            members={members}
            canInvite={canEdit}
            onInvite={handleInvite}
          />
        )}
      </AppShell>
    )
  }

  return null
}
