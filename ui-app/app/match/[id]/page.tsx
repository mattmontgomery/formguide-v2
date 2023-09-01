import React from "react";
import { fetchMatchEvents } from "./data";

export default async function MatchIdPage({
  params,
}: {
  params: { id: string };
}) {
  const id = String(params.id);
  const data = await fetchMatchEvents(id);
  return (
    <div>
      <div>hi! The ID is: {id}</div>
      <div className="whitespace-pre-wrap font-mono">
        {JSON.stringify(data, null, 2)}
      </div>
    </div>
  );
}
