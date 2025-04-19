
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        alt={alt}
        className={cn("transition-opacity duration-300", className)}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
