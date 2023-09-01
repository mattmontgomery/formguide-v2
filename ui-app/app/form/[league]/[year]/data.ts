import { ENDPOINT_FIXTURES } from "@/api";
import { apiFetchRequest } from "@/api/fetch";
import { imageOptimizer } from "next/dist/server/image-optimizer";

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

export async function fetchForm(options: { league: string; year: string }) {
  const data = apiFetchRequest<FixtureResponse>(ENDPOINT_FIXTURES, {
    league: options.league ?? "mls",
    season: options.year ?? new Date().getFullYear(),
  });
  return data;
}
