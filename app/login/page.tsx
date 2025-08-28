import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="neubrutalist-text text-5xl leading-tight">Ledger</h1>
            <div className="w-full h-1 bg-primary mt-2"></div>
          </div>
          <p className="font-mono font-bold text-card-foreground leading-relaxed max-w-sm mx-auto">
            Your thoughts, organized beautifully
          </p>
        </div>

        {/* Clean login form container */}
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
