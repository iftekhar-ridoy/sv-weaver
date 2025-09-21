
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderSuccessPage() {
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        // Generate a random order number for display
        setOrderNumber(Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:py-16 lg:px-8 flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-green-100 text-green-700 rounded-full p-4 w-fit mb-4">
                        <CheckCircle className="h-12 w-12" />
                    </div>
                    <CardTitle className="text-3xl font-headline">Thank You For Your Order!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Your order has been placed successfully. You will receive an email confirmation shortly.
                    </p>
                    {orderNumber && (
                        <p className="text-lg font-semibold">
                            Order Number: <span className="text-primary">{orderNumber}</span>
                        </p>
                    )}
                    <p className="text-sm text-muted-foreground pt-4">
                        We've cleared your cart for your next shopping spree.
                    </p>
                    <Button asChild size="lg" className="mt-6">
                        <Link href="/shop">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
