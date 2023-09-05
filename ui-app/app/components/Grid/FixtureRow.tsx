import React from "react";
import { format } from "date-fns";
import type { Fixture } from "@/app/fixture/data";

import Image from "next/image";

export default function FixtureRow(props: {
  fixture?: Fixture;
  open: boolean;
}) {
  const { fixture, open = false } = props;
  const fixtureDate = fixture && new Date(fixture.fixture.date);
  const formattedFixtureDate =
    fixtureDate && format(fixtureDate, "MMMM d, yyyy");
  return (
    <div
      className={`${
        open ? "h-20" : "h-0"
      } transition-all grid gap-4 grid-cols-[150px,max-content]`}
    >
      <div></div>
      {fixture && (
        <div className="grid grid-flow-row gap-2 py-1">
          <div className="text-center text-sm font-bold text-gray-700">
            {formattedFixtureDate}
          </div>
          <div className="grid grid-cols-[1fr,100px,1fr] gap-4 text-sm font-semibold">
            <div className="justify-self-end">
              <div className="grid grid-flow-col grid-cols-[1fr,min-content] gap-2 items-center">
                <div>{fixture.teams.home.name}</div>
                <div className="w-8 h-8 relative">
                  <Image
                    alt={`${fixture.teams.home.name} team logo`}
                    fill
                    sizes="40px"
                    src={fixture.teams.home.logo}
                  />
                </div>
              </div>
            </div>
            <div className="justify-self-center self-center">
              {fixture.goals.home} - {fixture.goals.away}
            </div>
            <div>
              <div className="grid grid-flow-col grid-cols-[min-content,1fr] gap-2 items-center">
                <div className="w-8 h-8 relative">
                  <Image
                    alt={`${fixture.teams.away.name} team logo`}
                    fill
                    sizes="40px"
                    src={fixture.teams.away.logo}
                  />
                </div>
                <div>{fixture.teams.away.name}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
