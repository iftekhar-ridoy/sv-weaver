"use client";
import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import { placeholderImages } from "@/lib/placeholder-images.json";
import Image from "next/image";
import { Star, CheckCircle, Heart, Info, Ruler, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/context/cart";
import { useWishlist } from "@/context/wishlist";
import { cn } from "@/lib/utils";
import OutfitGenerator from "@/components/outfit-generator";
import ProductCard from "@/components/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = products.find((p) => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productImages = product?.images
    .map((imageId) => placeholderImages.find((p) => p.id === imageId))
    .filter((p) => p !== undefined) as
    | (typeof placeholderImages)[0][]
    | undefined;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product || !productImages) {
    notFound();
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      addToCart(product, 1, selectedSize, selectedColor);
    } else {
      alert("Please select a size and color.");
    }
  };

  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
      : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-x-12">
        {/* Image gallery */}
        <div className="flex flex-col-reverse sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-2">
            {productImages.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImageIndex(index)}
                className={cn(
                  "overflow-hidden rounded-lg border-2",
                  selectedImageIndex === index
                    ? "border-primary"
                    : "border-transparent"
                )}
              >
                <Image
                  src={image.imageUrl}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={80}
                  height={100}
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
              </button>
            ))}
          </div>
          <div className="relative w-full">
            <Image
              src={productImages[selectedImageIndex]!.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg aspect-[4/5] w-full h-full"
              data-ai-hint={productImages[selectedImageIndex]!.imageHint}
            />
          </div>
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground sm:text-4xl">
            {product.name}
          </h1>

          <div className="flex items-center">
            <div className="flex items-baseline gap-2">
              <p
                className={`text-3xl text-foreground ${
                  product.originalPrice ? "text-destructive" : ""
                }`}
              >
                ${product.price.toFixed(2)}
              </p>
              {product.originalPrice && (
                <p className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            <div className="ml-4 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={cn(
                      averageRating > rating
                        ? "text-yellow-400"
                        : "text-gray-300",
                      "h-5 w-5 flex-shrink-0"
                    )}
                    fill="currentColor"
                  />
                ))}
              </div>
              <p className="ml-2 text-sm text-muted-foreground">
                ({product.reviews.length} reviews)
              </p>
            </div>
          </div>

          <p className="text-base text-muted-foreground">
            {product.description}
          </p>

          <div>
            <h3 className="text-sm font-medium text-foreground">Color</h3>
            <div className="mt-2 flex items-center space-x-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 p-0.5 flex items-center justify-center",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    selectedColor === color
                      ? "border-primary"
                      : "border-transparent"
                  )}
                >
                  <span
                    className="block h-full w-full rounded-full"
                    style={{
                      backgroundColor: color.toLowerCase().replace(" ", ""),
                    }}
                  />
                  <span className="sr-only">{color}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground">Size</h3>
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart
                className={cn(
                  "h-6 w-6",
                  isInWishlist(product.id) ? "fill-primary text-primary" : ""
                )}
              />
            </Button>
          </div>

          {(!selectedColor || !selectedSize) && (
            <p className="text-sm text-muted-foreground">
              Please select a color and size to add to cart.
            </p>
          )}

          <div className="flex items-center text-sm text-muted-foreground">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            <span>In Stock - Ships within 24 hours</span>
          </div>
        </div>
      </div>

      {/* Elaborate Description */}
      <div className="mt-16 sm:mt-24">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="sizing">Sizing & Fit</TabsTrigger>
            <TabsTrigger value="care">Fabric & Care</TabsTrigger>
          </TabsList>
          <TabsContent
            value="details"
            className="mt-6 text-sm text-muted-foreground space-y-4"
          >
            <p>{product.description}</p>
            <p>
              Our commitment to quality means this piece is designed to last.
              Crafted with meticulous attention to detail, it's a testament to
              timeless style and durability. Perfect for any occasion, it
              seamlessly blends comfort and sophistication.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Made from premium, responsibly sourced materials.</li>
              <li>Features reinforced stitching for enhanced durability.</li>
              <li>Classic design that never goes out of style.</li>
              <li>Easy to pair with other items in your wardrobe.</li>
            </ul>
          </TabsContent>
          <TabsContent
            value="sizing"
            className="mt-6 text-sm text-muted-foreground"
          >
            <p>
              This item fits true to size. We recommend ordering your regular
              size for a comfortable fit. If you are between sizes, we suggest
              sizing up.
            </p>
            <p className="mt-4">Model is 5'10" and is wearing a size Medium.</p>
          </TabsContent>
          <TabsContent
            value="care"
            className="mt-6 text-sm text-muted-foreground"
          >
            <p>
              To keep this garment in its best condition, please follow these
              care instructions:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>Machine wash cold with like colors.</li>
              <li>Tumble dry low or hang dry to preserve fabric quality.</li>
              <li>Do not bleach.</li>
              <li>Iron on a low setting if needed.</li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      {/* Outfit Generator */}
      {/* <div className="mt-16 sm:mt-24">
          <OutfitGenerator selectedItem={product} allProducts={products} />
      </div> */}

      {/* Related Products */}
      <div className="mt-16 sm:mt-24">
        <h2 className="text-2xl font-bold tracking-tight font-headline text-foreground">
          You might also like
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
