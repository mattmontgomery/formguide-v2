export type FixtureTeam = {
  id: number;
  name: string;
  logo: string;
  winner: boolean;
};
export type Fixture = {
  fixture: {
    id: number;
    referee: string;
    timezone: "UTC" | string;
    date: string;
    timestamp: number;
    periods: {
      first: number;
      second: number;
    };
    venue: {
      id: number;
      name: string;
      city: string;
    };
    status: {
      long: "Match Finished" | "Not Started";
      short: "FT" | "NS";
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
    round: string;
  };
  teams: {
    home: FixtureTeam;
    away: FixtureTeam;
  };
  goals: {
    home: number;
    away: number;
  };
  score: {
    halftime: {
      home: number;
      away: number;
    };
    fulltime: {
      home: number;
      away: number;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
};

export function getFixtureResult(fixture: Fixture): FixtureTeam | null {
  if (fixture.goals.home === fixture.goals.away) {
    return null;
  }
  if (fixture.goals.home > fixture.goals.away) {
    return fixture.teams.home;
  }
  return fixture.teams.away;
}
export function getFixtureResultCode(
  fixture: Fixture,
  team: FixtureTeam
): "W" | "L" | "D" | null {
  if (fixture.fixture.status.long !== "Match Finished") {
    return null;
  }
  if (fixture.goals.home === fixture.goals.away) {
    return "D";
  }
  const winner =
    fixture.goals.home > fixture.goals.away
      ? fixture.teams.home
      : fixture.teams.away;
  return winner?.name === team.name ? "W" : winner ? "L" : "D";
}

export function getFixturePoints(
  fixture: Fixture,
  team: FixtureTeam
): 3 | 1 | 0 | null {
  const code = getFixtureResultCode(fixture, team);
  switch (code) {
    case "W":
      return 3;
    case "D":
      return 1;
    case "L":
      return 0;
  }
  return null;
}
