import ProductCard from "@/components/product-card";
import { Product } from "@/lib/types";

interface FeaturedProductsProps {
  products: Product[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length < 3) {
    return null;
  }

  return (
    <section className="py-8 sm:py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          Featured Products
        </h2>
        <p className="text-center mt-2 text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          Don't miss out on these specially selected items, available for a
          limited time.
        </p>

        {/* Mobile Layout: Simple Grid */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:hidden">
          {products.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className={`${index === 0 ? "sm:col-span-2" : ""}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop Layout: Bento Grid */}
        <div className="hidden lg:block mt-12">
          <div className="grid grid-cols-3 grid-rows-2 gap-8 h-[70vh] min-h-[600px]">
            <div className="col-span-2 row-span-2 h-full">
              <ProductCard product={products[0]} />
            </div>
            <div className="col-span-1 row-span-1 h-full">
              <ProductCard product={products[1]} />
            </div>
            <div className="col-span-1 row-span-1 h-full">
              <ProductCard product={products[2]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
