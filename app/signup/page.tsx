import { SignupForm } from "@/components/auth/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Subtle background geometric shapes */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-32 left-16 w-28 h-28 border-3 border-accent rounded-sm transform rotate-12"></div>
        <div className="absolute bottom-32 right-16 w-20 h-20 border-4 border-card-foreground transform rotate-45"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 border-2 border-primary"></div>
      </div>

      <div className="w-full max-w-md relative z-10" style={{ transform: "rotate(0.25deg)" }}>
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h1 className="neubrutalist-text text-5xl leading-tight">Ledger</h1>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-8 h-1 bg-primary transform -rotate-1"></div>
              <div className="w-4 h-1 bg-accent transform rotate-2"></div>
              <div className="w-6 h-1 bg-card-foreground"></div>
            </div>
          </div>
          <p className="font-mono font-bold text-card-foreground leading-relaxed max-w-sm mx-auto">
            Create your account and organize your thoughts
          </p>
        </div>

        {/* Enhanced signup form container */}
        <div className="relative">
          <div className="absolute -inset-3 bg-accent opacity-8 transform rotate-1 rounded-sm"></div>
          <div className="relative bg-card border-4 border-accent p-1 rounded-sm">
            <div className="bg-card p-6 rounded-sm">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
