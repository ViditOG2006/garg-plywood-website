import Image from "next/image";
import { ReactNode } from "react";

export default function PageHeader({
  label,
  title,
  description,
  image,
  children,
}: {
  label: string;
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[55vh] overflow-hidden bg-wood-deep pt-36 pb-20">
      {image && (
        <>
          <Image src={image} alt="" fill className="object-cover opacity-30" priority />
          <div className="hero-vignette absolute inset-0" />
        </>
      )}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20 xl:px-32">
        <div className="line-accent mb-6" />
        <p className="section-label">{label}</p>
        <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold leading-tight text-wood-cream md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-wood-cream/65">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
