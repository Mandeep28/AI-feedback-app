"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField } from "@/components/form-field"
import { LoadingButton } from "@/components/loading-button"
import { loginSchema } from "@/lib/schema/auth-schemas"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, MessageSquare, TrendingUp, Users, EyeOff, Eye } from "lucide-react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, just show success and redirect
      toast({
        title: "Login successful!",
        description: "Welcome back to InterviewAI.",
      })

      // In a real app, you would handle authentication here
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
              <Brain className="h-8 w-8" />
              InterviewAI
            </Link>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your InterviewAI account</p>
          </div>

          {/* Login form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              label="Email Address"
              id="email"
              type="email"
              placeholder="Enter your email"
              error={errors.email}
              register={register("email")}
            />

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="h-11 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <LoadingButton type="submit" loading={isLoading} className="w-full" size="lg">
              Sign In
            </LoadingButton>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => {
                  toast({
                    title: "Password reset",
                    description: "Password reset functionality would be implemented here.",
                  })
                }}
              >
                Forgot your password?
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don&apos;t  have an account?{" "}
                <Link href="/register" className="text-primary hover:underline font-medium">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 via-purple-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-100/50" />

        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-primary/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-32 w-12 h-12 bg-purple-200/50 rounded-full blur-lg animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-cyan-200/30 rounded-full blur-xl animate-pulse delay-500" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
          {/* Central AI brain icon */}
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
              <Brain className="w-16 h-16 text-white" />
            </div>
            {/* Orbiting icons */}
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce delay-300">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="absolute top-1/2 -left-8 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce delay-700">
              <Users className="w-5 h-5 text-cyan-600" />
            </div>
          </div>

          {/* Text content */}
          <h3 className="text-3xl font-bold text-gray-800 mb-4">AI-Powered Interview Insights</h3>
          <p className="text-lg text-gray-600 max-w-md leading-relaxed">
            Transform your interview experience with intelligent feedback, personalized coaching, and data-driven
            insights.
          </p>

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-1 gap-6 max-w-sm">
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-gray-700">Smart AI Analysis</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-sm text-gray-700">Real-time Feedback</span>
            </div>
            <div className="flex items-center gap-3 text-left">
              <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-cyan-600" />
              </div>
              <span className="text-sm text-gray-700">Performance Tracking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
