import type { HTMLProps, PropsWithChildren } from "react";

export default function GridResultRow(
  props: PropsWithChildren & HTMLProps<HTMLDivElement>
) {
  const { children, className, ...divProps } = props;
  return (
    <div
      {...divProps}
      className={`grid grid-flow-col gap-0 grid-cols-[repeat(40,0fr)] ${className}`}
    >
      {props.children}
    </div>
  );
}
