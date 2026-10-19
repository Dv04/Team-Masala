export function LoadingIndicator({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-400">
      <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
      <span className="text-sm">{label}...</span>
    </div>
  );
}
