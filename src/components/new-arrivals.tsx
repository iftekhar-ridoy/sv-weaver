import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductCard from "@/components/product-card";
import { Product } from "@/lib/types";
import { ArrowRight } from "lucide-react";

interface NewArrivalsProps {
  products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          New Arrivals
        </h2>
        <p className="text-center mt-2 text-muted-foreground max-w-xl mx-auto">
          Check out the latest additions to our collection, just in time for the
          new season.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
