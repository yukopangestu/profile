import React from 'react';

const Image = ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={typeof src === 'string' ? src : ''} alt={alt} {...props} />;
};

export default Image;
