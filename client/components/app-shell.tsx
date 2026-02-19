"use client"

import { useState } from "react"
import type { Tenant } from "@/lib/types"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
  Building2,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Users,
  ChevronDown,
  Menu,
  X,
} from "lucide-react"

type AppView = "dashboard" | "projects" | "project-detail" | "members"

interface AppShellProps {
  children: React.ReactNode
  currentView: AppView
  onNavigate: (view: AppView) => void
  onSwitchTenant: () => void
  onLogout: () => void
}

const navItems: { view: AppView; label: string; icon: React.ReactNode }[] = [
  { view: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { view: "projects", label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
  { view: "members", label: "Members", icon: <Users className="h-4 w-4" /> },
]

export function AppShell({
  children,
  currentView,
  onNavigate,
  onSwitchTenant,
  onLogout,
}: AppShellProps) {
  const { user, currentTenant, tenants } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 lg:px-6">
          {/* Logo + tenant */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Tenantry
            </span>
            <span className="text-muted-foreground">/</span>
            <TenantSwitcher
              currentTenant={currentTenant}
              tenants={tenants}
              onSwitch={onSwitchTenant}
            />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center gap-1 ml-4" aria-label="Main navigation">
            {navItems.map((item) => (
              <Button
                key={item.view}
                variant={currentView === item.view || (currentView === "project-detail" && item.view === "projects") ? "secondary" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.view)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User dropdown */}
          <div className="ml-auto hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                    {user?.name?.charAt(0) ?? "U"}
                  </div>
                  <span className="max-w-[120px] truncate text-sm text-foreground">
                    {user?.name}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="font-normal">
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="border-t border-border p-4 md:hidden">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  variant={currentView === item.view || (currentView === "project-detail" && item.view === "projects") ? "secondary" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    onNavigate(item.view)
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ))}
              <div className="mt-2 border-t border-border pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full text-destructive"
                  onClick={onLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
          {children}
        </div>
      </main>
    </div>
  )
}

function TenantSwitcher({
  currentTenant,
  tenants,
  onSwitch,
}: {
  currentTenant: Tenant | null
  tenants: Tenant[]
  onSwitch: () => void
}) {
  if (!currentTenant) return null

  if (tenants.length <= 1) {
    return (
      <span className="flex items-center gap-2 text-sm text-foreground">
        <Building2 className="h-4 w-4 text-primary" />
        {currentTenant.name}
      </span>
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-2 px-2"
      onClick={onSwitch}
    >
      <Building2 className="h-4 w-4 text-primary" />
      <span className="max-w-[140px] truncate">{currentTenant.name}</span>
      <ChevronDown className="h-3 w-3 text-muted-foreground" />
    </Button>
  )
}
