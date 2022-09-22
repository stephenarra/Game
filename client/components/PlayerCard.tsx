import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";

interface Props {
  name: string;
  avatar: string;
  isLeader?: boolean;
  subtitle?: string;
}

const CompactPlayer = ({ name, avatar, isLeader, subtitle }: Props) => (
  <div className="relative flex flex-col items-center p-2 m-2">
    {!!isLeader && (
      <StarIcon className="absolute w-3 h-3 text-blue-500 top-1 right-1" />
    )}
    <Image src={avatar} alt="" width={40} height={40} />
    <header className="text-center">
      <h3 className="mb-1 text-gray-900 text-md">{name}</h3>
      {!!subtitle && (
        <div className="text-sm font-medium text-gray-500">{subtitle}</div>
      )}
    </header>
  </div>
);

const BigPlayer = ({ name, avatar, isLeader, subtitle }: Props) => (
  <div className="p-6 m-2 break-all w-44">
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col items-center p-3 bg-gray-200 rounded-full shadow-md">
        {!!isLeader && (
          <StarIcon className="absolute w-6 h-6 text-yellow-500 top-0.5 right-0.5" />
        )}
        <Image src={avatar} alt="" width={80} height={80} />
      </div>
      <header className="pt-2 text-center">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        {!!subtitle && (
          <div className="mt-1 text-sm font-medium text-gray-500">
            {subtitle}
          </div>
        )}
      </header>
    </div>
  </div>
);

interface PlayerProps extends Props {
  format?: "compact";
}

const Player = (props: PlayerProps) => {
  const Component = props.format === "compact" ? CompactPlayer : BigPlayer;
  return <Component {...props} />;
};

export default Player;
