'use client';

import { useWishlist } from '@/context/wishlist';
import { products } from '@/lib/products';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistItems } = useWishlist();
  const favoriteProducts = products.filter(p => wishlistItems.includes(p.id));

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground sm:text-4xl">
        My Wishlist
      </h1>

      {favoriteProducts.length === 0 ? (
        <div className="mt-12 text-center">
            <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">Your wishlist is empty</h2>
            <p className="mt-2 text-muted-foreground">Add your favorite items to your wishlist to keep track of them.</p>
            <Button asChild className="mt-6">
                <Link href="/shop">Explore Products</Link>
            </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
