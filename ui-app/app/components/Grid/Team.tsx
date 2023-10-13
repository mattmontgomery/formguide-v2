import { HTMLProps, PropsWithChildren } from "react";

export default function GridTeam(
  props: { team: string } & HTMLProps<HTMLDivElement>
) {
  const { team, ...htmlProps } = props;
  return (
    <div className="text-xs self-center cursor-pointer" {...htmlProps}>
      {props.team}
    </div>
  );
}
