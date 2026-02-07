const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black overflow-hidden">
      
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-screen text-center py-20">
        
        {/* Badge */}
        <div className="mb-6 md:mb-8 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 sm:px-3 md:px-4 md:py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] xs:text-xs sm:text-sm text-white/80 whitespace-nowrap">
            Trusted by 10,000+ clients worldwide
          </span>
        </div>

        {/* Main heading */}
        <h1 className="max-w-4xl font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 md:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-zinc-100 to-white bg-clip-text text-transparent">
            Industry-Leading
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Crypto Wallet Recovery
          </span>
          <br />
          <span className="text-white/90 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Since 2019</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-white/60 mb-8 md:mb-10 px-4">
          Expert recovery services for Bitcoin, Ethereum, and 100+ cryptocurrencies. 
          We've successfully recovered over $500M in lost digital assets.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-10 md:mb-12 w-full sm:w-auto px-4 sm:px-0">
          <button className="group relative px-6 py-3 md:px-8 md:py-4 bg-white text-black font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 text-sm md:text-base">
            <span className="relative z-10">Start Recovery Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
          
          <button className="px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm md:text-base">
            View Success Stories
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-8 text-white/50 text-xs sm:text-sm mb-12 md:mb-0">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No Recovery, No Fee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>100% Confidential</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>24/7 Support</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl px-4">
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              $500M+
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-2">Recovered</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              10,000+
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-2">Clients Helped</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              98%
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-2">Success Rate</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              5 Years
            </div>
            <div className="text-xs sm:text-sm text-white/50 mt-2">Experience</div>
          </div>
        </div>

      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </div>
  );
};

export default Hero;