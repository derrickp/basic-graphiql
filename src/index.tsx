import React from "react";
import ReactDOM from "react-dom";

import GraphiQL from "graphiql";

declare const GRAPHQL_URI: string;
const uri = GRAPHQL_URI;

function graphQLFetcher(graphQLParams: any) {
  return fetch(uri, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(graphQLParams),
  }).then((response) => response.json());
}

const element = document.getElementById("graphiql");
ReactDOM.render(
  <GraphiQL fetcher={graphQLFetcher} editorTheme="dracula" />,
  element,
);