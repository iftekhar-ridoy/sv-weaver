import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BrandCollaborationProps {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  textPosition?: "left" | "right";
}

export default function BrandCollaboration({
  backgroundImage,
  title,
  subtitle,
  ctaText,
  ctaLink,
  textPosition = "right",
}: BrandCollaborationProps) {
  return (
    <section className="w-full h-screen relative">
      {/* Fullscreen background image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover w-full h-full"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content positioned based on textPosition prop */}
      <div
        className={`relative z-10 h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${
          textPosition === "right" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`max-w-md lg:max-w-lg xl:max-w-xl ${
            textPosition === "right" ? "text-right" : "text-left"
          }`}
        >
          <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-black mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black/80 mb-8 sm:mb-10 lg:mb-12 font-medium">
            {subtitle}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-black/90 border-b-4 border-red-600 px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 text-base sm:text-lg lg:text-xl font-bold tracking-wide"
          >
            <Link href={ctaLink}>{ctaText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
