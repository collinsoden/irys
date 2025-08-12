"use client"

import Link from "next/link"
import { Twitter, Instagram, Facebook, Youtube } from "lucide-react"
// import { mainNavigation, socialLinks } from "@/lib/navigation"
// import {   Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL} from "@solana/web3.js"
// import { Button } from "../ui"

// const footerNavigation = {
//   main: mainNavigation.filter(item => !item.children),
//   social: socialLinks,
// }

const contactInfo = [
  {
    id: "twitter",
    icon: Twitter,
    href: "https://x.com/intent/user?screen_name=__serverless",
    isExternal: true,
  },
  {
    id: "instagram",
    icon: Instagram,
    href: "https://instagram.com/irys_xyz",
    isExternal: true,
  },
  {
    id: "facebook",
    icon: Facebook,
    href: "https://facebook.com/irys_xyz",
    isExternal: true,
  },
  {
    id: "youtube",
    icon: Youtube,
    href: "https://youtube.com/@irys_xyz",
    isExternal: true,
  }
]

export function Footer() {
  return (
    <footer className="bg-black text-white text-center border-t border-theme">
      <div className="mx-auto md:w-6/12 w-11/12 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Call to Action */}
        <div className="">
          <h3 className="text-4xl font-bold font-inter tracking-tight text-theme">
            Explore the World of Onchain Data
          </h3>
          <p className="mt-2 text-sm text-gray-400">
            Get updates on Irys uploads, smart contract insights, and programmable storage.
          </p>
        </div>

        {/* Support Dev */}
        {/* <div className="mt-4">
          <form
            className="flex flex-col md:flex-row gap-2 rounded-lg border-0 p-2 bg-gray-900 items-center justify-center"
            onSubmit={async e => {
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const formData = new FormData(form)
              const network = formData.get("network") as string
              const amount = formData.get("amount") as string

              // Preset recipient addresses for each network
              const recipients: Record<string, string> = {
                ETH: "0x403c263887fafeca45e342ff298b4732aa7c54a8",
                ARB: "0x403c263887fafeca45e342ff298b4732aa7c54a8",
                POL: "0x403c263887fafeca45e342ff298b4732aa7c54a8",
                SOL: "3WC5NUr9KUvGwJKf42dy4DJ6AjC8XxQ1jfGy2b1MPPxg",
              }

              // Prepare and send transaction
              try {
          if (network === "SOL") {
            // Solana transaction (using window.solana)
            // @ts-ignore
            const provider = window.solana
            if (!provider?.isPhantom) {
              alert("Please install Phantom Wallet for Solana.")
              return
            }
            await provider.connect()
            // You would use @solana/web3.js here in a real app
            alert(`Prepare Solana tx to ${recipients.SOL} for ${amount} SOL`)

            const connection = new Connection("https://api.mainnet-beta.solana.com")
            const recipientPubkey = new PublicKey(recipients.SOL)
            const sender = provider.publicKey
            const lamports = Math.floor(Number(amount) * LAMPORTS_PER_SOL)

            const transaction = new Transaction().add(
              SystemProgram.transfer({
                fromPubkey: sender,
                toPubkey: recipientPubkey,
                lamports,
              })
            )

            const { blockhash } = await connection.getLatestBlockhash()
            transaction.recentBlockhash = blockhash
            transaction.feePayer = sender

            const signed = await provider.signTransaction(transaction)
            const txid = await connection.sendRawTransaction(signed.serialize())
            alert(`Solana transaction sent: https://explorer.solana.com/tx/${txid}`)
          } else {
            // EVM transaction (Ethereum, Arbitrum, Polygon)
            // @ts-ignore
            const { ethereum } = window
            if (!ethereum) {
              alert("Please install MetaMask or compatible wallet.")
              return
            }
            await ethereum.request({ method: "eth_requestAccounts" })
            const txParams = {
              to: recipients[network],
              value: (BigInt(Number(amount) * 1e18)).toString(16), // in wei
            }
            await ethereum.request({
              method: "eth_sendTransaction",
              params: [txParams],
            })
            alert(`Transaction sent to ${recipients[network]} for ${amount} ${network}`)
          }
              } catch (err) {
                console.log("Transaction error:", err)
                // Handle error appropriately
                if (err instanceof Error) {
                  alert(`Transaction failed: ${err.message}`)
                } else {
                  alert("Transaction failed or cancelled.")
                }
              }
            }}
          >
            <select
              className="flex-1 px-4 py-3 bg-gray-900 text-sm text-white rounded-lg border border-gray-700 focus:outline-none"
              defaultValue="ETH"
              name="network"
              required
            >
              <option value="SOL">Solana (SOL) </option>
              <option value="ETH">Ethereum (ETH) </option>
              <option value="ARB">Arbitrum (ETH) </option>
              <option value="POL">Polygon (POL) </option>
            </select>
            <input
              type="number"
              min="0"
              step="any"
              placeholder="Amount"
              className="flex-1 px-4 py-3 bg-gray-900 text-sm text-white placeholder:text-gray-400 rounded-lg border border-gray-700 focus:outline-none"
              name="amount"
              required
            />
            <Button
              type="submit"
            >
              Support Dev
            </Button>
          </form>
        </div> */}

        {/* Social Links */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          {contactInfo.map((contact) => (
            <a
              key={contact.id}
              href={contact.href}
              target={contact.isExternal ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-theme-blue transition-colors hover:text-white"
            >
              <contact.icon className="h-5 w-5 text-gray-400 hover:text-white" />
            </a>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 border-t border-gray-800 pt-4">
          <p className="text-sm text-theme">
            © {new Date().getFullYear()} IrysExplorer 3D. Built by
            <Link href="https://x.com/intent/user?screen_name=__serverless" target="_blank" className="text-theme-red px-1 text-md">
             Serverless
            </Link>
            with ❤️ for the Irys ecosystem.
          </p>
        </div>
      </div>
    </footer>
  )
}
