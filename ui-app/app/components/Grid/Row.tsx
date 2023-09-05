import React from "react";
import type { HTMLProps } from "react";

export default function GridRow(props: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={`grid grid-flow-col gap-4 grid-cols-[150px,auto] text-right ${props.className}`}
    >
      {props.children}
    </div>
  );
}
