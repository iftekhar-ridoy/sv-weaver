import { products } from "@/lib/products";
import { placeholderImages } from "@/lib/placeholder-images.json";
import { ShoppingBag, User, Gift } from "lucide-react";
import HeroCarousel from "@/components/hero-carousel";
import PromotionBar from "@/components/promotion-bar";
import FeaturedProducts from "@/components/featured-products";
import CategoryGrid from "@/components/category-grid";
import NewArrivals from "@/components/new-arrivals";
import StyleInspiration from "@/components/style-inspiration";
import PerksSection from "@/components/perks-section";
import BrandCollaboration from "@/components/brand-collaboration";

export default function Home() {
  const newArrivals = products.slice(0, 8);
  const featuredProducts = products.filter((p) => p.originalPrice).slice(0, 4);

  const categories = [
    {
      id: "must-have-jeans",
      title: "Jeans",
      href: "/shop?category=Bottoms",
      imageHint: "woman jeans",
    },
    {
      id: "must-have-outerwear",
      title: "Outerwear",
      href: "/shop?category=Outerwear",
      imageHint: "knitted vest",
    },
    {
      id: "must-have-sweaters",
      title: "Sweaters",
      href: "/shop?category=Tops",
      imageHint: "white sweater",
    },
    {
      id: "must-have-trucker",
      title: "Dresses",
      href: "/shop?category=Dresses",
      imageHint: "floral dress",
    },
  ];

  const perks = [
    {
      Icon: ShoppingBag,
      title: "Free Shipping & Returns",
      description: "On all orders, no minimum purchase.",
    },
    {
      Icon: User,
      title: "Member Exclusives",
      description: "Shop special products and collections.",
    },
    {
      Icon: Gift,
      title: "First-Access to Sales",
      description: "Get early entry to our seasonal sales.",
    },
  ];

  const inspirationLook = {
    background: placeholderImages.find((p) => p.id === "style-inspiration-bg"),
    product1: products.find((p) => p.id === 6), // Canvas Tote Bag
    product2: products.find((p) => p.id === 10), // Minimalist Leather Sneakers
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Promotion Bar */}
      <PromotionBar message="Free Shipping on All Orders Over $50" />

      {/* Hero Section - Full Width */}
      <div className="w-full">
        <HeroCarousel />
      </div>

      {/* Featured Products Section - Full Width Background */}
      <div className="w-full bg-background">
        <FeaturedProducts products={featuredProducts} />
      </div>

      {/* Featured Categories Section - Full Width Background */}
      <div className="w-full bg-secondary/30">
        <CategoryGrid categories={categories} />
      </div>

      {/* New Arrivals Section - Full Width Background */}
      <div className="w-full bg-background">
        <NewArrivals products={newArrivals} />
      </div>

      {/* Brand Collaboration Section - Full Width */}
      <div className="w-full">
        <BrandCollaboration
          backgroundImage="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1920&h=800&fit=crop"
          title="STUDIO X DENIM"
          subtitle="Iconic denim, reimagined."
          ctaText="SHOP THE COLLECTION"
          ctaLink="/shop?category=Bottoms"
          textPosition="right"
        />
      </div>

      {/* Style Inspiration Section - Full Width */}
      {inspirationLook.background &&
        inspirationLook.product1 &&
        inspirationLook.product2 && (
          <div className="w-full">
            <StyleInspiration
              backgroundImage={inspirationLook.background}
              product1={inspirationLook.product1}
              product2={inspirationLook.product2}
            />
          </div>
        )}

      {/* Perks Section - Full Width Background */}
      <div className="w-full bg-secondary/20 border-t">
        <PerksSection perks={perks} />
      </div>
    </div>
  );
}
