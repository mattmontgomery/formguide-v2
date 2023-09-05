import React, { HTMLProps } from "react";

export default function GridCell(props: HTMLProps<HTMLDivElement>) {
  const { className, ...divProps } = props;
  return (
    <div className={`grid-result ${className}`} {...divProps}>
      {props.children}
    </div>
  );
}
