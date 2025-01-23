import Image from 'next/image';

export default function UserAvatar({
  image,
  name,
}: Readonly<{ image?: string | null; name: string }>) {
  return (
    <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-primary text-white">
      {image && image !== '' ? (
        <Image
          className="size-full object-cover"
          src={image}
          width={32}
          height={32}
          alt={name}
        />
      ) : (
        <div className="p-1">
          <span className="font-medium uppercase">{name}</span>
        </div>
      )}
    </div>
  );
}
