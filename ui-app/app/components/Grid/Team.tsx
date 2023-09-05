import { HTMLProps, PropsWithChildren } from "react";

export default function GridTeam(
  props: { team: string } & HTMLProps<HTMLDivElement>
) {
  return <div className="text-xs self-center cursor-pointer">{props.team}</div>;
}
