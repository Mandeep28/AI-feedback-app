import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain } from "lucide-react"
import Link from "next/link"

export function AuthCard({ title, description, children, footerText, footerLink, footerLinkText }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-card p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground font-space-grotesk">InterviewAI</span>
          </Link>
        </div>

        {/* Auth Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold font-space-grotesk">{title}</CardTitle>
            {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-6">
            {children}

            {/* Footer Link */}
            {footerText && footerLink && footerLinkText && (
              <div className="text-center text-sm text-muted-foreground">
                {footerText}{" "}
                <Link href={footerLink} className="text-primary hover:underline font-medium">
                  {footerLinkText}
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
