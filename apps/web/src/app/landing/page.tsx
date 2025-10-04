'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Calculator,
  Bot,
  Download,
  CheckCircle,
  ArrowRight,
  Star,
  Play,
  Zap,
  FileSpreadsheet,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Sparkles,
  Target,
  BarChart3,
  Lightbulb,
  Award,
  Quote,
  ChevronRight,
  Rocket,
  Globe,
  DollarSign,
  Building,
  Trophy,
  Coffee,
  MessageSquare,
  Eye,
  Briefcase
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-100">
      {/* Header/Navigation */}
      <header className="relative z-10 px-6 lg:px-8">
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center">
            <a href="/">
              <img src="https://i.ibb.co/rGRcj2kN/logo.png" alt="Social Garden SOW Workbench" className="h-12 w-auto" />
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-slate-700 hover:text-emerald-600 transition-colors font-medium">
              Features
            </a>
            <a href="/workbench" className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 px-6 py-2.5 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all font-semibold">
              Launch Workbench
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            <Badge className="mb-8 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
              <Zap className="mr-1 h-3 w-3" />
              AI-Powered SOW Generator
            </Badge>

            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              The Ferrari of
              <span className="block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Proposal Generation
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-700">
              Transform your proposal process from <strong className="text-slate-900">40+ hours to 15 minutes</strong>. 
              Create professional SOWs with AI assistance, intelligent pricing, and client-ready exports.
              <span className="block mt-2 text-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                95% time reduction • $14K saved per SOW
              </span>
            </p>

            {/* Impressive Stats */}
            <div className="mx-auto mt-8 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">1,900</div>
                  <div className="text-sm text-slate-600 mt-1 font-medium">Hours Saved Annually</div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">$710K</div>
                  <div className="text-sm text-slate-600 mt-1 font-medium">Cost Reduction Per Year</div>
                </div>
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-emerald-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">$2M+</div>
                  <div className="text-sm text-slate-600 mt-1 font-medium">Additional Revenue Potential</div>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center justify-center gap-x-6">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold shadow-2xl hover:shadow-emerald-500/50 transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 rounded-xl">
                <Rocket className="mr-2 h-5 w-5" />
                Launch SOW Workbench <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-10 py-6 border-2 border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 font-semibold transition-all duration-300 rounded-xl">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Professional Indicators */}
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-slate-600 font-medium">
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-emerald-500 text-emerald-500" />
                <span>The way SOWs should be written</span>
              </div>
              <div className="text-emerald-500">•</div>
              <div>🚀 Get organized, get paid</div>
              <div className="text-emerald-500">•</div>
              <div>🎯 One place for everything</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-6 lg:px-8 py-24 lg:py-32 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
              How SOW Workbench Works
            </h2>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Create New SOWs Effortlessly */}
            <Card>
              <CardContent className="p-8">
                <CheckCircle className="h-12 w-12 text-slate-900 dark:text-slate-100 mb-4" />
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Create New SOWs Effortlessly
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Start a Statement of Work by entering just the essentials: project title, client name, and a quick overview. Add one or more scopes—each scope can have its own deliverables, assumptions, and detailed notes, so you stay organized from the start.
                </p>
              </CardContent>
            </Card>

            {/* AI-Powered Assistance */}
            <Card>
              <CardContent className="p-8">
                <Bot className="h-12 w-12 text-slate-900 dark:text-slate-100 mb-4" />
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  AI-Powered Assistance
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  An integrated AI assistant reviews your notes and builds the backbone of your document for you:
                </p>
                <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></span>
                    Suggests deliverables
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></span>
                    Points out assumptions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></span>
                    Spots missing details
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3 flex-shrink-0"></span>
                    Fills in basic pricing so there's less back and forth
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Export-Ready Documents */}
            <Card>
              <CardContent className="p-8">
                <Download className="h-12 w-12 text-slate-900 dark:text-slate-100 mb-4" />
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Export-Ready Documents
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Download your work in PDF or Excel format, ready to share internally or externally. The outputs are structured for finance, project management, or technical review—no reformatting needed.
                </p>
              </CardContent>
            </Card>

            {/* All-in-One Workspace */}
            <Card>
              <CardContent className="p-8">
                <FileText className="h-12 w-12 text-slate-900 dark:text-slate-100 mb-4" />
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  All-in-One Workspace
                </h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                  <li className="flex items-start">
                    <span className="text-slate-900 dark:text-slate-100 mr-3 flex-shrink-0">✓</span>
                    Keep all projects in one place
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-900 dark:text-slate-100 mr-3 flex-shrink-0">✓</span>
                    See every version by date
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-900 dark:text-slate-100 mr-3 flex-shrink-0">✓</span>
                    Jump back into unfinished SOWs without losing details
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Transparent Collaboration */}
            <Card>
              <CardContent className="p-8">
                <Calculator className="h-12 w-12 text-slate-900 dark:text-slate-100 mb-4" />
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Transparent Collaboration
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Need input? Use the chat to clarify requirements or fix scope gaps with your team.
                </p>
              </CardContent>
            </Card>

            {/* Try It Now Card */}
            <Card className="bg-slate-900 dark:bg-slate-950 border-slate-900 text-white">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Get Organized, Get Paid
                </h3>
                <p className="text-gray-300 mb-6">
                  Stop wrestling with complicated project proposals.
                  Create professional Statements of Work that actually work.
                </p>
                <Button size="lg" className="w-full bg-white text-slate-900 hover:bg-gray-100">
                  Try SOW Workbench Free
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32" style={{ backgroundColor: '#0e2e33' }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              See how agencies and consultants are transforming their proposal process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "SOW Workbench cut our proposal creation time from 2 days to 2 hours. The AI suggestions are spot-on and the PDF exports look incredibly professional.",
                author: "Sarah Chen",
                role: "Project Director",
                company: "Digital Solutions Co",
                avatar: "👩‍💼"
              },
              {
                quote: "Finally, a tool that understands how we actually work. The transparent pricing calculations and role-based estimates have eliminated so much back-and-forth with clients.",
                author: "Marcus Rodriguez",
                role: "Consulting Partner",
                company: "Strategy First",
                avatar: "👨‍💻"
              },
              {
                quote: "The Ferrari comparison is accurate. This isn't just faster - it's smarter. The AI catches scope gaps we used to miss, saving us from expensive change orders later.",
                author: "Emily Watson",
                role: "Agency Owner",
                company: "Creative Labs",
                avatar: "👩‍🎨"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur border-white/20 text-white">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 mb-4" style={{ color: '#20e28f' }} />
                  <p className="text-gray-200 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.author}</div>
                      <div className="text-sm text-gray-300">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Solutions Section */}
      <section className="relative px-6 lg:px-8 py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50 to-green-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight sm:text-5xl lg:text-6xl">
              Australian <span className="text-green-600">Business Solutions</span>
            </h2>
            <p className="mt-6 text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Social Garden specializes in <strong>performance marketing</strong> for Australia's high-value B2B and B2C markets.
              We understand the unique needs of property developers, universities, and e-commerce enterprises.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Badge className="px-4 py-2 bg-white text-slate-700 border-slate-300 shadow-sm">
                📈 Data-Driven Results
              </Badge>
              <Badge className="px-4 py-2 bg-white text-slate-700 border-slate-300 shadow-sm">
                🚀 Innovative Solutions
              </Badge>
              <Badge className="px-4 py-2 bg-white text-slate-700 border-slate-300 shadow-sm">
                💡 Australian Proficiency
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Performance Marketing Solutions */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileSpreadsheet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Performance Marketing Solutions</h3>
                  <p className="text-slate-600">Tailored strategies that deliver measurable results</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Property Development Marketing",
                    description: "Lead generation and customer acquisition for Australia's property development sector. From new homes to commercial builds.",
                    icon: "🏘️"
                  },
                  {
                    title: "University & Student Recruitment",
                    description: "Performance marketing that drives enrolments across universities, colleges, and education providers nationwide.",
                    icon: "🎓"
                  },
                  {
                    title: "E-commerce Conversion Optimization",
                    description: "Customer acquisition and conversion funnel optimization for digital-first businesses and online retailers.",
                    icon: "🛒"
                  },
                  {
                    title: "Enterprise Customer Acquisition",
                    description: "B2B marketing automation and lead generation for complex enterprise sales processes.",
                    icon: "🏢"
                  }
                ].map((item, index) => (
                  <div key={index} className="group relative">
                    <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center text-xl shadow-sm">
                            {item.icon}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{item.description}</p>
                          </div>
                          <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Australian Market Expertise */}
            <div className="space-y-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Australian Market Expertise</h3>
                  <p className="text-slate-600">Deep industry knowledge meets cutting-edge technology</p>
                </div>
              </div>

              {/* Expertise Card */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-white overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Why Choose Social Garden</h4>
                    <p className="text-slate-600">The perfect blend of experience, innovation, and results</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {[
                      'Australian market specialists with 10+ years experience',
                      'Specialised expertise in property, education, and e-commerce',
                      'ROI-focused performance marketing approach',
                      'Enterprise-grade tools and professional documentation',
                      'Cross-industry best practices and proven strategies'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                      ✨ Specialist focus on Australia and New Zealand markets with deep industry knowledge
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Ready to Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Growth</span>?
              </h3>
              <p className="text-lg text-slate-600 mb-8">
                Join leading Australian businesses achieving their marketing goals with our proven performance strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Marketing Journey
                </Button>
                <Button variant="outline" size="lg" className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold px-8 py-4">
                  <FileText className="w-5 h-5 mr-2" />
                  View Our Work
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                  Free consultation
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  ROI guarantee
                </span>
                <span className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full"></span>
                  Australian-first approach
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 lg:px-8 py-12 bg-[#0e2e33] text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/footer-logo.png" alt="Social Garden" className="h-8 w-auto" />
            </div>
            <div className="text-sm text-slate-400">
              © 2025 Social Garden - Australian Property, Education & E-commerce Marketing Specialists
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
