import React, { HTMLProps } from "react";

export default function GridResultCell(
  props: {
    highlighted: boolean;
    result: "W" | "L" | "D" | null;
  } & HTMLProps<HTMLDivElement>
) {
  const { result, highlighted, className, ...divProps } = props;
  return (
    <div
      className={`grid-result ${
        result === "W"
          ? "grid-result--win"
          : result === "D"
          ? "grid-result--draw"
          : result === "L"
          ? "grid-result--loss"
          : "grid-result--incomplete"
      } ${highlighted ? "grid-result--highlighted" : ""} ${className}`}
      {...divProps}
    >
      {result ?? "-"}
    </div>
  );
}
