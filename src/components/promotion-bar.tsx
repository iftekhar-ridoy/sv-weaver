interface PromotionBarProps {
  message: string;
}

export default function PromotionBar({ message }: PromotionBarProps) {
  return (
    <div className="w-full bg-primary text-primary-foreground text-center py-2.5 text-sm font-medium">
      <p>{message}</p>
    </div>
  );
}
