    'use client'

    import { useState } from 'react'
    import { Button } from "@/components/ui/button"
    import { Input } from "@/components/ui/input"
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
    import { Sparkles, Rocket, TrendingUp, DollarSign } from 'lucide-react'
    import Link from 'next/link'  
    import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
  import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
  import UserInfo from './login/UserInfo'
  

    export default function LandingPage() {
      const [isLoginOpen, setIsLoginOpen] = useState(false)



      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white">
          <header className="container mx-auto px-4 py-6 flex justify-between items-center">
            <div className="text-3xl font-bold">Brett Memer</div>
         
            <DynamicContextProvider
      settings={{
        environmentId: 'e2850a7d-c15d-4e76-9bfe-2b23006ece98',
        walletConnectors: [ EthereumWalletConnectors ],
      }}>
        <div className="App">
          {/* Wallet Connect Widget */}
          <DynamicWidget />
          
          {/* Display User Info */}
          <UserInfo />
        </div>

      {/* <DynamicWidget /> */}
    </DynamicContextProvider>
                    

          
          </header>

          <main className="container mx-auto px-4 py-12">
            <section className="text-center mb-20">
              <h1 className="text-6xl font-bold mb-6 animate-pulse">
                Welcome to Brett Memer
              </h1>
              <p className="text-2xl mb-8">The memeiest coin in the cryptoverse!</p>
              <Link href="/claim">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold text-xl px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                >
                  Claim Your Memecoins Now!
                </Button>
              </Link>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {[
                { icon: <Sparkles className="w-12 h-12 mb-4" />, title: "Much Wow" },
                { icon: <Rocket className="w-12 h-12 mb-4" />, title: "To The Moon" },
                { icon: <TrendingUp className="w-12 h-12 mb-4" />, title: "Stonks Only Go Up" },
                { icon: <DollarSign className="w-12 h-12 mb-4" />, title: "Dank Gains" },
              ].map((item, index) => (
                <div key={index} className="bg-purple-800 bg-opacity-50 p-6 rounded-lg text-center hover:bg-opacity-75 transition duration-300">
                  {item.icon}
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              ))}
            </section>

            <section className="text-center mb-20">
              <h2 className="text-4xl font-bold mb-6">Join the Meme Revolution</h2>
              <p className="text-xl mb-8">Do not let your memes be dreams. Invest in Brett Memer today!</p>
              <div className="max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="mb-4 bg-purple-100 text-purple-900 placeholder-purple-700"
                />
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 text-lg">
                  Get Early Access
                </Button>
              </div>
            </section>
          </main>

          <footer className="bg-purple-900 py-6 text-center">
            <p>&copy; 2024 Brett Memer. All rights reserved. Much copyright. Very legal.</p>
          </footer>

          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogContent className="bg-purple-800 text-white">
              <DialogHeader>
                <DialogTitle>Login / Register</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input type="email" placeholder="Email" className="bg-purple-700 text-white placeholder-purple-300" />
                <Input type="password" placeholder="Password" className="bg-purple-700 text-white placeholder-purple-300" />
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold">
                  Submit
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )
    }