import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Notes Manager</h1>
          <p className="text-muted-foreground">Your thoughts, organized beautifully</p>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
