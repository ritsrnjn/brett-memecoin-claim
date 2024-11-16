'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function ClaimPage() {
  const [secretKey, setSecretKey] = useState('')
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimSuccess, setClaimSuccess] = useState(false)

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsClaiming(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsClaiming(false)
    setClaimSuccess(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">Claim Your Brett Memer Coins</h1>
        <p className="text-xl">Enter your secret key to claim your dank meme riches!</p>
      </motion.div>

      <motion.form
        onSubmit={handleClaim}
        className="w-full max-w-md bg-purple-800 bg-opacity-50 p-8 rounded-lg shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Enter your secret key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full bg-purple-700 text-white placeholder-purple-300 border-purple-500"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-purple-900 font-bold text-lg py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          disabled={isClaiming || claimSuccess}
        >
          {isClaiming ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : claimSuccess ? (
            <CheckCircle2 className="mr-2 h-5 w-5" />
          ) : null}
          {isClaiming ? 'Claiming...' : claimSuccess ? 'Claimed Successfully!' : 'Claim Your Memecoins'}
        </Button>
      </motion.form>

      {claimSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
          <p className="text-xl">You have successfully claimed your Brett Memer coins. To the moon! 🚀🌕</p>
        </motion.div>
      )}
    </div>
  )
}