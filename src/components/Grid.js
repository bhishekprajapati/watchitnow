import { twMerge } from "tailwind-merge";
import classNames from "classnames";

function Grid({ as: GridContainer = "ul", className, children, ...props }) {
  const classes = classNames(
    "grid grid-cols-3 gap-4",
    "sm:grid-cols-4",
    "md:grid-cols-5 md:gap-6",
    "lg:grid lg:grid-cols-5 lg:gap-6",
    "xl:grid-cols-6",
    "2xl:grid-cols-7"
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
