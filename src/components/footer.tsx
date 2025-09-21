import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-xl font-semibold">Stay in the know</h3>
            <p className="text-muted-foreground max-w-sm mx-auto lg:mx-0">Sign up for our newsletter to get the latest on sales, new releases and more.</p>
            <form className="flex w-full max-w-sm items-center space-x-2 mx-auto lg:mx-0">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit">Subscribe</Button>
            </form>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             <div>
              <p className="font-medium text-foreground">Shop</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="/shop?gender=Men" className="hover:text-primary">Men</Link>
                <Link href="/shop?gender=Women" className="hover:text-primary">Women</Link>
                <Link href="/shop?category=Accessories" className="hover:text-primary">Accessories</Link>
                <Link href="/shop" className="hover:text-primary">Sale</Link>
              </nav>
            </div>
             <div>
              <p className="font-medium text-foreground">About</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary">Our Story</Link>
                <Link href="#" className="hover:text-primary">Careers</Link>
                <Link href="#" className="hover:text-primary">Press</Link>
              </nav>
            </div>
             <div>
              <p className="font-medium text-foreground">Support</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary">Contact Us</Link>
                <Link href="#" className="hover:text-primary">FAQ</Link>
                <Link href="#" className="hover:text-primary">Shipping & Returns</Link>
              </nav>
            </div>
             <div>
              <p className="font-medium text-foreground">Legal</p>
              <nav className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary">Terms of Service</Link>
                <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>
                &copy; {new Date().getFullYear()} SV Weaver. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
