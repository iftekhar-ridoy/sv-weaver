"use client";

import Link from "next/link";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
  User,
  Tag,
  LogOut,
  LogIn,
} from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart";
import { useWishlist } from "@/context/wishlist";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useRef, useEffect } from "react";
import { Input } from "./ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import React from "react";
import { products } from "@/lib/products";
import { placeholderImages } from "@/lib/placeholder-images.json";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "@/context/auth";
import { LoginDialog } from "./login-dialog";

const menuItems = [
  {
    trigger: "Men",
    href: "/shop?gender=Men",
    sections: [
      {
        title: "Tops",
        items: [
          { title: "T-Shirts", href: "/shop?gender=Men&category=Tops" },
          { title: "Flannel Shirts", href: "/shop?gender=Men&category=Tops" },
          {
            title: "Hoodies & Sweatshirts",
            href: "/shop?gender=Men&category=Tops",
          },
        ],
      },
      {
        title: "Bottoms",
        items: [
          { title: "Jeans", href: "/shop?gender=Men&category=Bottoms" },
          { title: "Pants", href: "/shop?gender=Men&category=Bottoms" },
          { title: "Shorts", href: "/shop?gender=Men&category=Bottoms" },
        ],
      },
      {
        title: "Outerwear",
        items: [
          { title: "Jackets", href: "/shop?gender=Men&category=Outerwear" },
          { title: "Vests", href: "/shop?gender=Men&category=Outerwear" },
        ],
      },
      {
        title: "Accessories",
        items: [
          { title: "Tote Bags", href: "/shop?gender=Men&category=Accessories" },
          { title: "Beanies", href: "/shop?gender=Men&category=Accessories" },
        ],
      },
    ],
    featured: products
      .filter(
        (p) => (p.gender === "Men" || p.gender === "Unisex") && p.originalPrice
      )
      .slice(0, 4),
  },
  {
    trigger: "Women",
    href: "/shop?gender=Women",
    sections: [
      {
        title: "Tops",
        items: [
          {
            title: "T-Shirts & Tanks",
            href: "/shop?gender=Women&category=Tops",
          },
          { title: "Blouses", href: "/shop?gender=Women&category=Tops" },
          { title: "Sweaters", href: "/shop?gender=Women&category=Tops" },
        ],
      },
      {
        title: "Bottoms",
        items: [
          { title: "Jeans", href: "/shop?gender=Women&category=Bottoms" },
          { title: "Skirts", href: "/shop?gender=Women&category=Bottoms" },
          { title: "Shorts", href: "/shop?gender=Women&category=Bottoms" },
        ],
      },
      {
        title: "Dresses",
        items: [
          {
            title: "Midi Dresses",
            href: "/shop?gender=Women&category=Dresses",
          },
          {
            title: "Maxi Dresses",
            href: "/shop?gender=Women&category=Dresses",
          },
          {
            title: "Casual Dresses",
            href: "/shop?gender=Women&category=Dresses",
          },
        ],
      },
      {
        title: "Accessories",
        items: [
          {
            title: "Tote Bags",
            href: "/shop?gender=Women&category=Accessories",
          },
          { title: "Beanies", href: "/shop?gender=Women&category=Accessories" },
        ],
      },
    ],
    featured: products
      .filter(
        (p) =>
          (p.gender === "Women" || p.gender === "Unisex") && p.originalPrice
      )
      .slice(0, 4),
  },
  {
    trigger: "Kids",
    href: "/shop",
    sections: [
      {
        title: "Tops",
        items: [{ title: "T-Shirts", href: "/shop?category=Tops" }],
      },
      {
        title: "Bottoms",
        items: [{ title: "Pants", href: "/shop?category=Bottoms" }],
      },
    ],
    featured: [],
  },
  {
    trigger: "Sale",
    href: "/shop",
    simple: true,
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 40"
    className="h-8 w-auto"
  >
    <text
      x="0"
      y="32"
      fontFamily="serif"
      fontSize="40"
      fontWeight="bold"
      fill="currentColor"
    >
      S
    </text>
    <g transform="translate(45, 0)">
      <text
        x="0"
        y="32"
        fontFamily="serif"
        fontSize="40"
        fontWeight="bold"
        fill="currentColor"
      >
        V
      </text>
      <g clipPath="url(#clipV)">
        <g stroke="currentColor" strokeWidth="1">
          {[...Array(12)].map((_, i) => (
            <line
              key={i}
              x1={15}
              y1={17}
              x2={15 + 20 * Math.cos((i * 2 * Math.PI) / 12 + Math.PI / 6)}
              y2={17 + 20 * Math.sin((i * 2 * Math.PI) / 12 + Math.PI / 6)}
            />
          ))}
        </g>
      </g>
    </g>
    <defs>
      <clipPath id="clipV">
        <text x="0" y="32" fontFamily="serif" fontSize="40" fontWeight="bold">
          V
        </text>
      </clipPath>
    </defs>
  </svg>
);

export default function Header() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setSearchQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSearchQuery = formData.get("search") as string;
    if (newSearchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(newSearchQuery.trim())}`);
      setSheetOpen(false);
    } else {
      router.push("/shop");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (formRef.current) {
      const currentSearchInput = formRef.current.elements.namedItem(
        "search"
      ) as HTMLInputElement;
      if (currentSearchInput) currentSearchInput.value = "";
    }
    router.push("/shop");
  };

  const mobileNavLinks = menuItems.flatMap((item) =>
    item.simple
      ? [{ href: item.href, label: item.trigger }]
      : (item.sections || []).flatMap((section) =>
          section.items.map((link) => ({
            href: link.href,
            label: `${item.trigger} ${link.title}`,
          }))
        )
  );

  return (
    <>
      <LoginDialog
        open={isLoginDialogOpen}
        onOpenChange={setIsLoginDialogOpen}
      />
      <header className="sticky top-0 z-40 w-full border-b bg-background backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center gap-4 lg:gap-6 min-w-0 flex-1 overflow-hidden">
            {/* Mobile menu button */}
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:max-w-xs">
                <div className="flex h-full flex-col">
                  <div className="flex items-center justify-between border-b pb-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-bold"
                      onClick={() => setSheetOpen(false)}
                    >
                      <Logo />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSheetOpen(false)}
                    >
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="mt-6 flex flex-col gap-4 overflow-y-auto">
                    {menuItems.map((item) => (
                      <div key={item.trigger}>
                        <h3 className="font-bold text-lg mb-2 px-4">
                          <Link
                            href={item.href}
                            onClick={() => setSheetOpen(false)}
                          >
                            {item.trigger}
                          </Link>
                        </h3>
                        {!item.simple &&
                          item.sections?.map((section) => (
                            <div key={section.title} className="pl-4">
                              <h4 className="font-semibold mt-2 mb-1">
                                {section.title}
                              </h4>
                              {section.items.map((link) => (
                                <Link
                                  key={link.title}
                                  href={link.href}
                                  className="block py-1 text-muted-foreground hover:text-primary"
                                  onClick={() => setSheetOpen(false)}
                                >
                                  {link.title}
                                </Link>
                              ))}
                            </div>
                          ))}
                      </div>
                    ))}
                  </nav>
                  <div className="mt-auto border-t pt-4">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Input
                          name="search"
                          placeholder="Search..."
                          className="pr-10"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-8 top-0 h-full"
                            onClick={handleClearSearch}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          type="submit"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full"
                        >
                          <Search className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <Logo />
              <span className="sr-only">SV Weaver Home</span>
            </Link>

            {/* Desktop Navigation - Now on the left with logo */}
            <NavigationMenu className="hidden lg:flex flex-shrink-0">
              <NavigationMenuList>
                {menuItems.map((item) =>
                  item.simple ? (
                    <NavigationMenuItem key={item.trigger}>
                      <NavigationMenuLink
                        asChild
                        className={navigationMenuTriggerStyle()}
                      >
                        <Link href={item.href}>{item.trigger}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.trigger}>
                      <NavigationMenuTrigger>
                        {item.trigger}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid w-[var(--radix-navigation-menu-viewport-width)]">
                          <div className="container mx-auto grid grid-cols-5 gap-x-6 p-6">
                            <div className="col-span-3 grid grid-flow-col auto-rows-max gap-x-6">
                              {item.sections?.map((section) => (
                                <div
                                  key={section.title}
                                  className="flex flex-col space-y-2"
                                >
                                  <h3 className="mb-2 text-sm font-semibold text-foreground">
                                    <Link
                                      href={section.items[0]?.href || item.href}
                                      className="hover:underline"
                                    >
                                      {section.title}
                                    </Link>
                                  </h3>
                                  <ul className="flex flex-col gap-1">
                                    {section.items.map((link) => (
                                      <li key={link.title}>
                                        <NavigationMenuLink asChild>
                                          <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-primary p-1 rounded-sm"
                                          >
                                            {link.title}
                                          </Link>
                                        </NavigationMenuLink>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="col-span-2">
                              {item.featured && item.featured.length > 0 && (
                                <>
                                  <div className="mb-4">
                                    <h3 className="mb-2 text-sm font-semibold text-foreground flex items-center gap-2">
                                      <Tag className="h-4 w-4 text-primary" />
                                      Special Offers
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                      Grab these deals before they're gone!
                                    </p>
                                  </div>
                                  <Carousel
                                    opts={{ align: "start" }}
                                    className="w-full"
                                  >
                                    <CarouselContent>
                                      {item.featured.map((product) => {
                                        const image = placeholderImages.find(
                                          (img) => img.id === product.images[0]
                                        );
                                        return (
                                          <CarouselItem
                                            key={product.id}
                                            className="basis-1/2"
                                          >
                                            <Link
                                              href={`/product/${product.slug}`}
                                              className="group"
                                            >
                                              <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-100 relative">
                                                {image && (
                                                  <Image
                                                    src={image.imageUrl}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                    data-ai-hint={
                                                      image.imageHint
                                                    }
                                                  />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                              </div>
                                              <p className="text-sm font-medium text-foreground mt-2 truncate">
                                                {product.name}
                                              </p>
                                              <p className="text-sm text-muted-foreground">
                                                <span className="text-destructive font-semibold">
                                                  ${product.price.toFixed(2)}
                                                </span>
                                                {product.originalPrice && (
                                                  <span className="line-through ml-2">
                                                    $
                                                    {product.originalPrice.toFixed(
                                                      2
                                                    )}
                                                  </span>
                                                )}
                                              </p>
                                            </Link>
                                          </CarouselItem>
                                        );
                                      })}
                                    </CarouselContent>
                                    {item.featured.length > 2 && (
                                      <>
                                        <CarouselPrevious className="-left-4" />
                                        <CarouselNext className="-right-4" />
                                      </>
                                    )}
                                  </Carousel>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Search + User Actions */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <div className="hidden md:block flex-shrink-0">
              <form
                onSubmit={handleSearch}
                ref={formRef}
                className="relative w-32 lg:w-48 xl:w-64"
              >
                <Input
                  name="search"
                  placeholder="Search products..."
                  className="h-9 pr-16"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-7 top-0 h-9 w-9"
                    onClick={handleClearSearch}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {user ? (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {user ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => setIsLoginDialogOpen(true)}
                    >
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Log In</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {wishlistCount}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Link>
            </Button>
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
