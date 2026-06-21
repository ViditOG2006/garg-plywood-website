import Image from "next/image";
import { IMAGES } from "@/lib/constants";

type LogoMarkProps = {
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

const sizeClasses = {
  sm: "h-14 w-14",
  md: "h-16 w-16",
} as const;

const sizePx = {
  sm: "56px",
  md: "64px",
} as const;

export default function LogoMark({ size = "sm", className = "", priority = false }: LogoMarkProps) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-white ring-2 ring-wood-gold/40 shadow-md ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={IMAGES.logo}
        alt="Garg Plywood Palace logo"
        fill
        className="object-contain p-1.5"
        sizes={sizePx[size]}
        priority={priority}
      />
    </div>
  );
}
