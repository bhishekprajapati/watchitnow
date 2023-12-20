import { IconMoodCry } from "@tabler/icons-react";

export default function NoResults() {
  return (
    <div className="p-6 text-center">
      <IconMoodCry
        className="inline-block mb-4 text-red/50"
        width={36}
        height={36}
      />
      <p className="mb-2 text-sm text-white/75 ">
        Oops! It seems we couldn't find any results for the given search query.
      </p>

      <p className="hidden lg:block text-sm text-white/75 ">
        Consider refining your search or try another term!
      </p>
    </div>
  );
}
