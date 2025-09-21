
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/lib/types';
import ProductCard from './product-card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Filter, X } from 'lucide-react';

interface ShopLayoutProps {
  products: Product[];
  allCategories: string[];
  allGenders: string[];
  allColors: string[];
  allSizes: string[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ShopLayout({
  products,
  allCategories,
  allGenders,
  allColors,
  allSizes,
  searchParams,
}: ShopLayoutProps) {
  const [searchTerm, setSearchTerm] = useState((searchParams.q as string) || '');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: (searchParams.category as string)?.split(',') || [],
    gender: (searchParams.gender as string)?.split(',') || [],
    color: [] as string[],
    size: [] as string[],
    price: [0, 200],
  });
  
  const currentSearchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm((currentSearchParams.get('q') as string) || '');
    setFilters(prev => ({
        ...prev,
        category: (currentSearchParams.get('category') as string)?.split(',').filter(Boolean) || [],
        gender: (currentSearchParams.get('gender') as string)?.split(',').filter(Boolean) || [],
    }));
  }, [currentSearchParams]);

  const handleFilterChange = (filterType: 'category' | 'gender' | 'color' | 'size', value: string) => {
    setFilters(prev => {
      const currentValues = prev[filterType] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, [filterType]: newValues };
    });
  };

  const handlePriceChange = (newPrice: number[]) => {
    setFilters(prev => ({ ...prev, price: newPrice }));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.category.length === 0 || filters.category.includes(product.category)) &&
        (filters.gender.length === 0 || filters.gender.includes(product.gender)) &&
        (filters.color.length === 0 || product.colors.some(c => filters.color.includes(c))) &&
        (filters.size.length === 0 || product.sizes.some(s => filters.size.includes(s))) &&
        product.price >= filters.price[0] && product.price <= filters.price[1]
      );
    });

    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }
    return filtered;
  }, [products, searchTerm, filters, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSortBy('newest');
    setFilters({ category: [], gender: [], color: [], size: [], price: [0, 200] });
  };
  
  const FilterContent = () => (
     <div className="space-y-6">
        <Accordion type="multiple" defaultValue={['category', 'gender', 'price']} className="w-full">
            <AccordionItem value="category">
                <AccordionTrigger>Category</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {allCategories.map(cat => (
                        <div key={cat} className="flex items-center space-x-2">
                            <Checkbox id={`cat-${cat}`} onCheckedChange={() => handleFilterChange('category', cat)} checked={filters.category.includes(cat)} />
                            <label htmlFor={`cat-${cat}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{cat}</label>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="gender">
                <AccordionTrigger>Gender</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {allGenders.map(g => (
                        <div key={g} className="flex items-center space-x-2">
                            <Checkbox id={`gen-${g}`} onCheckedChange={() => handleFilterChange('gender', g)} checked={filters.gender.includes(g)} />
                            <label htmlFor={`gen-${g}`} className="text-sm font-medium">{g}</label>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="price">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                     <Slider defaultValue={[0, 200]} max={200} step={10} value={filters.price} onValueChange={handlePriceChange} />
                     <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${filters.price[0]}</span>
                        <span>${filters.price[1]}</span>
                     </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="color">
                <AccordionTrigger>Color</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {allColors.map(c => (
                        <div key={c} className="flex items-center space-x-2">
                            <Checkbox id={`col-${c}`} onCheckedChange={() => handleFilterChange('color', c)} checked={filters.color.includes(c)} />
                            <label htmlFor={`col-${c}`} className="text-sm font-medium">{c}</label>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="size">
                <AccordionTrigger>Size</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {allSizes.map(s => (
                        <div key={s} className="flex items-center space-x-2">
                            <Checkbox id={`size-${s}`} onCheckedChange={() => handleFilterChange('size', s)} checked={filters.size.includes(s)} />
                            <label htmlFor={`size-${s}`} className="text-sm font-medium">{s}</label>
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
        <Button onClick={resetFilters} variant="outline" className="w-full">Reset Filters</Button>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
      {/* Desktop Filters */}
      <aside className="hidden lg:block">
        <h3 className="text-lg font-semibold">Filters</h3>
        <FilterContent />
      </aside>

      <div className="lg:col-span-3">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
            <div className="relative w-full sm:max-w-sm">
                <Input placeholder="Search products..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pr-10"/>
                {searchTerm && (
                    <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setSearchTerm('')}>
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>
          <div className="flex items-center gap-4 w-full sm:w-auto">
             <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4"/>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <h3 className="text-lg font-semibold mb-4">Filters</h3>
                  <FilterContent />
                </SheetContent>
              </Sheet>
            </div>
            <Select onValueChange={setSortBy} value={sortBy}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold">No products found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            <Button onClick={resetFilters} className="mt-4">Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}

    