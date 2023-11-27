export default function GridItem({
  as: Element = "li",
  className,
  children,
  ...props
}) {
  return (
    <Element className={className} {...props}>
      {children}
    </Element>
  );
}
