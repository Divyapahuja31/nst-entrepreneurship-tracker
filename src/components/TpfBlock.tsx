import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function TpfBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md border border-emerald-300 bg-emerald-100/80 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] text-emerald-800",
        className,
      )}
    >
      <Sparkles className="h-2.5 w-2.5 text-emerald-700" /> TPF
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
    <div className={cn("rounded-lg border border-emerald-200/90 bg-emerald-50/80 p-3.5 shadow-2xs", className)}>
      <div className="mb-2 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-emerald-800">
          {label}
        </p>
      </div>
      <div className="text-xs text-emerald-950 font-medium">{children}</div>
    </div>
  );
}
