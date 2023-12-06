export default function Ambience({}) {
  return (
    <>
      <img
        className="fixed z-0 top-[60%] left-[50%] opacity-20 lg:opacity-40 animate-breathe pointer-events-none"
        src="/bg-blue-layer.svg"
        loading="lazy"
      />
      <img
        className="fixed z-0 top-[50%] lg:top-[25%] right-[0] md:right-[-40%] opacity-20 lg:opacity-40 animate-breathe pointer-events-none"
        src="/bg-pink-layer.svg"
        loading="lazy"
      />
    </>
  );
}
