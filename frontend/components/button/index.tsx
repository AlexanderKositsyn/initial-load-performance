import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { merge } from "@fe/utils/merge-classnames";

type Appearance = "primary" | "secondary" | "text" | "link" | "danger";
type Size = "sm" | "md" | "lg" | "xl" | "responsive-sm" | "responsive-md";

type ButtonProps = {
  as?: "button" | "span";
  appearance?: Appearance;
  size?: Size;
  children?: ReactNode;
  before?: ReactElement;
  after?: ReactElement;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyle =
  "inline-flex gap-2 items-center justify-center rounded shrink-0 blink-double-focus-ring";

const sizeStyles: Record<Size, string> = {
  sm: "text-sm h-8 px-3 py-1",
  md: "text-sm h-10 px-3 py-1",
  lg: "text-base h-11 px-4 py-2",
  xl: "text-lg h-14 px-5 py-2",
  "responsive-sm": "h-11 sm:h-8 text-base sm:text-sm w-full sm:w-auto flex sm:inline-flex",
  "responsive-md": "h-14 sm:h-10 text-lg sm:text-sm w-full sm:w-auto flex sm:inline-flex",
};

const appearanceStyles: Record<Appearance, string> = {
  primary: merge(
    "bg-blinkNeutral900 hover:bg-blinkGray900 text-blinkGray50 disabled:bg-blinkNeutral300 disabled:text-blinkNeutral50 focus-visible:ring-offset-2",
    "dark:bg-blinkGray50 dark:hover:bg-blinkGray400 dark:text-blinkGreen900 dark:disabled:bg-blinkGray400 dark:disabled:text-blinkNeutral400"
  ),
  secondary: merge(
    "bg-blinkGray600 hover:bg-blinkGray900 text-blinkGray50 disabled:bg-blinkNeutral300 disabled:text-blinkNeutral50 focus-visible:ring-offset-2",
    "dark:bg-blinkGray400 dark:hover:bg-blinkGray100 dark:text-blinkGreen900 dark:disabled:bg-blinkGray400 dark:disabled:text-blinkNeutral400"
  ),
  text: merge(
    "bg-transparent hover:bg-blinkGray200 text-blinkGreen900b disabled:text-blinkGray400 disabled:hover:bg-transparent focus-visible:ring-offset-0",
    "dark:hover:bg-blinkGray800 dark:text-blinkNeutral50 dark:disabled:text-blinkNeutral500 dark:disabled:hover:bg-transparent"
  ),
  link: merge(
    "underline underline-offset-2 bg-transparent hover:bg-blinkGray200 text-blinkGreen900b disabled:hover:bg-transparent disabled:text-blinkGray400 focus-visible:ring-offset-0",
    "dark:hover:bg-blinkGray800 dark:text-blinkNeutral50 dark:disabled:hover:bg-transparent dark:disabled:text-blinkNeutral500"
  ),
  danger: merge(
    "bg-blinkNeutral50 hover:bg-blinkCoral50/20 text-blinkCoral400 disabled:bg-blinkNeutral300 disabled:text-blinkNeutral50 border border-blinkCoral400 focus-visible:ring-offset-2",
    "dark:bg-blinkGray900 dark:hover:bg-blinkGray800 dark:text-blinkNeutral50 dark:disabled:bg-blinkGray400 dark:disabled:text-blinkNeutral400 dark:border-blinkCoral300"
  ),
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      as = "button",
      appearance = "primary",
      size = "md",
      children,
      before,
      after,
      className,
      ...rest
    },
    ref
  ) => {
    const Component = as;

    return (
      <Component
        ref={ref}
        type="button"
        className={merge(baseStyle, sizeStyles[size], appearanceStyles[appearance], className)}
        {...rest}
      >
        {before}
        {children}
        {after}
      </Component>
    );
  }
);

Button.displayName = "Button";
