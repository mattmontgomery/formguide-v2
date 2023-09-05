import { ENDPOINT_FIXTURES } from ".";
import { apiFetchRequest } from "./fetch";

import type { Fixture } from "@/app/fixture/data";

export type FixtureResponse = {
  data: {
    get: "fixtures";
    parameters: {
      league: "253";
      season: "2023";
    };
    errors: [];
    results: 493;
    paging: {
      current: 1;
      total: 1;
    };
  };
  response: Fixture[];
};

export default async function fetchForm(options: {
  league: string;
  year: string;
}) {
  const data = apiFetchRequest<FixtureResponse>(ENDPOINT_FIXTURES, {
    league: options.league ?? "mls",
    season: options.year ?? new Date().getFullYear(),
  });
  return data;
}

export function getTeamsFromForm(
  data: Awaited<ReturnType<typeof fetchForm>>
): Record<string, number> {
  return data.response.reduce((acc: Record<string, number>, fixture) => {
    const add: Record<string, number> = {};
    if (!(fixture.teams.home.name in acc)) {
      add[fixture.teams.home.name] = fixture.teams.home.id;
    }
    if (!(fixture.teams.away.name in acc)) {
      add[fixture.teams.away.name] = fixture.teams.away.id;
    }
    return { ...acc, ...add };
  }, {});
}
