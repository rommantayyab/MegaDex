export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-line bg-card">
      <div className="h-56 bg-white/5" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-1/3 rounded bg-white/10" />
        <div className="h-4 w-4/5 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-6 w-1/4 rounded bg-white/10" />
          <div className="h-9 w-16 rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}