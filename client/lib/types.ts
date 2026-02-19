export type Role = "owner" | "admin" | "member"

export type TaskStatus = "not_started" | "in_progress" | "done"

export interface User {
  id: string
  email: string
  name: string
}

export interface Tenant {
  id: string
  name: string
  role: Role
}

export interface TenantDetail {
  id: string
  name: string
  role: Role
  memberCount: number
}

export interface Project {
  id: string
  name: string
  description: string
  taskCount: number
  createdAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  assigneeId: string | null
  assigneeName: string | null
  createdAt: string
}

export interface Member {
  id: string
  userId: string
  name: string
  email: string
  role: Role
  joinedAt: string
}

export interface MeResponse {
  user: User
  tenants: Tenant[]
}
