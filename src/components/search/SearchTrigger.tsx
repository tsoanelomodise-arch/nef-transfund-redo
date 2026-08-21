// Search trigger button for the navigation header
import { TfSearch } from "@/components/icons";
import { Button } from '@/components/ui/button';

interface SearchTriggerProps {
  onClick: () => void;
  variant?: 'desktop' | 'mobile';
}

export function SearchTrigger({ onClick, variant = 'desktop' }: SearchTriggerProps) {
  if (variant === 'mobile') {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="h-9 w-9"
        aria-label="Open search"
      >
        <TfSearch className="h-5 w-5 text-gray-700" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className="h-9 w-9"
      aria-label="Open search (⌘K)"
      title="TfSearch (⌘K)"
    >
      <TfSearch className="h-5 w-5 text-gray-700" />
    </Button>
  );
}
