import AspectRatio from "@/components/AspectRatio";
import { IconPhoto } from "@tabler/icons-react";

export default function Loading({}) {
  return (
    <>
      <div className="bg-semi-dark-blue/75 shadow-md shadow-semi-dark-blue rounded-xl">
        <AspectRatio
          value={22 / 33}
          className="flex items-center justify-center"
        >
          <IconPhoto
            className="w-full h-full p-5 lg:p-8 text-dark-blue animate-pulse"
            stroke={2}
          />
        </AspectRatio>
        <div className="hidden lg:block p-4">
          <div className="mb-2 flex gap-x-2 rounded-md animate-pulse overflow-hidden">
            <span className="h-4 bg-dark-blue flex-1"></span>
            <span className="h-4 bg-dark-blue flex-1"></span>
            <span className="h-4 bg-dark-blue flex-1"></span>
          </div>
          <div className="h-4 bg-dark-blue rounded-md animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
