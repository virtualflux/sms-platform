"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PaginationProps {
    page: number
    totalPages: number
    onChange: (page: number) => void
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
    const goTo = (p: number) => {
        if (p < 1 || p > totalPages) return
        onChange(p)
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-6">

        <Button
            variant="ghost"
            size="sm"
            className="text-sm hover:bg-muted dark:hover:bg-slate-800"
            disabled={page <= 1}
            onClick={() => goTo(page - 1)}
        >
            Prev
        </Button>

        {/* Page buttons - show 1, ..., current, ... , last */}
        <div className="flex gap-1">

            {page > 2 && (
            <PageNumber number={1} active={page === 1} onClick={() => goTo(1)} />
            )}

            {page > 3 && (
            <span className="px-2 text-muted-foreground">...</span>
            )}

            {page > 1 && (
            <PageNumber number={page-1} onClick={() => goTo(page-1)} />
            )}

            {/* Current Page */}
            <PageNumber number={page} active />

            {page < totalPages && (
            <PageNumber number={page+1} onClick={() => goTo(page+1)} />
            )}

            {page < totalPages - 2 && (
            <span className="px-2 text-muted-foreground">...</span>
            )}

            {page < totalPages - 1 && (
            <PageNumber number={totalPages} onClick={() => goTo(totalPages)} />
            )}
        </div>

        <Button
            variant="ghost"
            size="sm"
            className="text-sm hover:bg-muted dark:hover:bg-slate-800"
            disabled={page >= totalPages}
            onClick={() => goTo(page + 1)}
        >
            Next
        </Button>
        </div>
    )
}


interface PageProps {
    number: number
    active?: boolean
    onClick?: () => void
}

function PageNumber({ number, active, onClick }: PageProps) {
    return (
        <button
        onClick={onClick}
        disabled={active}
        className={cn(
            "px-3 py-1 rounded-md text-sm transition-colors",
            "dark:text-white",
            active
            ? "bg-primary text-white dark:bg-primary"
            : "hover:bg-muted dark:hover:bg-slate-800 text-muted-foreground"
        )}
        >
            {number}
        </button>
    )
}
