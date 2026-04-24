import { Badge } from "@/components/ui/badge";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function FavoriteHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="space-y-4">
      <Badge>{eyebrow}</Badge>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">{title}</h1>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
