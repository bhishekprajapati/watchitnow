import { IconPhoto } from "@tabler/icons-react";
import classNames from "classnames";

const MediaCardSkeleton = ({ variant = "poster" }) => {
  const isPosterVariant = variant === "poster";

  return (
    <div>
      <div className="bg-semi-dark-blue/75 shadow-2xl shadow-semi-dark-blue rounded-xl animate-shine">
        <div
          className={classNames(
            "flex items-center justify-center",
            isPosterVariant ? "aspect-[22/33]" : "aspect-video"
          )}
        >
          <IconPhoto
            className="w-full h-full p-5 lg:p-8 text-dark-blue "
            stroke={1.5}
          />
        </div>
      </div>
      <div className="hidden lg:block py-4">
        <div className="h-4 bg-semi-dark-blue rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default MediaCardSkeleton;
