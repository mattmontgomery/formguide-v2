"use client";

import type { Fixture } from "@/app/fixture/data";
import { getFixtureResultCode } from "@/app/fixture/data";
import { useCallback, useState } from "react";
import GridResultCell from "@/app/components/Grid/ResultCell";
import GridResultRow from "@/app/components/Grid/ResultRow";
import GridTeam from "@/app/components/Grid/Team";
import GridRow from "@/app/components/Grid/Row";
import FixtureRow from "@/app/components/Grid/FixtureRow";

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
            <GridRow
              className={
                selectedTeams.length > 0 && !selectedTeams.includes(team)
                  ? "opacity-40"
                  : ""
              }
            >
              <GridTeam team={team} onClick={onSelectTeam.bind(null, team)} />
              <GridResultRow>
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
              </GridResultRow>
            </GridRow>

            <FixtureRow
              open={selectedFixture?.team === team}
              fixture={
                selectedFixture?.team === team
                  ? selectedFixture.fixture
                  : undefined
              }
              key={selectedFixture?.fixture.fixture.id}
            />
          </div>
        );
      })}
    </div>
  );
}
