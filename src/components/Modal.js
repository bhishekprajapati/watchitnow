import classNames from "classnames";

export default function Modal({ children, show }) {
  const modalClasses = classNames(
    "fixed z-50 left-[25%] right-[25%] top-[15%] translate-y-[30%] overflow-hidden",
    "h-[50vh] lg:h-[60vh] rounded-xl",
    "bg-gradient-to-tl from-semi-dark-blue/75 to-dark-blue backdrop-blur-3xl",
    "shadow-2xl shadow-black border-2 border-dark-blue",
    "opacity-0 pointer-events-none",
    "transition-all duration-75",
    { "!opacity-100 !pointer-events-auto !translate-y-0": show }
  );

  return (
    <>
      <div className={modalClasses}>{children}</div>
    </>
  );
}
