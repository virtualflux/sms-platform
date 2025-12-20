"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Filter, X } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useState } from "react"

export type FilterField =
    | { type: "text"; name: string; label: string; placeholder?: string }
    | { type: "select"; name: string; label: string; options: { label: string; value: string }[] }
    | { type: "dateRange"; name: string; label: string }

interface AdvancedFilterProps {
    fields: FilterField[]
    onApply: (values: Record<string, any>) => void
    onReset?: () => void
    title?: string
}

const schema = z.record(z.string(), z.any())

export function AdvancedFilter({ fields, onApply, onReset, title = "Filters" }: AdvancedFilterProps) {
    const [isOpen, setIsOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {},
    })

    const applyFilter = () => {
        onApply(form.getValues())
        setIsOpen(false);
    }

    const resetFilter = () => {
        form.reset()
        onReset?.()
    }

    const removeFilter = (name: string) => {
        form.setValue(name, undefined)
        onApply(form.getValues())
    }

    const activeFilters = Object.entries(form.getValues()).filter(([_, value]) => value)

    return (
        <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                <Filter size={16} /> Filter
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-md p-6 space-y-6 bg-background dark:bg-background-dark rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                {fields.map(field => {
                    switch (field.type) {
                    case "text":
                        return (
                        <div key={field.name} className="space-y-1">
                            <label className="text-sm font-medium">{field.label}</label>
                            <Input {...form.register(field.name)} placeholder={field.placeholder} />
                        </div>
                        )
                    case "select":
                        return (
                        <div key={field.name} className="space-y-1">
                            <label className="text-sm font-medium">{field.label}</label>
                            <Select onValueChange={v => form.setValue(field.name, v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                                {field.options.map(o => (
                                <SelectItem key={o.value} value={o.value}>
                                    {o.label}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </div>
                        )
                    case "dateRange":
                        return (
                        <div key={field.name} className="space-y-1">
                            <label className="text-sm font-medium">{field.label}</label>
                            <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="justify-start w-full">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {form.watch(field.name)?.from
                                    ? `${format(form.watch(field.name)?.from, "PPP")} → ${format(
                                        form.watch(field.name)?.to,
                                        "PPP"
                                    )}`
                                    : "Select date range"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="p-3 w-auto">
                                <Calendar
                                mode="range"
                                numberOfMonths={2}
                                selected={form.watch(field.name)}
                                onSelect={v => form.setValue(field.name, v)}
                                />
                            </PopoverContent>
                            </Popover>
                        </div>
                        )
                    }
                })}

                <div className="flex justify-between gap-3 pt-4">
                    <Button variant="ghost" className="" onClick={resetFilter}>
                    Reset
                    </Button>
                    <Button className="" onClick={applyFilter}>
                    Apply
                    </Button>
                </div>
                </div>
            </DialogContent>
            </Dialog>

            {activeFilters.map(([key, value]) => {
            let display = value
            if (value?.from && value?.to) {
                display = `${format(value.from, "PPP")} → ${format(value.to, "PPP")}`
            }

            return (
                <Button
                key={key}
                size="sm"
                variant="outline"
                className="flex items-center gap-1 py-1 px-2 text-xs"
                onClick={() => removeFilter(key)}
                >
                {key}: {display} <X size={12} />
                </Button>
            )
            })}
        </div>
        </div>
    )
}
