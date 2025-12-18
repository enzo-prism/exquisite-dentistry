import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
      <ol className="flex flex-wrap items-center gap-y-1 text-xs text-muted-foreground sm:text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={item.to} className="flex shrink-0 items-center whitespace-nowrap">
              {isLast ? (
                <span
                  aria-current="page"
                  title={item.label}
                  className="max-w-[70vw] truncate font-medium text-foreground sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  title={item.label}
                  className="max-w-[70vw] truncate rounded-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:max-w-none"
                >
                  {item.label}
                </Link>
              )}

              {!isLast ? (
                <span aria-hidden="true" className="mx-1.5 text-muted-foreground/50 sm:mx-2">
                  /
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
