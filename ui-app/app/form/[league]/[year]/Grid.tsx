"use client";

import type { Fixture } from "@/app/fixture/data";
import { getFixtureResultCode } from "@/app/fixture/data";
import { useCallback, useState } from "react";
import GridResultCell from "@/app/components/Grid/ResultCell";
import Image from "next/image";
import { format } from "date-fns";

export default function Grid(props: { teams: string[]; fixtures: Fixture[] }) {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const onSelectTeam = useCallback(
    (team: string) => {
      setSelectedTeams((selectedTeams) => {
        return selectedTeams?.includes(team)
          ? selectedTeams.filter((t) => t !== team)
          : [...selectedTeams, team];
      });
    },
    [setSelectedTeams]
  );

  const [selectedFixture, setSelectedFixture] = useState<{
    team: string;
    fixture: Fixture;
  }>();

  const onSelectFixture = useCallback((team: string, fixture: Fixture) => {
    setSelectedFixture((prevState) =>
      prevState?.fixture === fixture ? undefined : { team, fixture }
    );
  }, []);

  const { teams, fixtures } = props;
  return (
    <div className="grid grid-flow-row gap-[2px]">
      {teams.sort().map((team, idx) => {
        return (
          <div key={idx}>
            <div
              className={`grid grid-flow-col gap-4 grid-cols-[150px,auto] text-right ${
                selectedTeams.length > 0 && !selectedTeams.includes(team)
                  ? "opacity-40"
                  : ""
              }`}
            >
              <div
                className="text-xs self-center cursor-pointer"
                onClick={onSelectTeam.bind(null, team)}
              >
                {team}
              </div>
              <div className="grid grid-flow-col gap-0 grid-cols-[repeat(40,0fr)]">
                {fixtures
                  .filter(
                    (fixture) =>
                      fixture.teams.home.name === team ||
                      fixture.teams.away.name === team
                  )
                  .sort((a, b) => {
                    const aDate = new Date(a.fixture.date);
                    const bDate = new Date(b.fixture.date);
                    return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
                  })
                  .map((fixture, idx) => {
                    const result = getFixtureResultCode(
                      fixture,
                      fixture.teams.home.name === team
                        ? fixture.teams.home
                        : fixture.teams.away
                    );

                    return (
                      <GridResultCell
                        className="cursor-pointer"
                        highlighted={
                          selectedFixture?.fixture === fixture &&
                          selectedFixture.team === team
                        }
                        key={idx}
                        onClick={onSelectFixture.bind(null, team, fixture)}
                        result={result}
                      />
                    );
                  })}
              </div>
            </div>
            <div
              className={`${
                selectedFixture?.team === team ? "h-20" : "h-0"
              } transition-all grid gap-4 grid-cols-[150px,max-content]`}
            >
              <div></div>
              {selectedFixture?.team === team && (
                <FixtureRow
                  fixture={selectedFixture.fixture}
                  key={selectedFixture.fixture.fixture.id}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function FixtureRow(props: { fixture: Fixture }) {
  const { fixture } = props;
  const fixtureDate = new Date(fixture.fixture.date);
  const formattedFixtureDate = format(fixtureDate, "MMMM d, yyyy");
  return (
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
  );
}
