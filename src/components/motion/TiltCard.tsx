import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type TiltCardProps = {
  href: string;
  image: string;
  alt: string;
  accentClassName: string;
  sizes: string;
  className?: string;
  children: ReactNode;
};

export default function TiltCard({
  href,
  image,
  alt,
  accentClassName,
  sizes,
  className,
  children,
}: TiltCardProps) {
  return (
    <Link
      href={href}
      className={`group relative isolate block overflow-hidden rounded-2xl ${className ?? ""}`}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.08] group-hover:-rotate-1">
        <Image src={image} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark-ink/70 via-dark-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
      <span
        className={`absolute left-4 top-4 z-10 h-2.5 w-2.5 rounded-full shadow-[0_0_0_0_rgba(201,160,67,0)] transition-shadow duration-500 group-hover:shadow-[0_0_0_8px_rgba(201,160,67,0.18)] ${accentClassName}`}
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-6">{children}</div>
    </Link>
  );
}
