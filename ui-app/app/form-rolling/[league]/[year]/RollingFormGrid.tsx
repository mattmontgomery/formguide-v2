"use client";

import type { Fixture } from "@/app/fixture/data";
import { getFixturePoints } from "@/app/fixture/data";
import { useCallback, useState } from "react";
import GridResultRow from "@/app/components/Grid/ResultRow";
import GridTeam from "@/app/components/Grid/Team";
import GridRow from "@/app/components/Grid/Row";
import { getRollingPeriodAverages } from "@/app/data/rolling";
import GridCell from "@/app/components/Grid/Cell";

import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);

function decimalToHex(d: number, padding: number = 2) {
  var hex = Number(d).toString(16);

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
}

export function getColorInRange({
  value,
  median = 1,
  min = 0,
  max = 3,
}: {
  value: number;
  median: number;
  min: number;
  max: number;
}): string {
  const range = [
    fullConfig.theme?.colors?.loss ?? "#ff0000",
    fullConfig.theme?.colors?.win ?? "#00ff00",
  ];
  const side = value < median ? 0 : 1;
  // if value = .7, (v - min) / (med - min) = 0.7 / 1,
  // if value = 2.5, (max - v) / (max - med) = 1.5 / 2
  const intensity =
    side === 0
      ? (value - min) / (median - min)
      : (max - value) / (max - median);
  return `${range[side]}${decimalToHex(intensity * 255)}`;
}

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
  const { teams, fixtures } = props;
  return (
    <div className="grid grid-flow-row gap-[2px]">
      {teams.sort().map((team, idx) => {
        const filteredAndSortedFixtures = fixtures
          .filter(
            (fixture) =>
              fixture.teams.home.name === team ||
              fixture.teams.away.name === team
          )
          .sort((a, b) => {
            const aDate = new Date(a.fixture.date);
            const bDate = new Date(b.fixture.date);
            return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
          });
        const rollingPeriods = getRollingPeriodAverages(
          filteredAndSortedFixtures
            .map((fixture) =>
              getFixturePoints(
                fixture,
                fixture.teams.home.name === team
                  ? fixture.teams.home
                  : fixture.teams.away
              )
            )
            .filter((points) => typeof points === "number") as number[],
          5
        );
        return (
          <div key={idx}>
            <GridRow
              className={` ${
                selectedTeams.length > 0 && !selectedTeams.includes(team)
                  ? "opacity-40"
                  : ""
              }`}
            >
              <GridTeam team={team} onClick={onSelectTeam.bind(null, team)} />
              <GridResultRow>
                {rollingPeriods.map((value, idx) => {
                  return (
                    <GridCell
                      className={`bg-[${getColorInRange({
                        value,
                        median: 1,
                        min: 0,
                        max: 3,
                      })}]`}
                      key={idx}
                    >
                      {value}
                    </GridCell>
                  );
                })}
              </GridResultRow>
            </GridRow>
          </div>
        );
      })}
    </div>
  );
}
