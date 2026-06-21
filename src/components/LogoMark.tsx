import Image from "next/image";
import { IMAGES } from "@/lib/constants";

type LogoMarkProps = {
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

const sizeClasses = {
  sm: "h-11 w-11 p-2 md:h-14 md:w-14 md:p-2.5",
  md: "h-14 w-14 p-2.5 md:h-16 md:w-16 md:p-3",
} as const;

const imageSizes = {
  sm: "(max-width: 768px) 44px, 56px",
  md: "(max-width: 768px) 56px, 64px",
} as const;

export default function LogoMark({ size = "sm", className = "", priority = false }: LogoMarkProps) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-wood-deep ring-2 ring-wood-gold/50 shadow-md ${sizeClasses[size]} ${className}`}
    >
      <Image
        src={IMAGES.logoIcon}
        alt="Garg Plywood Palace logo"
        width={256}
        height={256}
        className="h-full w-full object-contain"
        sizes={imageSizes[size]}
        priority={priority}
      />
    </div>
  );
}
