"use client"

import { useEffect } from "react"

export function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="rounded-lg border border-destructive/50 p-6 bg-destructive/10">
      <h2 className="text-lg font-semibold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <button
        onClick={reset}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
      >
        Try again
      </button>
    </div>
  )
} 