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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in fade-in slide-in-from-top duration-500">
            <Sparkles className="h-4 w-4" />
            Your digital workspace awaits
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            Ledger – Your Ultimate Notes Manager
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-200">
            Transform the way you capture, organize, and access your thoughts. A beautiful, secure, and lightning-fast
            notes application designed for modern productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            <Button asChild size="lg" className="text-lg px-8 h-12 gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 h-12 bg-background/50 backdrop-blur-sm border-border/50 hover:bg-background"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: FileText,
              title: "Organize Everything",
              description:
                "Keep all your thoughts, ideas, and important information organized in one place with smart categories, powerful search, and intuitive tagging.",
              delay: "delay-500",
            },
            {
              icon: Shield,
              title: "Secure & Private",
              description:
                "Your notes are protected with industry-standard encryption and security. Your thoughts remain private and accessible only to you.",
              delay: "delay-700",
            },
            {
              icon: Zap,
              title: "Fast & Responsive",
              description:
                "Lightning-fast performance across all devices. Access your notes instantly, anywhere, anytime with our responsive and intuitive design.",
              delay: "delay-900",
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className={`text-center group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/50 backdrop-blur-sm animate-in fade-in slide-in-from-bottom duration-700 ${feature.delay}`}
            >
              <CardHeader className="pb-4">
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 lg:mt-24 animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 lg:p-12 max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-balance">Ready to organize your thoughts?</h2>
            <p className="text-muted-foreground mb-6 text-balance">
              Join thousands of users who have transformed their productivity with Ledger.
            </p>
            <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/signup">
                Start Your Journey
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
