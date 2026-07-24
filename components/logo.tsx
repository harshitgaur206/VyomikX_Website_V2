import Image from "next/image"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-border",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="VyomikX logo"
        fill
        sizes="48px"
        className="object-contain p-0.5"
        priority
      />
    </span>
  )
}
