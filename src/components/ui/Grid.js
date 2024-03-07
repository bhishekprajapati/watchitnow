import { twMerge } from "tailwind-merge";
import classNames from "classnames";

function Grid({ as: GridContainer = "ul", className, children, ...props }) {
  const classes = classNames(
    "grid gap-6",
    "grid-cols-2",
    "sm:grid-cols-3",
    "md:grid-cols-4",
    "xl:grid-cols-5",
    "2xl:grid-cols-6"
  );

  return (
    <GridContainer className={twMerge(classes, className)} {...props}>
      {children}
    </GridContainer>
  );
}

Grid.Item = ({ as: GridItem = "li", children, className, ...props }) => {
  return (
    <GridItem className={className} {...props}>
      {children}
    </GridItem>
  );
};

export default Grid;
