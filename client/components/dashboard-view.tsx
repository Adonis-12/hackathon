"use client"

import type { TenantDetail, Project } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, FolderKanban, Users, Shield } from "lucide-react"

interface DashboardViewProps {
  tenant: TenantDetail
  projects: Project[]
  onNavigateProjects: () => void
  onNavigateMembers: () => void
}

export function DashboardView({
  tenant,
  projects,
  onNavigateProjects,
  onNavigateMembers,
}: DashboardViewProps) {
  const totalTasks = projects.reduce((sum, p) => sum + p.taskCount, 0)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
          {tenant.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Workspace overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<Shield className="h-4 w-4" />}
          label="Your Role"
          value={<Badge variant="default" className="text-xs">{tenant.role}</Badge>}
        />
        <StatsCard
          icon={<FolderKanban className="h-4 w-4" />}
          label="Projects"
          value={projects.length.toString()}
          onClick={onNavigateProjects}
        />
        <StatsCard
          icon={<Users className="h-4 w-4" />}
          label="Members"
          value={tenant.memberCount.toString()}
          onClick={onNavigateMembers}
        />
        <StatsCard
          icon={<Building2 className="h-4 w-4" />}
          label="Total Tasks"
          value={totalTasks.toString()}
        />
      </div>

      {/* Recent projects */}
      <div>
        <h2 className="mb-3 text-lg font-medium text-foreground">
          Recent Projects
        </h2>
        {projects.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              No projects yet. Create your first project to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <Card key={project.id} className="cursor-pointer transition-colors hover:border-primary/30" onClick={onNavigateProjects}>
                <CardHeader>
                  <CardTitle className="text-base">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FolderKanban className="h-3 w-3" />
                    {project.taskCount} tasks
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function StatsCard({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  onClick?: () => void
}) {
  return (
    <Card
      className={onClick ? "cursor-pointer transition-colors hover:border-primary/30" : ""}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <div className="mt-0.5 text-xl font-semibold text-foreground">{value}</div>
        </div>
      </CardContent>
    </Card>
  )
}
