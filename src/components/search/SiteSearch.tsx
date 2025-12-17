import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, FileText, MapPin, Search, Sparkles, Phone, X } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { normalizeInternalHref } from "@/utils/normalizeInternalHref";
import { PHONE_NUMBER_DISPLAY, PHONE_NUMBER_E164 } from "@/constants/contact";
import { SCHEDULE_CONSULTATION_PATH } from "@/constants/urls";

type SearchItemType = "page" | "service" | "location" | "blog";

interface SearchIndexItem {
  id: string;
  type: SearchItemType;
  title: string;
  href: string;
  description?: string;
  h1?: string;
  keywords?: string[];
}

interface SearchIndexFile {
  version: number;
  items: SearchIndexItem[];
}

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SEARCH_INDEX_URL = "/search-index.json";
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

const POPULAR_HREFS = [
  "/dental-implants/",
  "/veneers/",
  "/beverly-hills-dentist/",
  "/smile-gallery/",
  "/schedule-consultation/",
];

const getTypeLabel = (type: SearchItemType): string => {
  switch (type) {
    case "service":
      return "Services";
    case "location":
      return "Locations";
    case "blog":
      return "Blog";
    default:
      return "Pages";
  }
};

const getTypeIcon = (type: SearchItemType) => {
  switch (type) {
    case "service":
      return Sparkles;
    case "location":
      return MapPin;
    case "blog":
      return FileText;
    default:
      return Search;
  }
};

const TOKEN_SYNONYMS: Record<string, string[]> = {
  client: ["patient", "patients"],
  clients: ["patient", "patients"],
  patient: ["client", "clients"],
  patients: ["client", "clients"],
};

const getTokenVariants = (token: string): string[] => {
  const synonyms = TOKEN_SYNONYMS[token];
  if (!synonyms?.length) return [token];
  return Array.from(new Set([token, ...synonyms]));
};

const tokenize = (value: string): string[] =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

const scoreItem = (item: SearchIndexItem, tokens: string[]): number | null => {
  const title = item.title.toLowerCase();
  const h1 = (item.h1 ?? "").toLowerCase();
  const description = (item.description ?? "").toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const href = item.href.toLowerCase();

  let score = 0;
  for (const token of tokens) {
    const variants = getTokenVariants(token);

    const titleVariant = variants.find((variant) => title.includes(variant));
    if (titleVariant) {
      score += title.startsWith(titleVariant) ? 12 : 10;
      continue;
    }

    const h1Variant = variants.find((variant) => h1.includes(variant));
    if (h1Variant) {
      score += h1.startsWith(h1Variant) ? 9 : 7;
      continue;
    }

    if (variants.some((variant) => keywords.includes(variant))) {
      score += 6;
      continue;
    }

    if (variants.some((variant) => description.includes(variant))) {
      score += 3;
      continue;
    }

    if (variants.some((variant) => href.includes(variant))) {
      score += 1;
      continue;
    }
    return null;
  }

  return score;
};

const resolveHref = (href: string): { href: string; isExternal: boolean } => {
  if (/^(https?:)?\/\//i.test(href)) return { href, isExternal: true };
  if (/^(mailto|tel):/i.test(href)) return { href, isExternal: true };
  return { href: normalizeInternalHref(href), isExternal: false };
};

const SiteSearch: React.FC<SiteSearchProps> = ({ open, onOpenChange }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState<SearchIndexFile | null>(null);
  const [isLoadingIndex, setIsLoadingIndex] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
  });
  const lastActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const update = () => setIsDesktop(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }

    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  useEffect(() => {
    if (!open) return;
    lastActiveRef.current = document.activeElement as HTMLElement | null;
    setQuery("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (searchIndex) return;

    const controller = new AbortController();
    setIsLoadingIndex(true);

    fetch(SEARCH_INDEX_URL, { signal: controller.signal, cache: "force-cache" })
      .then((response) => {
        if (!response.ok) throw new Error(`Search index request failed: ${response.status}`);
        return response.json() as Promise<SearchIndexFile>;
      })
      .then((data) => {
        setSearchIndex(data);
      })
      .catch(() => undefined)
      .finally(() => {
        setIsLoadingIndex(false);
      });

    return () => controller.abort();
  }, [open, searchIndex]);

  const actions = useMemo(() => {
    return [
      {
        id: "action:schedule-consultation",
        title: "Schedule Consultation",
        description: "Book online in under a minute",
        href: SCHEDULE_CONSULTATION_PATH,
        icon: CalendarDays,
      },
      {
        id: "action:call",
        title: `Call ${PHONE_NUMBER_DISPLAY}`,
        description: "Speak with our concierge team",
        href: `tel:${PHONE_NUMBER_E164}`,
        icon: Phone,
      },
    ];
  }, []);

  const groupedResults = useMemo(() => {
    const items = searchIndex?.items ?? [];
    const tokens = tokenize(query);

    if (tokens.length === 0) {
      const popular = POPULAR_HREFS.map((href) => {
        const match = items.find((item) => normalizeInternalHref(item.href) === href);
        return match ?? null;
      }).filter(Boolean) as SearchIndexItem[];

      return {
        popular,
        groups: new Map<SearchItemType, SearchIndexItem[]>(),
        totalMatches: popular.length,
      };
    }

    const matches = items
      .map((item) => {
        const score = scoreItem(item, tokens);
        return score === null ? null : { item, score };
      })
      .filter(Boolean) as Array<{ item: SearchIndexItem; score: number }>;

    matches.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, "en", { sensitivity: "base" }));

    const groups = new Map<SearchItemType, SearchIndexItem[]>();
    matches.forEach(({ item }) => {
      const list = groups.get(item.type) ?? [];
      if (list.length >= 8) return;
      list.push(item);
      groups.set(item.type, list);
    });

    const totalMatches = matches.length;

    return { popular: [] as SearchIndexItem[], groups, totalMatches };
  }, [query, searchIndex]);

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      window.setTimeout(() => {
        lastActiveRef.current?.focus?.();
      }, 0);
    }
  };

  const openResult = (href: string) => {
    const resolved = resolveHref(href);
    handleOpenChange(false);

    if (resolved.isExternal) {
      window.location.href = resolved.href;
      return;
    }

    navigate(resolved.href);
  };

  const commandContent = (
    <Command
      shouldFilter={false}
      className={cn(
        "bg-black text-white",
        "[&_[cmdk-group-heading]]:text-white/70",
      )}
    >
      <div className="px-4 pt-4 pb-2">
        <div
          className={cn(
            "flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4",
            "transition-colors duration-200 hover:border-white/25",
            "focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/30 focus-within:ring-inset",
          )}
        >
          <Search className="h-4 w-4 shrink-0 text-white/60" aria-hidden="true" />
          <CommandPrimitive.Input
            autoFocus
            placeholder="Search services, locations, pages, or blog posts…"
            value={query}
            onValueChange={setQuery}
            className="flex h-12 w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-white/50"
          />
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition-colors",
              "hover:bg-white/10 hover:text-white",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50",
            )}
            aria-label="Close search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <CommandList className={cn(isDesktop ? "max-h-[min(420px,60dvh)]" : "max-h-[min(520px,70dvh)]")}>
        {isLoadingIndex ? (
          <div className="px-4 py-8 text-center text-sm text-white/70">Loading search…</div>
        ) : null}

        {!isLoadingIndex && groupedResults.totalMatches === 0 && query.trim() ? (
          <div className="px-4 py-8 text-center text-sm text-white/70">No results found.</div>
        ) : null}

        {groupedResults.popular.length ? (
          <>
            <CommandGroup heading="Popular">
              {groupedResults.popular.map((item) => (
                <SearchResultRow key={item.id} item={item} onSelect={openResult} />
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        ) : null}

        {groupedResults.groups.size ? (
          <>
            {(["service", "location", "page", "blog"] as const).map((type, index) => {
              const items = groupedResults.groups.get(type);
              if (!items?.length) return null;

              const label = getTypeLabel(type);

              return (
                <React.Fragment key={type}>
                  <CommandGroup heading={label}>
                    {items.map((item) => (
                      <SearchResultRow key={item.id} item={item} onSelect={openResult} />
                    ))}
                  </CommandGroup>
                  {index < 3 ? <CommandSeparator /> : null}
                </React.Fragment>
              );
            })}
          </>
        ) : null}

        <CommandGroup heading="Actions">
          {actions.map((action) => (
            <CommandItem
              key={action.id}
              value={action.title}
              onSelect={() => openResult(action.href)}
              className="flex items-center gap-3 rounded-md px-3 py-3 text-white data-[selected=true]:bg-gold/15"
            >
              <action.icon className="h-4 w-4 text-gold" aria-hidden="true" />
              <div className="min-w-0">
                <p className="truncate font-medium">{action.title}</p>
                <p className="mt-0.5 hidden truncate text-xs text-white/60 sm:block">{action.description}</p>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>

      <div className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 text-xs text-white/60">
        <span className="hidden sm:inline">Use ↑ ↓ to navigate · Enter to open · Esc to close</span>
        <span className="sm:hidden">Tap a result to open</span>
      </div>
    </Command>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="w-[calc(100vw-1.5rem)] max-w-xl overflow-hidden border-gold/30 bg-black p-0 text-white shadow-2xl [&>button]:hidden">
          {commandContent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange} shouldScaleBackground={false}>
      <DrawerContent className="max-h-[85dvh] overflow-hidden border-gold/30 bg-black p-0 text-white">
        {commandContent}
      </DrawerContent>
    </Drawer>
  );
};

const SearchResultRow: React.FC<{ item: SearchIndexItem; onSelect: (href: string) => void }> = ({ item, onSelect }) => {
  const Icon = getTypeIcon(item.type);

  return (
    <CommandItem
      value={[item.title, item.h1, item.description, ...(item.keywords ?? []), item.href].filter(Boolean).join(" ")}
      onSelect={() => onSelect(item.href)}
      className="flex items-start gap-3 rounded-md px-3 py-3 text-white data-[selected=true]:bg-gold/15"
    >
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" aria-hidden="true" />
      <div className="min-w-0">
        <p className="truncate font-medium">{item.title}</p>
        {item.description ? (
          <p className="mt-0.5 hidden truncate text-xs text-white/60 sm:block">{item.description}</p>
        ) : null}
      </div>
      <span className="ml-auto hidden flex-shrink-0 text-xs text-white/50 md:inline">{getTypeLabel(item.type)}</span>
    </CommandItem>
  );
};

export default SiteSearch;
