import { ENDPOINT_FIXTURES } from ".";
import { apiFetchRequest } from "./fetch";

import type { Fixture } from "@/app/fixture/data";

export type FixtureResponse = {
  data: {
    get: "fixtures";
    parameters: {
      league: string;
      season: string;
    };
    errors: [];
    results: number;
    paging: {
      current: number;
      total: number;
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
  return data.response.reduce<ReturnType<typeof getTeamsFromForm>>(
    (acc, fixture) => {
      if (!(fixture.teams.home.name in acc)) {
        acc[fixture.teams.home.name] = fixture.teams.home.id;
      }
      if (!(fixture.teams.away.name in acc)) {
        acc[fixture.teams.away.name] = fixture.teams.away.id;
      }
      return acc;
    },
    {}
  );
}
