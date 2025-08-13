import { NextRequest, NextResponse } from "next/server"
import { TransactionNode } from "@/types/requests"
const queryUrl = "https://uploader.irys.xyz/graphql";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fileId = searchParams.get("id");
  const tag = searchParams.get("tag");
  const address = searchParams.get("address");
  let value = searchParams.get("value") || "";
  let to = searchParams.get("to");
  let from = searchParams.get("from");
  let limit = Number(searchParams.get("limit")) || 100;
  if(limit && limit > 1000) limit = 100;

  try{
    if (to && from && !(tag || fileId || address)) {
      to = to + "000";
      from = from + "000";
      const query = `query getByTimestamp {
        transactions(timestamp: { from: ${from}, to: ${to} }, first: ${limit || 100 }) {
          edges {
            node {
              id
              address
              size
              signature
              timestamp
              tags {
                name
                value
              }
            }
          }
      }}`;

    const variables = {
      "first": Number(limit) || 100,
      "timestamp": {
        "from": Number(from),
        "to": Number(to)
      }
    };

    const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

      const result: {
        data: {
          transactions: {
            edges: { node: TransactionNode }[]
          }
        }
      } = await response.json();

    return NextResponse.json(result.data);
  }

  if (fileId) {
    const query = `
      query getByIds($first: Int!, $ids: [String!]) {
        transactions(first: $first, ids: $ids) {
          edges {
            node {
              id
              address
              size
              signature
              timestamp
              tags {
                name
                value
              }
            }
          }
      }}
    `;
    const variables = { "ids": [fileId], "first": limit };
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result: {
      data: {
        transactions: {
          edges: { node: TransactionNode }[]
        }
        errors?: {
          message: string;
          extensions: object
        }
      }
    } = await response.json();
    return NextResponse.json(result.data);
  }

  if(tag) {
    value = value.replace(/%2F/g, "/");
    const tags = { "name": tag, "values": value };
    const query = `
    query getByTags($tags: [TagFilter!], $first: Int!) {
      transactions(first: $first, tags: $tags ) {
        edges {
          node {
            id
            address
            size
            signature
            timestamp
            tags {
              name
              value
            }
          }
        }
    }
  }
  `;
    const variables = { "tags": [tags], "first": Number(limit) };
   const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
   });
      const result: {
        data: {
          transactions: {
            edges: { node: TransactionNode }[]
          }
        errors?: {
          message: string;
          extensions: object
        }
        }
      } = await response.json();
    return NextResponse.json(result.data);
  }

  if(address){
    const query = `
      query getByOwners($first: Int!, $address: [String!]) {
        transactions(first: $first, owners: $address) {
          edges {
            node {
              id
              address
              size
              signature
              timestamp
              tags {
                name
                value
              }
            }
          }
        }
      }
    `;
    const variables = { "first": limit, "owners": [address] };
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });
    const result: {
      data: {
        transactions: {
          edges: { node: TransactionNode }[]
        }
        errors?: {
          message: string;
          extensions: object
        }
      }
    } = await response.json();
    return NextResponse.json(result.data);
  }
  return NextResponse.json({ error: "File retrieval functionality is not implemented yet." });
} catch (error) {
    console.error("Error occurred while fetching file:", error);
}
}