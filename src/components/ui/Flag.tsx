import Image from 'next/image';

export default function Flag({
  className,
  name,
  src,
  width,
  height,
}: Readonly<{
  className?: string;
  name: string;
  src: string;
  width?: number;
  height?: number;
}>) {
  return (
    <div className={className || 'relative flex justify-center items-center w-7 h-5 overflow-hidden'}>
      <Image
        className="scale-125"
        src={src}
        alt={name}
        width={width || 40}
        height={height || 28}
      />
    </div>
  );
}
