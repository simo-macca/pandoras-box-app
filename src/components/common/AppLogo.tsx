import React from 'react';

interface AppLogoProps {
  className?: string;
  size?: number;
  alt?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  className = 'h-9 w-9 sm:h-10 sm:w-10',
  size,
  alt = "Frantic: Pandora's Box Logo",
}) => {
  return (
    <img
      src="/favicon.svg"
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 select-none object-contain drop-shadow-md transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
      loading="eager"
      decoding="async"
    />
  );
};
