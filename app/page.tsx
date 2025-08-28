"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Shield, Zap, Loader2, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/30">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground animate-pulse">Loading Ledger...</p>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-primary/20 rotate-1"></div>
            <div className="relative bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 px-6 py-3 rounded-md font-mono font-bold text-sm -rotate-0.5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-card-foreground">Your digital workspace awaits</span>
                <Sparkles className="h-4 w-4 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>
          </div>

          <h1 className="font-mono font-bold text-balance text-4xl md:text-5xl lg:text-6xl mb-8 text-center mt-4"
              style={{ textShadow: '1.5px 1.5px 0px currentColor' }}>
            <span className="text-primary">
              Ledger
            </span>
            <span className="text-card-foreground/90 ml-4">
               – Your Ultimate Notes Manager
            </span>
          </h1>

          <p className="font-mono font-bold text-lg lg:text-xl text-card-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-200 transform rotate-[-0.5deg]">
            Transform the way you capture, organize, and access your thoughts. A beautiful, secure, and lightning-fast
            notes application designed for modern productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <Button asChild size="lg" variant="brutalist" className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 gap-2 sm:gap-3 w-full sm:w-auto">
              <Link href="/signup" className="block text-center">
                Get Started Free
                <ArrowRight className="h-4 w-4 sm:h-6 sm:w-6" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base sm:text-lg px-6 sm:px-10 py-3 sm:py-4 border-current border-4 bg-card font-mono font-bold tracking-wide w-full sm:w-auto"
            >
              <Link href="/login" className="block text-center">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-10 lg:gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: FileText,
              title: "Organize Everything",
              description:
                "Keep all your thoughts, ideas, and important information organized in one place with smart categories, powerful search, and intuitive tagging.",
              delay: "delay-500",
              rotation: "-1deg",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description:
                "Your notes are protected with industry-standard encryption and security. Your thoughts remain private and accessible only to you.",
              delay: "delay-700",
              rotation: "0.5deg",
            },
            {
              icon: Zap,
              title: "Fast & Responsive",
              description:
                "Lightning-fast performance across all devices. Access your notes instantly, anywhere, anytime with our responsive and intuitive design.",
              delay: "delay-900",
              rotation: "-0.75deg",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className={`animate-in fade-in slide-in-from-bottom duration-700 ${feature.delay}`}
              style={{ transform: `rotate(${feature.rotation})` }}
            >
              <Card className="text-center group hover:transform hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_currentColor] hover:rotate-0 transition-all duration-300 border-current">
                <CardHeader className="pb-6 pt-8">
                  <feature.icon className="h-14 w-14 text-card-foreground mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300" />
                  <CardTitle className="text-xl font-mono font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <CardDescription className="text-base leading-relaxed font-mono font-bold text-card-foreground/80">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 lg:mt-28" style={{ transform: "rotate(-0.25deg)" }}>
          <div className="neubrutalist-border neubrutalist-shadow px-16 py-20 max-w-2xl mx-auto relative" style={{ transform: "rotate(0.5deg)" }}>
            <div className="absolute -inset-1 bg-accent opacity-10 rounded-sm"></div>
            <div className="relative z-10">
              <h2 className="neubrutalist-text text-3xl lg:text-4xl mb-8 text-balance">Ready to organize your thoughts?</h2>
              <p className="font-mono font-bold text-card-foreground mb-10 text-balance text-lg">
                Join thousands of users who have transformed their productivity with Ledger.
              </p>
              <Button asChild size="lg" variant="brutalist" className="gap-2 sm:gap-4 px-8 sm:px-16 py-3 sm:py-5 text-lg sm:text-xl shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)] sm:shadow-[10px_10px_0px_0px_hsl(var(--primary)/0.4)] hover:shadow-[3px_3px_0px_0px_hsl(var(--primary)/0.4)] sm:hover:shadow-[6px_6px_0px_0px_hsl(var(--primary)/0.4)] w-full sm:w-auto">
                <Link href="/signup" className="block text-center">
                  Start Your Journey
                  <ArrowRight className="h-5 w-5 sm:h-7 sm:w-7" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

