import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeInternalHref } from "@/utils/normalizeInternalHref";

export type BreadcrumbItem = {
  label: string;
  to: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  if (!items.length) return null;

  const allItems: BreadcrumbItem[] = [{ label: "Home", to: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol
        className={cn(
          "flex max-w-full items-center overflow-x-auto whitespace-nowrap",
          "rounded-full border border-border/60 bg-muted/10 px-2 py-1",
          "text-xs text-muted-foreground sm:text-sm",
          "no-scrollbar"
        )}
      >
        {allItems.map((item, index) => {
          const href = normalizeInternalHref(item.to);
          const isLast = index === allItems.length - 1;
          const isHome = index === 0;

          return (
            <li key={`${item.to}-${index}`} className="flex shrink-0 items-center">
              {isLast ? (
                <span
                  aria-current="page"
                  title={item.label}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2 py-1",
                    "max-w-[70vw] font-medium text-foreground sm:max-w-none"
                  )}
                >
                  {isHome ? (
                    <>
                      <Home className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Home</span>
                    </>
                  ) : (
                    <span className="min-w-0 truncate">{item.label}</span>
                  )}
                </span>
              ) : (
                <Link
                  to={href}
                  title={item.label}
                  aria-label={isHome ? "Home" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-2 py-1",
                    "transition-colors hover:bg-muted/30 hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {isHome ? (
                    <>
                      <Home className="h-4 w-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Home</span>
                    </>
                  ) : (
                    <span className="min-w-0 max-w-[70vw] truncate sm:max-w-none">{item.label}</span>
                  )}
                </Link>
              )}

              {!isLast ? (
                <ChevronRight aria-hidden="true" className="mx-1 h-4 w-4 text-muted-foreground/50 sm:mx-1.5" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
