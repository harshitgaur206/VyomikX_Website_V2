export default function GalleryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-pulse">
      <div className="h-10 w-64 rounded-lg bg-muted" />
      <div className="aspect-[16/9] w-full rounded-3xl bg-muted" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-3xl bg-muted" />
        ))}
      </div>
    </div>
  )
}
