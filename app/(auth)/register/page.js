"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/schema/auth-schemas"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Brain, Users, Target, TrendingUp } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import Cookies from "js-cookie"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      const {data: resData} = await axios.post("/api/auth/register", data)

      // Save token
      Cookies.set("accessToken", resData.accessToken, {
        expires: 1, // 1 day
        secure: true,
        sameSite: "strict",
      });

      toast.success("Account created successfully!", {
        description: "Welcome to InsightsAI. You can now start using our platform.",
      })
      
      router.push("/dashboard")

    } catch (error) {
      if (error.response?.data?.errors) {
        // Handle validation errors from API
        const fieldErrors = error.response.data.errors
        Object.keys(fieldErrors).forEach((field) => {
          setError(field, { type: "server", message: fieldErrors[field] })
        })
      }

      toast.error("Registration failed", {
        description: error.response?.data?.error || "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex max-w-screen-xl mx-auto">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 via-purple-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-100/50" />

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-40 right-32 w-8 h-8 bg-purple-400/30 rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-16 w-12 h-12 bg-cyan-400/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-6 h-6 bg-primary/30 rounded-full animate-bounce" />

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <div className="text-center mb-8">
            <div className="relative mb-6">
              {/* Central brain icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Brain className="w-12 h-12 text-white" />
              </div>

              {/* Orbiting feature icons */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center animate-pulse">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center animate-pulse">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join the Future of Interviews</h2>
            <p className="text-lg text-gray-600 max-w-md">
              Create your account and unlock AI-powered insights to transform your interview experience.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">InsightsAI</span>
            </div>
          </div>

          <Card className="border-0 shadow-none">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">Create Account</CardTitle>
              <CardDescription className="text-gray-600">
                Join InterviewAI and start improving your interviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-11"
                    {...register("name")}
                  />
                  {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="h-11"
                    {...register("email")}
                  />
                  {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>

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
                      {showPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="h-11 pr-10"
                      {...register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 cursor-pointer" /> : <Eye className="w-4 h-4 cursor-pointer" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </div>

                <Button type="submit" disabled={isLoading} className="w-full h-11 bg-primary hover:bg-primary/90">
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}