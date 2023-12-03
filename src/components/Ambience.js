export default function Ambience({}) {
  return (
    <>
      <img
        className="fixed z-0 top-0 left-[-25%] opacity-75 animate-breathe pointer-events-none"
        src="/ambience-left.png"
        loading="lazy"
      />
      <img
        className="fixed z-0 top-[50%] lg:top-0 right-[-25%] md:right-[-50%] opacity-50 animate-breathe pointer-events-none"
        src="/ambience-right.png"
        loading="lazy"
      />
    </>
  );
}
