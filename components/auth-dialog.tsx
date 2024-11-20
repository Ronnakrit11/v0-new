"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AuthDialogProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
}

export function AuthDialog({ isOpen, onClose, mode }: AuthDialogProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the authentication logic
    console.log("Form submitted:", { email, password, name })
    // Reset form
    setEmail("")
    setPassword("")
    setName("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-black/90 text-white border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-200">
                Name
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/50 border-gray-700 text-white"
                placeholder="Enter your name"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-black/50 border-gray-700 text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-black/50 border-gray-700 text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
            {mode === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}