import { ENDPOINT_FIXTURES_EVENTS } from "@/app/api";
import { apiFetchRequest } from "@/app/api/fetch";

export async function fetchMatchEvents(matchID: string): Promise<MatchEvents> {
  return await apiFetchRequest(ENDPOINT_FIXTURES_EVENTS, { fixture: matchID });
}

export type MatchEvents = {
  get: "fixtures/events";
  parameters: {
    fixture: string;
  };
  errors: [];
  results: number;
  paging: {
    current: number;
    total: number;
  };
  response?: {
    time: {
      elapsed: number;
      extra: number | null;
    };
    team: {
      id: number;
      name: string;
      logo: string;
    };
    player: {
      id: number;
      name: string;
    };
    assist: {
      id: number | null;
      name: number | null;
    };
    type: "Card" | "Goal" | "subst" | "Var";
    detail:
      | "Yellow Card"
      | "Red Card"
      | "Normal Goal"
      | "Own Goal"
      | "Penalty cancelled"
      | "Substitution 1"
      | "Substitution 2"
      | "Substitution 3"
      | "Substitution 4"
      | "Substitution 5"
      | "Substitution 6"
      | "Substitution 7"
      | "Substitution 8"
      | "Substitution 9"
      | "Substitution 10"
      | "Substitution 11";
    comments: null;
  };
};
