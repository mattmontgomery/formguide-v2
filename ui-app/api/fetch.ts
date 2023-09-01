import querystring from "querystring";

import logger from "@/logger";
import { LEAGUES } from "@/app/leagues";

export async function apiFetchRequest<T = unknown>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  if ("league" in params && !LEAGUES[params.league]) {
    throw new Error(
      `League must be in list of supported leagues (was ${params.league})`,
      {
        cause: `Passed in ${params.league}`,
      }
    );
  }
  const league = "league" in params ? LEAGUES[params.league] : undefined;
  const queryParams = querystring.stringify({ ...params, league });
  const { API_HOST, API_KEY } = process.env;
  const apiHost = String(API_HOST);
  const apiKey = String(API_KEY);
  const uri = `https://${apiHost}${endpoint}?${queryParams}`;
  logger.info(
    { endpoint, uri, queryParams },
    `API fetch request to ${endpoint}`
  );
  const resp = await fetch(uri, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
    next: {
      revalidate: 360,
    },
  });
  return resp.json();
}
