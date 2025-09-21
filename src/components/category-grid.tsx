import Link from "next/link";
import Image from "next/image";
import { placeholderImages } from "@/lib/placeholder-images.json";

interface Category {
  id: string;
  title: string;
  href: string;
  imageHint: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="py-16 sm:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-12">
          Shop By Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => {
            const image = placeholderImages.find((p) => p.id === category.id);
            return (
              <Link
                href={category.href}
                key={category.id}
                className="group relative block overflow-hidden rounded-lg"
              >
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={category.title}
                    width={400}
                    height={500}
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6">
                  <h3 className="text-white text-2xl font-bold font-headline">
                    {category.title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
