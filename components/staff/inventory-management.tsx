"use client"

import { AlertTriangle, Package, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { dummyInventory } from "@/lib/dummy-data"

export function InventoryManagement() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Inventory Status</h2>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors">
          Request Restock
        </button>
      </div>

      <div className="space-y-4">
        {dummyInventory.map((item, idx) => {
          const isLow = item.quantity < item.minThreshold
          const percentage = Math.min((item.quantity / item.minThreshold) * 100, 100)

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`p-4 rounded-xl border transition-all ${
                isLow ? "border-orange-300 bg-orange-50" : "border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isLow ? "bg-orange-200 text-orange-700" : "bg-blue-200 text-blue-700"
                    }`}
                  >
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                </div>
                {isLow && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    <TrendingDown className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Stock Level</span>
                  <span className="font-bold text-foreground">
                    {item.quantity} {item.unit}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className={`h-2.5 rounded-full transition-all ${
                      isLow
                        ? "bg-gradient-to-r from-orange-500 to-red-500"
                        : "bg-gradient-to-r from-blue-600 to-teal-600"
                    }`}
                  />
                </div>
                <p className="text-xs text-gray-600">
                  Minimum: {item.minThreshold} {item.unit}
                  {isLow && " • Low stock alert!"}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
