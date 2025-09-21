'use client';

import { useCart } from '@/context/cart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images.json';
import { useAuth } from '@/context/auth';
import { LoginDialog } from '@/components/login-dialog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    if (!user) {
      setIsLoginDialogOpen(true);
    } else {
      // Clear cart and proceed to checkout success page
      clearCart();
      router.push('/checkout/success');
    }
  };

  return (
    <>
      <LoginDialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen} />
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline text-foreground sm:text-4xl">
          Shopping Cart
        </h1>

        {cartCount === 0 ? (
          <div className="mt-12 text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
              <Link href="/shop">Start Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ul role="list" className="divide-y divide-border">
                {cartItems.map((item) => {
                  const imageDetails = placeholderImages.find(p => p.id === item.product.images[0]);
                  return (
                    <li key={`${item.product.id}-${item.size}-${item.color}`} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                         {imageDetails && <Image
                          src={imageDetails.imageUrl}
                          alt={item.product.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                          data-ai-hint={imageDetails.imageHint}
                        />}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-foreground">
                            <h3>
                              <Link href={`/product/${item.product.slug}`}>{item.product.name}</Link>
                            </h3>
                            <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{item.color} / {item.size}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex items-center border rounded-md">
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}>
                                  <Minus className="h-4 w-4" />
                              </Button>
                            <p className="w-8 text-center">{item.quantity}</p>
                             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}>
                                  <Plus className="h-4 w-4" />
                              </Button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-primary hover:text-primary/80 flex items-center gap-1"
                              onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            >
                              <X className="h-4 w-4"/>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="text-lg font-medium text-foreground">Order summary</h2>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="text-sm font-medium text-foreground">${totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Shipping</p>
                    <p className="text-sm font-medium text-foreground">Free</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <p className="text-base font-medium text-foreground">Order total</p>
                    <p className="text-base font-medium text-foreground">${totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                    Checkout
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
