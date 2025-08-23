import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Mic, Users, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground font-space-grotesk">InterviewAI</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/register">
                <Button variant="outline">Get Started</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-space-grotesk">
              Smarter Interview Insights, <span className="text-primary">Powered by AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your interview experience with AI-powered feedback that helps candidates improve and recruiters
              discover better insights.
            </p>
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="relative mt-16">
            <div className="bg-gradient-to-br from-card to-muted rounded-2xl p-8 border border-border">
              <div className="flex items-center justify-center space-x-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Record Interview</span>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Brain className="h-8 w-8 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground">AI Analysis</span>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-secondary" />
                  </div>
                  <span className="text-sm text-muted-foreground">Get Insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space-grotesk">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're preparing for interviews or evaluating candidates, our AI provides actionable insights.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* For Interviewees */}
            <Card className="p-8 border-2 hover:border-primary/20 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold text-card-foreground font-space-grotesk">For Candidates</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Get detailed feedback on your interview performance with actionable tips for improvement.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Identify what went well in your responses</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Discover areas for improvement</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Receive actionable tips and strategies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Track your progress over time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* For Recruiters */}
            <Card className="p-8 border-2 hover:border-accent/20 transition-colors">
              <CardContent className="p-0">
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="h-8 w-8 text-accent" />
                  <h3 className="text-2xl font-bold text-card-foreground font-space-grotesk">For Recruiters</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Uncover deeper insights about candidates and improve your interview process.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Uncover missed evaluation areas</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Discover better interview questions</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Get objective candidate assessments</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">Improve hiring decision accuracy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-space-grotesk">How It Works</h2>
          <p className="text-xl text-muted-foreground mb-16">
            Simple, powerful, and secure. Get insights in three easy steps.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-space-grotesk">Upload Recording</h3>
              <p className="text-muted-foreground">
                Upload your interview recording in webm or m4a format. Your data is secure and private.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-space-grotesk">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes speech patterns, content quality, and communication effectiveness.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-secondary">3</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4 font-space-grotesk">Get Insights</h3>
              <p className="text-muted-foreground">
                Receive detailed feedback, actionable recommendations, and personalized improvement tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space-grotesk">
            Ready to Transform Your Interviews?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of candidates and recruiters who are already using AI to improve their interview experience.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold text-foreground font-space-grotesk">InterviewAI</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link href="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                Register
              </Link>
              <span className="text-muted-foreground text-sm">© 2024 InterviewAI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}