"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { Pause, Play } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const heroSlides = placeholderImages.filter((p) => p.id.startsWith("hero-"));

export default function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);
      // If we are moving to a video slide, play it
      if (heroSlides[selected].type === "video") {
        if (videoRef.current) {
          videoRef.current.play();
          setIsPlaying(true);
          autoplayPlugin.current.stop();
        }
      } else {
        // If we are moving to an image slide, pause any video and restart autoplay
        if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
          autoplayPlugin.current.play();
        }
      }
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative w-full">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        opts={{
          loop: true,
        }}
        className="w-full"
        onMouseEnter={() => autoplayPlugin.current.stop()}
        onMouseLeave={() => autoplayPlugin.current.play()}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[calc(100vh-100px)] w-full">
                {slide.type === "image" ? (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.description}
                    fill
                    className="object-cover -z-10 brightness-75"
                    priority={index === 0}
                    data-ai-hint={slide.imageHint}
                  />
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={slide.imageUrl}
                    className="absolute inset-0 w-full h-full object-cover -z-10 brightness-75"
                  >
                    <source src={slide.videoUrl} type="video/mp4" />
                  </video>
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                  <div className="max-w-3xl px-6 sm:px-8">
                    <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                      Effortless Style for Modern Life
                    </h1>
                    <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto">
                      Discover our new collection, crafted with premium
                      materials and timeless design.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="mt-10 sm:mt-12 px-8 py-4 text-lg"
                    >
                      <Link href="/shop">Shop New Arrivals</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />

        {heroSlides[current]?.type === "video" && (
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-4 z-10 bg-black/30 text-white hover:bg-black/50 hover:text-white border-white/50"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
        )}
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-2 w-2 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
