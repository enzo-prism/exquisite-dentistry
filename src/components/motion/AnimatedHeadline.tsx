import React from 'react';

/**
 * Splits a headline's text into masked words that rise into place on mount.
 * Accepts the same ReactNode titles the heroes already receive, e.g.
 * `<>Los Angeles <span className="text-gold">Cosmetic Dentist</span></>`, and
 * preserves wrapping elements (and their classes) around each word, so the
 * accessible name and the rendered text stay exactly the same.
 */
const splitWords = (node: React.ReactNode, counter: { i: number }): React.ReactNode => {
  if (typeof node === 'string' || typeof node === 'number') {
    const parts = String(node).split(/(\s+)/);
    return parts.map((part, index) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return part;
      const i = counter.i++;
      return (
        <span key={`${part}-${index}-${i}`} className="hero-word-mask">
          <span className="hero-word" style={{ '--i': i } as React.CSSProperties}>
            {part}
          </span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((child, index) => <React.Fragment key={index}>{splitWords(child, counter)}</React.Fragment>);
  }
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    if (node.type === 'br') return node;
    return React.cloneElement(node, undefined, splitWords(node.props.children, counter));
  }
  return node;
};

const AnimatedHeadline: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 120 }) => (
  <span style={{ '--hero-delay': `${delay}ms` } as React.CSSProperties}>{splitWords(children, { i: 0 })}</span>
);

export default AnimatedHeadline;
