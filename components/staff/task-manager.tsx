"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Trash2, Plus, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { dummyTasks } from "@/lib/dummy-data"

export function TaskManager() {
  const [tasks, setTasks] = useState(dummyTasks)
  const [filter, setFilter] = useState<"all" | "pending" | "in-progress" | "completed">("all")

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task,
      ),
    )
  }

  const filtered = tasks.filter((task) => filter === "all" || task.status === filter)

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Today's Tasks</h2>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-teal-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 pb-4 border-b border-gray-200 overflow-x-auto">
        {(["all", "pending", "in-progress", "completed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all font-medium capitalize ${
              filter === f ? "bg-blue-600 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {f === "all" ? "All" : f.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filtered.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`p-4 rounded-xl border transition-all ${
              task.status === "completed"
                ? "border-gray-200 bg-gray-50 opacity-60"
                : "border-gray-200 hover:border-blue-300 hover:shadow-md bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTask(task.id)}
                className="mt-1 text-gray-400 hover:text-blue-600 transition-colors flex-shrink-0"
              >
                {task.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>
              <div className="flex-1">
                <p
                  className={`font-semibold text-base ${
                    task.status === "completed" ? "line-through text-gray-500" : "text-gray-900"
                  }`}
                >
                  {task.title}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <Clock className="w-3 h-3" />
                  <span>Due: {new Date(task.dueDate).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${
                    task.priority === "high"
                      ? "bg-red-100 text-red-700"
                      : task.priority === "medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {task.priority}
                </span>
                <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
