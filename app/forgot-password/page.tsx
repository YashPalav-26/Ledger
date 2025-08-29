import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container max-w-md mx-auto">
        <Card className="neubrutalist-shadow">
          <CardHeader className="space-y-4 text-center pt-12 pb-8">
            <div className="flex justify-center mb-4">
              <Mail className="h-16 w-16 text-primary" />
            </div>
            <CardTitle className="text-3xl font-mono font-bold tracking-tight">Reset Password</CardTitle>
            <CardDescription className="font-mono font-bold text-card-foreground/80">
              Password reset functionality coming soon
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground font-mono">
              For now, please contact your administrator or try to remember your password.
            </p>
            <Button asChild variant="brutalist" size="lg" className="gap-2 w-full">
              <Link href="/login">
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}