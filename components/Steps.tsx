import React from "react";
import Link from "next/link";
import { 
  FileText, 
  Search, 
  Cpu, 
  Shield, 
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Clock
} from "lucide-react";

type ColorType = "blue" | "purple" | "pink" | "green" | "cyan";

const steps: Array<{
  number: string;
  icon: any;
  title: string;
  description: string;
  timeframe: string;
  color: ColorType;
}> = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Initial Consultation",
    description: "Wondering what happens after you reach out? We start with a completely free, no-obligation consultation where our specialists assess your unique situation. Share your wallet details, access issues, and recovery needs—we'll provide an honest evaluation and clear roadmap for recovery.",
    timeframe: "Same Day",
    color: "blue",
  },
  {
    number: "02",
    icon: FileText,
    title: "Agreement & Planning",
    description: "Once you're comfortable moving forward, we'll create a tailored recovery strategy and establish a transparent service agreement. You'll know exactly what to expect: timeline, process steps, success probability, and our success-based fee structure. No hidden costs, no surprises.",
    timeframe: "24 Hours",
    color: "purple",
  },
  {
    number: "03",
    icon: Cpu,
    title: "Recovery Execution",
    description: "Our expert team begins the technical recovery process using advanced tools and proven methodologies. We gather all necessary information, deploy custom algorithms, and work tirelessly to restore your access. Throughout this phase, you'll receive regular progress updates and our team remains available for any questions.",
    timeframe: "3-14 Days",
    color: "pink",
  },
  {
    number: "04",
    icon: Shield,
    title: "Secure Access Restoration",
    description: "Once we successfully regain access to your wallet, we perform comprehensive verification of all assets. Everything is double-checked for accuracy and security before proceeding to the final step. Your crypto never leaves a secure environment during this process.",
    timeframe: "1-2 Hours",
    color: "green",
  },
  {
    number: "05",
    icon: CheckCircle2,
    title: "Asset Transfer & Support",
    description: "We securely transfer your recovered cryptocurrency back to you in a newly secured wallet. You'll receive complete documentation, security recommendations, and best practices to protect your assets going forward. Our team remains available for any follow-up assistance you may need.",
    timeframe: "Immediate",
    color: "cyan",
  },
];

const HowItWorks = () => {
  return (
    <section 
      className="relative bg-gradient-to-b from-zinc-900 via-black to-zinc-900 py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="how-it-works-heading"
      itemScope
      itemType="https://schema.org/HowTo"
    >
      
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.1),transparent_50%)]" aria-hidden="true" />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" aria-hidden="true" />
        <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" aria-hidden="true" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <header className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" aria-hidden="true" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Simple & Secure Process</span>
          </div>
          
          <h1 
            id="how-it-works-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            itemProp="name"
          >
            <span className="text-white">
              Your Path to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Crypto Recovery Success
            </span>
          </h1>
          
          <p 
            className="text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mx-auto px-4"
            itemProp="description"
          >
            Wondering what happens after you reach out for our help? Here's a detailed look at our proven 5-step recovery process 
            that has helped 10,000+ clients reclaim over $500M in lost cryptocurrency.
          </p>

          {/* Hidden schema metadata */}
          <meta itemProp="totalTime" content="P14D" />
          <meta itemProp="tool" content="Advanced AI recovery software, Custom algorithms, Blockchain analysis tools" />
          <meta itemProp="estimatedCost" content="No upfront cost - Success-based fee only" />
        </header>

        {/* Steps - Vertical flow with connecting line */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Connecting line */}
          <div 
            className="absolute left-6 sm:left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;
              
              const colorClasses: Record<ColorType, string> = {
                blue: "from-blue-500 to-blue-600",
                purple: "from-purple-500 to-purple-600",
                pink: "from-pink-500 to-pink-600",
                green: "from-green-500 to-green-600",
                cyan: "from-cyan-500 to-cyan-600",
              };

              return (
                <article
                  key={index}
                  className="relative flex gap-4 sm:gap-6 md:gap-8 group"
                  itemProp="step"
                  itemScope
                  itemType="https://schema.org/HowToStep"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  
                  {/* Step number circle */}
                  <div className="relative flex-shrink-0 z-10">
                    <div className={`
                      w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24
                      rounded-full bg-gradient-to-br ${colorClasses[step.color]}
                      flex items-center justify-center shadow-2xl
                      group-hover:scale-110 transition-transform duration-300
                      border-4 border-black
                    `}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-10 md:h-10 text-white" aria-hidden="true" />
                    </div>
                    
                    {/* Step number badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 bg-black border-2 border-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xs sm:text-sm font-bold text-white/80">{step.number}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8 sm:pb-12 md:pb-16">
                    <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-sm group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-purple-500/10 transition-all">
                      
                      {/* Timeframe badge */}
                      <div className="inline-flex items-center gap-1.5 mb-3 sm:mb-4">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/40" aria-hidden="true" />
                        <span className="text-[10px] xs:text-xs sm:text-sm text-white/40 font-medium">
                          {step.timeframe}
                        </span>
                      </div>

                      <h2 
                        className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all"
                        itemProp="name"
                      >
                        {step.title}
                      </h2>

                      <p 
                        className="text-xs xs:text-sm sm:text-base md:text-lg text-white/60 leading-relaxed mb-4 sm:mb-6"
                        itemProp="text"
                      >
                        {step.description}
                      </p>

                      {/* Arrow to next step */}
                      {!isLast && (
                        <div className="flex items-center gap-2 text-white/40">
                          <span className="text-xs sm:text-sm">Next step</span>
                          <ArrowRight className="w-4 h-4 animate-pulse" aria-hidden="true" />
                        </div>
                      )}

                      {/* Final CTA */}
                      {isLast && (
                        <div className="mt-4 sm:mt-6">
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all text-xs sm:text-sm md:text-base"
                            aria-label="Start your free consultation for crypto wallet recovery"
                          >
                            <span>Get Started Now</span>
                            <ArrowRight className="w-4 h-4" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Trust section */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-sm">
            
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                Still Have Questions?
              </h2>
              <p className="text-sm sm:text-base text-white/60">
                Our recovery specialists are here to help you understand the process
              </p>
            </div>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">100% Secure</h3>
                <p className="text-xs sm:text-sm text-white/50">Bank-level encryption</p>
              </div>

              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">No Risk</h3>
                <p className="text-xs sm:text-sm text-white/50">Pay only on success</p>
              </div>

              <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" aria-hidden="true" />
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-white mb-1">Fast Process</h3>
                <p className="text-xs sm:text-sm text-white/50">Average 3-14 days</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/contact"
                className="px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base text-center"
                aria-label="Start your free cryptocurrency recovery consultation"
              >
                Start Free Consultation
              </Link>
              <Link
                href="/faqs"
                className="px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base text-center"
                aria-label="Read frequently asked questions about crypto recovery"
              >
                View FAQs
              </Link>
            </div>

          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-grid grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                98%
              </div>
              <div className="text-xs sm:text-sm text-white/50">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                3-14
              </div>
              <div className="text-xs sm:text-sm text-white/50">Days Average</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                $500M+
              </div>
              <div className="text-xs sm:text-sm text-white/50">Recovered</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;