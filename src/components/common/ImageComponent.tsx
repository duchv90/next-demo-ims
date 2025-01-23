import Image from 'next/image';

export default function ImageComponent({
  src,
  alt,
  width,
  height,
  maxWidth,
}: Readonly<{
  src: string;
  alt: string;
  width: number;
  height: number;
  maxWidth?: number;
}>) {
  const maxWidthClass = maxWidth ? ` max-w-[${maxWidth}px]` : '';

  return (
    <div className={`relative w-full max-h-full${maxWidthClass}`}>
      <span
        className="pointer-events-none block w-full"
        style={{ paddingTop: `${(height / width) * 100}%` }}
      ></span>
      <Image
        className="absolute left-0 top-0 size-full object-cover"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}
