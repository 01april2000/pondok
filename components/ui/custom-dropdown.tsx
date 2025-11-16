"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface CustomDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = "Pilih opsi",
  className,
  disabled = false,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-slate-600 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-allowed disabled:opacity-50",
            className
          )}
        >
          <span className={value ? "text-white" : "text-slate-400"}>
            {value || placeholder}
          </span>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full bg-slate-800 border-slate-600">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleSelect(option)}
            className="text-slate-100 hover:bg-slate-700 focus:bg-white cursor-pointer"
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}