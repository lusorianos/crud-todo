import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const containerVariants = cva("mx-auto",
  {
    variants: {
      size: {
        md: "max-w-lg px-2"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

interface containerProps extends VariantProps<typeof containerVariants>,
  React.ComponentProps<"div"> {
    as?: keyof React.JSX.IntrinsicElements;
  }

export default function Container({
  as = "div",
  children,
  className,
  ...props
}: containerProps){
  return React.createElement(
    as,
    {
      className: containerVariants({size: "md", className}),
      ...props,
    },
    children
  );
}