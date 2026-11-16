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
      src={`${import.meta.env.BASE_URL}favicon.svg`}
      alt={alt}
      width={size}
      height={size}
      className={`shrink-0 object-contain shadow-sm select-none ${className}`}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
};
