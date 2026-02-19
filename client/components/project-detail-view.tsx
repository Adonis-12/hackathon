"use client"

import { useState } from "react"
import type { Project, Task, Member, TaskStatus } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Plus,
  CircleDashed,
  Loader2,
  CheckCircle2,
  User,
} from "lucide-react"

const STATUS_CONFIG: Record<TaskStatus, { label: string; icon: React.ReactNode; color: string }> = {
  not_started: {
    label: "Not Started",
    icon: <CircleDashed className="h-3.5 w-3.5" />,
    color: "text-muted-foreground",
  },
  in_progress: {
    label: "In Progress",
    icon: <Loader2 className="h-3.5 w-3.5" />,
    color: "text-chart-1",
  },
  done: {
    label: "Done",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    color: "text-primary",
  },
}

interface ProjectDetailViewProps {
  project: Project
  tasks: Task[]
  members: Member[]
  canEdit: boolean
  onBack: () => void
  onCreateTask: (data: { title: string; description: string }) => void
  onUpdateTask: (taskId: string, data: Partial<Task>) => void
}

export function ProjectDetailView({
  project,
  tasks,
  members,
  canEdit,
  onBack,
  onCreateTask,
  onUpdateTask,
}: ProjectDetailViewProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    onCreateTask({ title, description })
    setTitle("")
    setDescription("")
    setDialogOpen(false)
  }

  const columns: TaskStatus[] = ["not_started", "in_progress", "done"]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} aria-label="Go back">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
            {project.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
        {canEdit && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                New Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
                <DialogDescription>
                  Add a new task to {project.name}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="task-title">Title</Label>
                  <Input
                    id="task-title"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="task-desc">Description</Label>
                  <Textarea
                    id="task-desc"
                    placeholder="Task description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Task columns */}
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((status) => {
          const config = STATUS_CONFIG[status]
          const columnTasks = tasks.filter((t) => t.status === status)
          return (
            <div key={status} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-1">
                <span className={config.color}>{config.icon}</span>
                <span className="text-sm font-medium text-foreground">
                  {config.label}
                </span>
                <Badge variant="outline" className="ml-auto text-xs">
                  {columnTasks.length}
                </Badge>
              </div>
              <div className="flex flex-col gap-2">
                {columnTasks.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                    No tasks
                  </div>
                ) : (
                  columnTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      members={members}
                      canEdit={canEdit}
                      onUpdate={(data) => onUpdateTask(task.id, data)}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TaskCard({
  task,
  members,
  canEdit,
  onUpdate,
}: {
  task: Task
  members: Member[]
  canEdit: boolean
  onUpdate: (data: Partial<Task>) => void
}) {
  return (
    <Card className="gap-3 py-4">
      <CardHeader className="pb-0">
        <CardTitle className="text-sm font-medium leading-snug">
          {task.title}
        </CardTitle>
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {task.description}
          </p>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Assignee */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          {task.assigneeName ? (
            <span>{task.assigneeName}</span>
          ) : (
            <span className="italic">Unassigned</span>
          )}
        </div>

        {/* Controls */}
        {canEdit && (
          <div className="flex flex-wrap gap-2">
            <Select
              value={task.status}
              onValueChange={(val) => onUpdate({ status: val as TaskStatus })}
            >
              <SelectTrigger className="h-7 w-auto text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="not_started">Not Started</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={task.assigneeId || "unassigned"}
              onValueChange={(val) =>
                onUpdate({
                  assigneeId: val === "unassigned" ? null : val,
                  assigneeName:
                    val === "unassigned"
                      ? null
                      : members.find((m) => m.userId === val)?.name ?? null,
                })
              }
            >
              <SelectTrigger className="h-7 w-auto text-xs">
                <SelectValue placeholder="Assign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {members.map((m) => (
                  <SelectItem key={m.userId} value={m.userId}>
                    {m.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
