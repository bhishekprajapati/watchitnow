import { IconSquareRoundedChevronRightFilled } from "@tabler/icons-react";

export default function ShowMoreCard({}) {
  return (
    <div className="aspect-[22/33] gap-2 flex flex-col items-center justify-center rounded-xl bg-semi-dark-blue">
      <IconSquareRoundedChevronRightFilled size={24} className="text-yellow" />
      More
    </div>
  );
}
