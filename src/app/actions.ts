'use server';

import { generateOutfitSuggestions } from '@/ai/flows/generate-outfit-suggestions';
import { Product } from '@/lib/types';
import { z } from 'zod';

const outfitSchema = z.object({
  selectedItem: z.any(),
  allProducts: z.any(),
  userStylePreferences: z.string().optional(),
});

export async function getOutfitSuggestions(
  prevState: any,
  formData: FormData
) {
  const validatedFields = outfitSchema.safeParse({
    selectedItem: JSON.parse(formData.get('selectedItem') as string),
    allProducts: JSON.parse(formData.get('allProducts') as string),
    userStylePreferences: formData.get('userStylePreferences') as string,
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      suggestions: null,
      reasoning: null,
    };
  }

  const { selectedItem, allProducts, userStylePreferences } = validatedFields.data;

  const otherItemsDescriptions = allProducts
    .filter((p: Product) => p.id !== selectedItem.id)
    .map((p: Product) => `${p.name}: ${p.description}`)
    .join('\n\n');

  try {
    const result = await generateOutfitSuggestions({
      selectedItemDescription: `${selectedItem.name}: ${selectedItem.description}`,
      itemCategory: selectedItem.category,
      userStylePreferences: userStylePreferences || 'No specific style preferences.',
      websiteItemDescriptions: otherItemsDescriptions,
    });
    
    // Find product objects that match the suggested names
    const suggestedProducts = result.suggestedOutfitItems
      .map(name => allProducts.find((p: Product) => p.name.toLowerCase() === name.toLowerCase()))
      .filter((p: Product | undefined): p is Product => p !== undefined);

    return {
      message: 'Suggestions generated successfully.',
      suggestions: suggestedProducts,
      reasoning: result.reasoning,
    };
  } catch (error) {
    console.error('Error generating outfit suggestions:', error);
    return {
      message: 'Failed to generate suggestions. Please try again.',
      suggestions: null,
      reasoning: null,
    };
  }
}
