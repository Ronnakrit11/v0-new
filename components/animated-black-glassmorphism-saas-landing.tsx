"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, CheckCircle2, Globe, Zap, Shield, BarChart3, Users, Laptop, Headphones, Menu, X } from "lucide-react"
import { AuthDialog } from "@/components/auth-dialog"

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerChildrenVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          controls.start("visible")
        }
      },
      { threshold: 0.1 }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [controls, isVisible])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function AnimatedBlackGlassmorphismSaasLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signup")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleAuthClick = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setAuthDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 overflow-hidden">
      <AuthDialog 
        isOpen={authDialogOpen} 
        onClose={() => setAuthDialogOpen(false)} 
        mode={authMode} 
      />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">GlassSaaS</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => handleAuthClick("signin")}
            >
              Sign In
            </Button>
            <Button 
              className="bg-white text-black hover:bg-gray-200"
              onClick={() => handleAuthClick("signup")}
            >
              Sign Up
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <nav className="flex flex-col space-y-4 p-4 bg-black/50 backdrop-blur-md">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors" onClick={toggleMenu}>Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors" onClick={toggleMenu}>Pricing</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors" onClick={toggleMenu}>Contact</a>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/10 w-full"
                onClick={() => {
                  handleAuthClick("signin")
                  toggleMenu()
                }}
              >
                Sign In
              </Button>
              <Button 
                className="bg-white text-black hover:bg-gray-200 w-full"
                onClick={() => {
                  handleAuthClick("signup")
                  toggleMenu()
                }}
              >
                Sign Up
              </Button>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <AnimatedSection className="py-20 text-center relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-black/30 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-800 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
              <h1 className="text-5xl font-bold text-white mb-6 relative z-10">Transform Your Workflow with GlassSaaS</h1>
              <p className="text-xl text-gray-300 mb-8 relative z-10">Streamline your business processes with our cutting-edge SaaS solution</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
                <Button 
                  className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-3"
                  onClick={() => handleAuthClick("signup")}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Features Section */}
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Key Features</h2>
            <motion.div className="grid md:grid-cols-3 gap-12" variants={staggerChildrenVariants}>
              {[
                { icon: <Globe className="h-10 w-12 mb-1" />, title: "Global Access", description: "Access your data from anywhere in the world" },
                { icon: <Zap className="h-10 w-12 mb-1" />, title: "Lightning Fast", description: "Optimized for speed and efficiency" },
                { icon: <Shield className="h-10 w-12 mb-1" />, title: "Secure & Reliable", description: "Bank-grade security with 99.99% uptime" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-md bg-black/20 rounded-xl p-8 text-white text-center border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex justify-center items-center mb-6">
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Rest of the sections remain unchanged */}
        {/* Pricing Section */}
        <AnimatedSection className="py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Simple Pricing</h2>
            <motion.div className="grid md:grid-cols-3 gap-12" variants={staggerChildrenVariants}>
              {[
                { plan: "Basic", price: "$9", features: ["1 User", "10 Projects", "5GB Storage", "Basic Support"] },
                { plan: "Pro", price: "$29", features: ["5 Users", "50 Projects", "100GB Storage", "Priority Support"] },
                { plan: "Enterprise", price: "$99", features: ["Unlimited Users", "Unlimited Projects", "1TB Storage", "24/7 Support"] },
              ].map((tier, index) => (
                <motion.div
                  key={index}
                  className="backdrop-blur-md bg-black/30 rounded-xl p-8 text-white text-center border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-lg"
                  variants={fadeInUpVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-2xl font-semibold mb-4">{tier.plan}</h3>
                  <p className="text-5xl font-bold mb-6">{tier.price}<span className="text-xl font-normal">/mo</span></p>
                  <ul className="mb-8 space-y-4">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-400" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="bg-white text-black hover:bg-gray-200 w-full text-lg py-3"
                    onClick={() => handleAuthClick("signup")}
                  >
                    Choose Plan
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Bento Grid Section */}
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose GlassSaaS?</h2>
            <motion.div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" variants={staggerChildrenVariants}>
              <motion.div className="backdrop-blur-md bg-black/30 rounded-xl p-8 text-white border border-gray-800 col-span-1 sm:col-span-2 lg:col-span-2 h-auto sm:h-80" variants={fadeInUpVariants} whileHover={{ scale: 1.02 }}>
                <BarChart3 className="h-16 w-16 mb-6 text-blue-400" />
                <h3 className="text-2xl font-semibold mb-4">Advanced Analytics</h3>
                <p className="text-gray-300">Gain deep insights into your business performance with our powerful analytics tools. Visualize trends, track KPIs, and make data-driven decisions to propel your business forward.</p>
              </motion.div>
              <motion.div className="backdrop-blur-md bg-black/30 rounded-xl p-8 text-white border border-gray-800 col-span-1 h-auto sm:h-80" variants={fadeInUpVariants} whileHover={{ scale: 1.02 }}>
                <Users className="h-16 w-16 mb-6 text-green-400" />
                <h3 className="text-2xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-gray-300">Seamlessly work together with your team members in real-time. Share documents, assign tasks, and communicate effortlessly within our intuitive platform.</p>
              </motion.div>
              <motion.div className="backdrop-blur-md bg-black/30 rounded-xl p-8 text-white border border-gray-800 col-span-1 h-auto sm:h-80" variants={fadeInUpVariants} whileHover={{ scale: 1.02 }}>
                <Laptop className="h-16 w-16 mb-6 text-yellow-400" />
                <h3 className="text-2xl font-semibold mb-4">Cross-Platform</h3>
                <p className="text-gray-300">Access your work from any device, anywhere, anytime. Our responsive design ensures a seamless experience across desktop, tablet, and mobile devices.</p>
              </motion.div>
              <motion.div className="backdrop-blur-md bg-black/30 rounded-xl p-8 text-white border border-gray-800 col-span-1 sm:col-span-2 lg:col-span-2 h-auto sm:h-80" variants={fadeInUpVariants} whileHover={{ scale: 1.02 }}>
                <Headphones className="h-16 w-16 mb-6 text-purple-400" />
                <h3 className="text-2xl font-semibold mb-4">24/7 Customer Support</h3>
                <p className="text-gray-300">Our dedicated support team is always ready to assist you with any questions or issues. Enjoy peace of mind knowing that expert help is just a click away, day or night.</p>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection className="py-20 bg-black/20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="backdrop-blur-xl bg-black/30 rounded-xl p-12 shadow-lg max-w-4xl mx-auto text-center border border-gray-800 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-gradient-x"></div>
              <h2 className="text-4xl font-bold text-white mb-6 relative z-10">Ready to Get Started?</h2>
              <p className="text-xl text-gray-300 mb-10 relative z-10">Join thousands of satisfied customers and transform your business today</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 relative z-10">
                <Input type="email" placeholder="Enter your email" className="max-w-xs bg-black/50 text-white placeholder-gray-400 border-gray-700 text-lg py-6" />
                <Button 
                  className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-6"
                  onClick={() => handleAuthClick("signup")}
                >
                  Sign Up <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="py-12 text-center text-gray-400 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <p className="mb-4">&copy; 2024 GlassSaaS. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}