import Link from "next/link";
import { Lock, HardDrive, FileText, Search, Shield, Coins } from "lucide-react";

const services = [
  {
    icon: Lock,
    title: "Wallet Password Recovery",
    description:
      "Forgot your crypto wallet password? Our experts use advanced decryption methods and modern recovery technologies to help you regain secure access to your wallet.",
    gradient: "from-blue-500/10 to-purple-500/10",
    iconColor: "text-blue-400",
    keywords: "crypto wallet password recovery, bitcoin password recovery, ethereum wallet unlock"
  },
  {
    icon: HardDrive,
    title: "Access Recovery for Unsupported Wallets",
    description:
      "Is your old or unsupported crypto wallet no longer functioning? Don't worry—our specialists can help restore access to a wide range of legacy and discontinued wallets.",
    gradient: "from-purple-500/10 to-pink-500/10",
    iconColor: "text-purple-400",
    keywords: "legacy wallet recovery, discontinued wallet access, old crypto wallet"
  },
  {
    icon: FileText,
    title: "Seed Phrase Reconstruction",
    description:
      "Missing or incomplete seed phrase? If most of your recovery phrase is available, our team may be able to reconstruct the missing words and help restore your wallet access.",
    gradient: "from-pink-500/10 to-orange-500/10",
    iconColor: "text-pink-400",
    keywords: "seed phrase recovery, recovery phrase reconstruction, mnemonic phrase restore"
  },
  {
    icon: Search,
    title: "Crypto Scam Investigation & Tracing",
    description:
      "We provide professional scam tracing services to help track fraudulent transactions and gather evidence that may assist in identifying the scammer. Please note, this is an investigative service, not direct fund recovery.",
    gradient: "from-orange-500/10 to-red-500/10",
    iconColor: "text-orange-400",
    keywords: "crypto scam investigation, blockchain tracing, cryptocurrency fraud recovery"
  },
  {
    icon: Shield,
    title: "Hardware Wallet Recovery",
    description:
      "Lost access to your Ledger, Trezor, or other hardware wallet? Our team specializes in recovering assets from damaged or inaccessible hardware devices.",
    gradient: "from-green-500/10 to-teal-500/10",
    iconColor: "text-green-400",
    keywords: "ledger recovery, trezor wallet recovery, hardware wallet unlock"
  },
  {
    icon: Coins,
    title: "Exchange & DeFi Recovery",
    description:
      "Stuck funds on exchanges or DeFi platforms? We help recover assets locked in smart contracts, failed transactions, or exchange-related issues.",
    gradient: "from-teal-500/10 to-blue-500/10",
    iconColor: "text-teal-400",
    keywords: "DeFi recovery, exchange fund recovery, smart contract recovery"
  },
];

const Services = () => {
  return (
    <section 
      className="relative bg-gradient-to-b from-black via-zinc-900 to-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="services-heading"
    >
      
      {/* Background decoration - decorative only, hidden from screen readers */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" aria-hidden="true" />
      
      {/* Gradient orb - decorative only */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <header className="text-center mb-10 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-3 sm:mb-4">
            <span className="text-xs sm:text-sm text-white/80">What We Offer</span>
          </div>
          
          <h1 
            id="services-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-zinc-100 to-white bg-clip-text text-transparent">
              Our Cryptocurrency
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Recovery Solutions
            </span>
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto px-4">
            Professional recovery services backed by years of experience and cutting-edge technology. 
            We help recover lost Bitcoin, Ethereum, and over 100 cryptocurrencies.
          </p>
        </header>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="group relative rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5 sm:p-6 md:p-8 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Gradient background on hover - decorative */}
                <div 
                  className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  aria-hidden="true"
                />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 sm:mb-5 md:mb-6">
                    <div 
                      className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors"
                      aria-hidden="true"
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${service.iconColor}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 
                    className="text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 md:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all"
                    itemProp="name"
                  >
                    {service.title}
                  </h2>

                  {/* Description */}
                  <p 
                    className="text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-3 sm:mb-4"
                    itemProp="description"
                  >
                    {service.description}
                  </p>

                  {/* Hidden keywords for SEO */}
                  <meta itemProp="keywords" content={service.keywords} />

                  {/* Arrow indicator */}
                  <div className="mt-3 sm:mt-4 md:mt-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-white/40 group-hover:text-white/80 transition-colors">
                    <span>Learn more</span>
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA section */}
        <aside className="mt-10 sm:mt-12 md:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-5 sm:p-6 md:p-8 backdrop-blur-sm max-w-4xl">
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
                Don't see your specific issue?
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-white/60">
                Contact us for a free consultation. We handle unique recovery cases daily.
              </p>
            </div>
            <Link 
              href="/contact"
              className="whitespace-nowrap px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
              aria-label="Get a free consultation for crypto wallet recovery"
            >
              Get Free Consultation
            </Link>
          </div>
        </aside>

      </div>
    </section>
  );
};

export default Services;