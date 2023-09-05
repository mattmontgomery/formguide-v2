import React from "react";
import fetchForm, { getTeamsFromForm } from "@/app/api/form";
// import Grid from "./Grid";
import PageHeader from "@/app/components/Page/Header";
import { LEAGUES } from "@/app/leagues";
import RollingFormGrid from "./RollingFormGrid";

export default async function MatchIdPage({
  params,
}: {
  params: { league: string; year: string };
}) {
  const year = String(params.year);
  const league = String(params.league);
  const data = await fetchForm({ league, year });
  const teams = getTeamsFromForm(data);

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
      <RollingFormGrid fixtures={data.response} teams={Object.keys(teams)} />
    </div>
  );
}

export function generateStaticParams(): { year: string; league: string }[] {
  return Object.keys(LEAGUES).flatMap((league) => {
    return [
      2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012,
    ].map((year) => {
      return {
        league,
        year: String(year),
      };
    });
  });
}
