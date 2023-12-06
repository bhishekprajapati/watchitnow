import { IconPhoto } from "@tabler/icons-react";

const MediaCardSkeleton = () => {
  return (
    <div>
      <div className="bg-semi-dark-blue/75 shadow-2xl shadow-semi-dark-blue rounded-xl animate-shine">
        <div className="aspect-[22/33] flex items-center justify-center">
          <IconPhoto
            className="w-full h-full p-5 lg:p-8 text-dark-blue "
            stroke={1.5}
          />
        </div>
      </div>
      <div className="hidden lg:block py-4">
        <div className="mb-2 flex gap-x-2 rounded-md animate-pulse overflow-hidden">
          <span className="h-4 bg-semi-dark-blue flex-1"></span>
          <span className="h-4 bg-semi-dark-blue flex-1"></span>
          <span className="h-4 bg-semi-dark-blue flex-1"></span>
        </div>
        <div className="h-4 bg-semi-dark-blue rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default MediaCardSkeleton;
