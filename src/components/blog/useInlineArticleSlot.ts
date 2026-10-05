import { useEffect, useState, type RefObject } from 'react';

const HEADING = /^H[23]$/;

/**
 * Finds a calm spot roughly a third of the way into rendered article HTML —
 * after the third paragraph (or ~40% of the blocks, whichever comes first),
 * nudged forward to the next section heading so a heading is never separated
 * from its copy — and returns an empty mount node there for a portal.
 *
 * Works on the live DOM instead of parsing the HTML string, so malformed or
 * unusual markup simply yields no slot. Client-only: the app renders with
 * createRoot, so there is no hydration mismatch to worry about.
 */
export const useInlineArticleSlot = (
  containerRef: RefObject<HTMLElement>,
  html: string,
  enabled = true,
): HTMLElement | null => {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!enabled || !container) return undefined;

    // WordPress exports wrap everything in one <div class="prose">; descend
    // through single-child wrappers to reach the flat list of blocks.
    let root: Element = container;
    while (root.children.length === 1 && root.firstElementChild?.tagName === 'DIV') {
      root = root.firstElementChild;
    }

    const blocks = Array.from(root.children);
    if (blocks.length < 6) return undefined;

    const fortyPercent = Math.floor(blocks.length * 0.4);
    let paragraphs = 0;
    let target = -1;
    for (let i = 0; i < blocks.length; i += 1) {
      if (blocks[i].tagName === 'P') paragraphs += 1;
      if (paragraphs >= 3 || i >= fortyPercent) {
        target = i;
        break;
      }
    }
    if (target < 0) return undefined;

    // Never leave a heading stranded above the card.
    if (HEADING.test(blocks[target].tagName)) target += 1;

    let insertBefore: Element | null = null;
    for (let j = target + 1; j < blocks.length && j <= target + 4; j += 1) {
      if (HEADING.test(blocks[j].tagName)) {
        insertBefore = blocks[j];
        break;
      }
    }
    insertBefore = insertBefore ?? blocks[target + 1] ?? null;

    const insertIndex = insertBefore ? blocks.indexOf(insertBefore) : blocks.length;
    // Skip short articles where the card would sit at the very end.
    if (blocks.length - insertIndex < 2) return undefined;

    const node = document.createElement('div');
    node.setAttribute('data-blog-inline-cta', '');
    root.insertBefore(node, insertBefore);
    setSlot(node);

    return () => {
      node.remove();
      setSlot(null);
    };
  }, [containerRef, html, enabled]);

  return slot;
};

export default useInlineArticleSlot;
