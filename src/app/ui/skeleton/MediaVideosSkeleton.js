import List from "@/components/List";

export default function MediaVideosSkeleton({}) {
  const videos = new Array(10).fill(1); // dummy

  return (
    <List
      className="auto-cols-[100%] sm:auto-cols-[50%] md:auto-cols-[40%] xl:auto-cols-[30%] 2xl:auto-cols-[25%] gap-x-8"
      scrollable="horizontal"
    >
      {videos.map((video, idx) => (
        <li key={idx} className="relative">
          <div className="mb-4 aspect-video bg-semi-dark-blue rounded-lg animate-shine"></div>
          <span className="inline-block rounded w-[50%] h-5 bg-semi-dark-blue animate-shine"></span>
          <div className="absolute top-0 right-0 w-[40%] p-4">
            <span className="inline-block rounded w-full h-5 bg-dark-blue animate-shine"></span>
          </div>
        </li>
      ))}
    </List>
  );
}
