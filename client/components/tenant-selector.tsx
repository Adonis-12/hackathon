"use client"

import type { User, Tenant } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building2, ChevronRight, LogOut, User as UserIcon } from "lucide-react"

interface TenantSelectorProps {
  user: User
  tenants: Tenant[]
  onSelectTenant: (tenant: Tenant) => void
  onLogout: () => void
}

function roleBadgeVariant(role: string) {
  switch (role) {
    case "owner":
      return "default" as const
    case "admin":
      return "secondary" as const
    default:
      return "outline" as const
  }
}

export function TenantSelector({
  user,
  tenants,
  onSelectTenant,
  onLogout,
}: TenantSelectorProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <UserIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-semibold text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select a workspace</CardTitle>
            <CardDescription>
              Choose a tenant to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {tenants.map((tenant) => (
              <button
                key={tenant.id}
                onClick={() => onSelectTenant(tenant)}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-4 text-left transition-colors hover:bg-secondary"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {tenant.name}
                  </p>
                  <Badge variant={roleBadgeVariant(tenant.role)} className="mt-1">
                    {tenant.role}
                  </Badge>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center">
          <Button variant="ghost" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  )
}
