import { FC } from "react";
import Image from "next/image";
import { Result } from "@/types/results";

interface Props {
  data: Result;
}

const Card: FC<Props> = ({ data }) => {
  // create quick shimmer effect for NextJS image placeholder
  const shimmer = () => {
    return (
      `<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">` +
      `<defs><linearGradient id="shimmer"><stop offset="20%" stop-opacity="0.1" />` +
      `<stop offset="50%" stop-opacity="0.2" /><stop offset="80%" stop-opacity="0.1" /></linearGradient></defs>` +
      `<rect width="100%" height="100%" fill="url(#shimmer)"><animate attributeName="x" from="-100%" to="100%" dur="2s" repeatCount="indefinite" /></rect>` +
      `</svg>`
    )
      .replace(/\n/g, "")
      .replace(/"/g, "'");
  };

  const shimmerBase64 = () => {
    return `data:image/svg+xml;base64,${Buffer.from(shimmer()).toString(
      "base64"
    )}`;
  };

  return (
    <div
      className="w-[200px] border-2 border-black/50 rounded-xl flex flex-col 
      items-center justify-between overflow-hidden group"
    >
      <Image
        src={data.img}
        height={200}
        width={200}
        alt="NFT image"
        placeholder="blur"
        blurDataURL={shimmerBase64()}
        className="group-hover:scale-110 transition-transform ease-in-out duration-500 overflow-hidden"
      />
      {/* info section */}
      <div
        className="h-14 w-full px-2 flex items-center justify-between text-xs
        border-t-2 border-black/50 z-10 bg-white"
      >
        <p>{data.title}</p>
        <p>{`${Math.floor(data.price * 10) / 10} SOL`}</p>
      </div>
    </div>
  );
};

export default Card;
