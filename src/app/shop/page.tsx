import { products } from '@/lib/products';
import ShopLayout from '@/components/shop-layout';

export default function ShopPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allCategories = [...new Set(products.map(p => p.category))];
  const allGenders = [...new Set(products.map(p => p.gender))];
  const allColors = [...new Set(products.flatMap(p => p.colors))];
  const allSizes = [...new Set(products.flatMap(p => p.sizes))];

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <ShopLayout
        products={products}
        allCategories={allCategories}
        allGenders={allGenders}
        allColors={allColors}
        allSizes={allSizes}
        searchParams={searchParams}
      />
    </div>
  );
}
