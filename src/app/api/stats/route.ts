import { NextRequest, NextResponse } from "next/server"
const baseUrl = "https://analytics-api.irys.xyz/testnet-1/metrics";

export async function GET(req: NextRequest) {
  try {
    let transactions: any = [];
    let activeAddresses: number = 0;
    let totalVolume: number = 0;
    let totalTx: number = 0;

  const transactionsResponse = await fetch(`${baseUrl}/transactions/bundler/cumulative`, { cache: 'force-cache' });

  const addressesResponse = await fetch(`${baseUrl}/addresses/bundler/month`, { cache: 'force-cache' });

  const volumeResponse = await fetch(`${baseUrl}/data/volume/bundler/month`, { cache: 'force-cache' });

  if (transactionsResponse.ok) {
    transactions = await transactionsResponse.json();
    for (const tx of transactions.data) {
      totalTx += Number(tx.cumulative_sum);
    }
  }

  if (addressesResponse.ok) {
    const addressesData = await addressesResponse.json();
    for (const address of addressesData.data) {
      activeAddresses += Number(address.cumulative_active_addresses);
    }
  }

  if (volumeResponse.ok) {
    const volumeData = await volumeResponse.json();
    for (const vol of volumeData.data) {
      totalVolume += Number(vol.bytes);
    }
  }

  return NextResponse.json({
    transactions, totalTx, activeAddresses, totalVolume
  });
}catch(error) {
  console.error("Error fetching stats: ", error);
  return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
}
}