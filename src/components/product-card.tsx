
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Product } from '@/lib/types';
import { Button } from './ui/button';
import { useWishlist } from '@/context/wishlist';
import { cn } from '@/lib/utils';
import { placeholderImages } from '@/lib/placeholder-images.json';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const firstImageId = product.images[0];
  const imageDetails = placeholderImages.find(p => p.id === firstImageId);

  return (
    <div className="group relative h-full w-full flex flex-col">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-gray-200 flex-1">
        {imageDetails && (
          <Image
            src={imageDetails.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            data-ai-hint={imageDetails.imageHint}
          />
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full"
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart className={cn('h-4 w-4', isInWishlist(product.id) ? 'fill-primary text-primary' : '')} />
        </Button>
        {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground text-xs font-bold uppercase px-2 py-1 rounded">
                Sale
            </div>
        )}
        
        {/* Product Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
             <h3 className="text-sm text-white font-semibold">
                <Link href={`/product/${product.slug}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
                </Link>
            </h3>
            <div className="mt-1 flex justify-between items-center">
                 <p className="text-sm text-white/90">{product.category}</p>
                 <div className="text-sm font-medium text-white text-right">
                    {product.originalPrice ? (
                        <div>
                            <p className="text-destructive-foreground font-bold">${product.price.toFixed(2)}</p>
                            <p className="text-white/70 line-through text-xs">${product.originalPrice.toFixed(2)}</p>
                        </div>
                    ) : (
                        <p>${product.price.toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
