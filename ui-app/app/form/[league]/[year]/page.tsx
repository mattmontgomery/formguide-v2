import React, { useCallback, useState } from "react";
import { fetchForm } from "./data";
import Grid from "./Grid";
import PageHeader from "@/app/components/Page/Header";
import { LEAGUES } from "@/app/leagues";
import { GetStaticPathsResult } from "next";

export default async function MatchIdPage({
  params,
}: {
  params: { league: string; year: string };
}) {
  const year = String(params.year);
  const league = String(params.league);
  const data = await fetchForm({ league, year });
  const teams = data.response.reduce((acc: Record<string, number>, fixture) => {
    const add: Record<string, number> = {};
    if (!(fixture.teams.home.name in acc)) {
      add[fixture.teams.home.name] = fixture.teams.home.id;
    }
    if (!(fixture.teams.away.name in acc)) {
      add[fixture.teams.away.name] = fixture.teams.away.id;
    }
    return { ...acc, ...add };
  }, {});

  return (
    <div>
      <PageHeader
        renderTitle={() => <>Form Guide</>}
        renderSubtitle={() => (
          <>
            {league.toUpperCase()} | {year}
          </>
        )}
      />
      <Grid fixtures={data.response} teams={Object.keys(teams)} />
    </div>
  );
}

export function generateStaticParams(): { year: string; league: string }[] {
  return Object.keys(LEAGUES).flatMap((league) => {
    return [
      2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
    ].map((year) => {
      return {
        league,
        year: String(year),
      };
    });
  });
}
