import classNames from "classnames";

export default function Modal({ children, show }) {
  const modalClasses = classNames(
    "absolute z-50 left-[10%] right-[10%] bottom-0 translate-y-[150%] lg:left-[25%] lg:right-[25%] translate-y-[30%] overflow-hidden",
    "h-[50vh] lg:h-[60vh] rounded-xl",
    "bg-gradient-to-tl from-semi-dark-blue/75 to-dark-blue backdrop-blur-3xl",
    "shadow-2xl shadow-black border-2 border-dark-blue",
    "opacity-0 pointer-events-none",
    "transition-all duration-75",
    { "!opacity-100 !pointer-events-auto !translate-y-[102%]": show }
  );

  return (
    <>
      <div className={modalClasses}>{children}</div>
    </>
  );
}
