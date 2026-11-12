import React from 'react';

interface RichTextProps {
  /** Plain text where `**bold**` segments are rendered as <strong>. */
  text: string;
}

/** Renders translated text with minimal bold markup, without raw HTML. */
export const RichText: React.FC<RichTextProps> = ({ text }) => (
  <>
    {text
      .split(/(\*\*[^*]+\*\*)/g)
      .map((part, idx) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={idx}>{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
  </>
);
