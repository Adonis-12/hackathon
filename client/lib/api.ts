import type {
  MeResponse,
  TenantDetail,
  Project,
  Task,
  Member,
} from "./types"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || ""

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json()
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ message: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request<{ message: string }>("/auth/logout", { method: "POST" }),

  // User
  me: () => request<MeResponse>("/me"),

  // Tenants
  getTenant: (tenantId: string) =>
    request<TenantDetail>(`/tenants/${tenantId}`),

  // Projects
  getProjects: (tenantId: string) =>
    request<Project[]>(`/tenants/${tenantId}/projects`),

  createProject: (tenantId: string, data: { name: string; description: string }) =>
    request<Project>(`/tenants/${tenantId}/projects`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Tasks
  getTasks: (tenantId: string, projectId: string) =>
    request<Task[]>(`/tenants/${tenantId}/projects/${projectId}/tasks`),

  createTask: (
    tenantId: string,
    projectId: string,
    data: { title: string; description: string }
  ) =>
    request<Task>(`/tenants/${tenantId}/projects/${projectId}/tasks`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateTask: (
    tenantId: string,
    projectId: string,
    taskId: string,
    data: Partial<Task>
  ) =>
    request<Task>(`/tenants/${tenantId}/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  // Members
  getMembers: (tenantId: string) =>
    request<Member[]>(`/tenants/${tenantId}/members`),

  inviteMember: (tenantId: string, email: string, role: string) =>
    request<{ message: string }>(`/tenants/${tenantId}/invites`, {
      method: "POST",
      body: JSON.stringify({ email, role }),
    }),
}
