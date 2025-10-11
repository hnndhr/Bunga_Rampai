import Image from 'next/image';
import Link from 'next/link';

interface SurveyCardProps {
  image: string;
  title: string;
  altText: string;
}

export default function SurveyPageCard({ image, title, altText }: SurveyCardProps) {
  return (
    <div className="bg-[#21262d] rounded-2xl overflow-hidden group transition-transform duration-300 ease-in-out hover:scale-105">
      <Link href="#">
        <div className="relative aspect-[3/4]">
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover"
          />
        </div>
        <p className="p-4 text-center text-gray-300 group-hover:text-white">
          {title}
        </p>
      </Link>
    </div>
  );
}