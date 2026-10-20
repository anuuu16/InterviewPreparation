import { Fragment } from 'react';

/** Renders `code` spans in short plain-text strings such as question titles. */
export default function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(`[^`]+`)/g).map((part, i) =>
        part.startsWith('`') && part.endsWith('`') && part.length > 2 ? <code key={i}>{part.slice(1, -1)}</code> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}
