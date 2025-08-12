import { NextRequest, NextResponse } from "next/server"
import { Uploader } from "@irys/upload"
import { Ethereum } from "@irys/upload-ethereum"

const queryUrl = "https://uploader.irys.xyz/graphql";

export async function POST(req: NextRequest) {
  const { data, fileType, fileName, fileSize, owner = "Anonymous" } = await req.json();

  // const irysUploader = await Uploader(Ethereum).withWallet(process.env.PRIVATE_KEY);
  const buffer = new Blob([data], { type: fileType });

  console.log("Uploading file:", { fileName, fileType, fileSize, data: buffer, owner });
  const tags = [
    { name: "File-Owner", value: owner },
    { name: "File-Type", value: fileType },
    { name: "File-Name", value: fileName },
    { name: "File-Size", value: fileSize.toString() },
  ]

  // const res = await irysUploader.uploadFile(URL.createObjectURL(buffer), { tags })
  return NextResponse.json({ error: "Upload functionality is not implemented yet." });

  // return NextResponse.json({ id: res.id, url: `https://gateway.irys.xyz/${res.id}` })
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const fileId = searchParams.get("id");
  const tag = searchParams.get("tag");
  const value = searchParams.get("value");
  let to = searchParams.get("to");
  let from = searchParams.get("from");
  const limit = searchParams.get("limit");
  try{
    if(to && from) {
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

    const result = await response.json();
    console.log("GraphQL response:", result.errors ? result.errors.forEach((element: any) => {
      console.error("GraphQL error:", element);
    }) : "Success");
    return NextResponse.json(result.data);
  }

  if (fileId) {
    const query = `
      query getByTimestamp {
        transactions(timestamp: { ids: [${fileId}] }, first: ${limit || 100} }) {
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
    const variables = { ids: [fileId] };
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    console.log("GraphQL response:", result);
    console.log(result.data);
    return NextResponse.json(result);
  }

  if(tag) {
    const tags = { "name": tag, "value": value };
    const query = `
      query getByTag($tags: [TagFilter!]) {
    transactions(tags: ${tags}, first: ${limit} || 100) {
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
  `;
    const variables = { tags: [tags] };
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    console.log("GraphQL response:", result);
    console.log(result.data);
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "File retrieval functionality is not implemented yet." });
} catch (error) {
  console.error("Error occurred while fetching file:", error);
  return NextResponse.json({ error: "Internal server error" });
}
}