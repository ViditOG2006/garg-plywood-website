import Image from "next/image";
import { IMAGES } from "@/lib/constants";

type LogoMarkProps = {
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

const dimensions = {
  sm: { box: "h-11 w-11 md:h-12 md:w-12", sizes: "(max-width: 768px) 44px, 48px" },
  md: { box: "h-12 w-12 md:h-14 md:w-14", sizes: "(max-width: 768px) 48px, 56px" },
} as const;

export default function LogoMark({ size = "sm", className = "", priority = false }: LogoMarkProps) {
  const { box, sizes } = dimensions[size];

  return (
    <div className={`relative shrink-0 ${box} ${className}`}>
      <Image
        src={IMAGES.logoNav}
        alt="Garg Plywood Palace logo"
        width={256}
        height={256}
        className="h-full w-full object-contain"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
