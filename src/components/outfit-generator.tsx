'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Product } from '@/lib/types';
import { getOutfitSuggestions } from '@/app/actions';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import ProductCard from './product-card';
import { Sparkles, Loader2 } from 'lucide-react';

interface OutfitGeneratorProps {
  selectedItem: Product;
  allProducts: Product[];
}

const initialState = {
  message: null,
  suggestions: null,
  reasoning: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Outfit
        </>
      )}
    </Button>
  );
}

export default function OutfitGenerator({ selectedItem, allProducts }: OutfitGeneratorProps) {
  const [state, formAction] = useFormState(getOutfitSuggestions, initialState);

  return (
    <Card className="bg-card/50 border-dashed border-2">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit">
            <Sparkles className="h-8 w-8" />
        </div>
        <CardTitle className="mt-4 text-2xl font-headline">AI Outfit Weaver</CardTitle>
        <CardDescription>
          Let our AI find the perfect match for your {selectedItem.name}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="selectedItem" value={JSON.stringify(selectedItem)} />
          <input type="hidden"name="allProducts" value={JSON.stringify(allProducts)} />
          <div>
            <Textarea
              name="userStylePreferences"
              placeholder="Any style preferences? (e.g., 'casual weekend', 'office look', 'bohemian style')"
              className="bg-background"
            />
          </div>
          <div className="text-center">
            <SubmitButton />
          </div>
        </form>

        {state.suggestions && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold font-headline text-center">Your AI-Generated Outfit</h3>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                <div className="opacity-70">
                    <ProductCard product={selectedItem} />
                </div>
              {(state.suggestions as Product[]).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {state.reasoning && (
                <Card className="mt-8 bg-background">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                             Stylist's Notes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{state.reasoning}</p>
                    </CardContent>
                </Card>
            )}
          </div>
        )}
        {state.message && state.message !== 'Suggestions generated successfully.' && (
            <p className="mt-4 text-center text-destructive">{state.message}</p>
        )}
      </CardContent>
    </Card>
  );
}
