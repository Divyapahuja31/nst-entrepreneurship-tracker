import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function TpfBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-emerald-400/40 bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-300",
        className,
      )}
    >
      <Sparkles className="h-2.5 w-2.5" /> TPF
    </span>
  );
}

export function TpfBlock({
  children,
  label = "TPF Touchpoint",
  className,
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3", className)}>
      <div className="mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300">
          {label}
        </p>
      </div>
      <div className="text-xs text-emerald-50/90">{children}</div>
    </div>
  );
}
