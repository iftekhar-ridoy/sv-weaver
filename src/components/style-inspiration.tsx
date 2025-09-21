import Image from "next/image";
import ProductCard from "@/components/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types";

interface StyleInspirationProps {
  backgroundImage: {
    id: string;
    imageUrl: string;
    imageHint: string;
  };
  product1: Product;
  product2: Product;
}

export default function StyleInspiration({
  backgroundImage,
  product1,
  product2,
}: StyleInspirationProps) {
  return (
    <section className="py-8 sm:py-16 md:py-24 w-full">
      {/* Full-width background, contained content */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-none sm:rounded-lg overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-video max-w-none sm:max-w-7xl mx-auto">
          <Image
            src={backgroundImage.imageUrl}
            alt="Style inspiration"
            fill
            className="object-cover w-full h-full"
            data-ai-hint={backgroundImage.imageHint}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-xs sm:max-w-md">
              <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                Curated For You
              </h2>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base text-white/90">
                Discover the perfect ensemble for your next city adventure.
                Effortless style, designed to move with you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 w-full max-w-xs sm:max-w-sm md:max-w-md self-end">
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="p-2 sm:p-3 md:p-4">
                  <ProductCard product={product1} />
                </CardContent>
              </Card>
              <Card className="bg-background/80 backdrop-blur-sm">
                <CardContent className="p-2 sm:p-3 md:p-4">
                  <ProductCard product={product2} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
