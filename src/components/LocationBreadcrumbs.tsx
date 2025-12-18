import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeInternalHref } from "@/utils/normalizeInternalHref";

export type LocationBreadcrumbItem = {
  label: string;
  to: string;
};

interface LocationBreadcrumbsProps {
  items: LocationBreadcrumbItem[];
  className?: string;
}

const LocationBreadcrumbs: React.FC<LocationBreadcrumbsProps> = ({ items, className }) => {
  if (!items.length) return null;

  const allItems: LocationBreadcrumbItem[] = [{ label: "Home", to: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={cn("max-w-full", className)}>
      <div className="no-scrollbar max-w-full overflow-x-auto">
        <ol
          className={cn(
            "inline-flex items-center gap-1 whitespace-nowrap",
            "rounded-full border border-white/10 bg-white/5 px-2 py-1.5",
            "text-xs text-white/70 backdrop-blur-sm sm:text-sm"
          )}
        >
          {allItems.map((item, index) => {
            const href = normalizeInternalHref(item.to);
            const isLast = index === allItems.length - 1;
            const isHome = index === 0;

            return (
              <li key={`${item.to}-${index}`} className="flex items-center">
                {isLast ? (
                  <span
                    aria-current="page"
                    title={item.label}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2 py-1",
                      "max-w-[70vw] font-medium text-white sm:max-w-none"
                    )}
                  >
                    {isHome ? (
                      <>
                        <Home className="h-4 w-4" aria-hidden="true" />
                        <span>Home</span>
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
                      "transition-colors hover:bg-white/10 hover:text-gold",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    )}
                  >
                    {isHome ? (
                      <>
                        <Home className="h-4 w-4" aria-hidden="true" />
                        <span>Home</span>
                      </>
                    ) : (
                      <span className="min-w-0 max-w-[55vw] truncate sm:max-w-none">{item.label}</span>
                    )}
                  </Link>
                )}

                {!isLast ? (
                  <ChevronRight aria-hidden="true" className="mx-1 h-4 w-4 text-gold/60 sm:mx-1.5" />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default LocationBreadcrumbs;
