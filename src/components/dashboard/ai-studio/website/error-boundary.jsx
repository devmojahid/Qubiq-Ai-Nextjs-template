export function WebsiteGeneratorError({ error, reset }) {
  return (
    <div className="rounded-xl border border-destructive/50 p-6 bg-destructive/10">
      <h3 className="font-semibold text-destructive mb-2">Generation Failed</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error.message || 'Failed to generate website. Please try again.'}
      </p>
      <button
        onClick={reset}
        className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
      >
        Try Again
      </button>
    </div>
  )
} 