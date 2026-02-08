"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, HelpCircle, MessageCircle, Mail } from "lucide-react";

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What types of cryptocurrency wallets can you recover?",
        answer:
          "We specialize in recovering all major cryptocurrency wallets including hardware wallets (Ledger, Trezor), software wallets (Exodus, Electrum, MetaMask), mobile wallets (Trust Wallet, Coinbase Wallet), desktop wallets, and exchange wallets. We support Bitcoin, Ethereum, and over 100+ cryptocurrencies including all major altcoins and tokens.",
      },
      {
        question: "How long does the recovery process take?",
        answer:
          "The recovery timeline varies depending on the complexity of your case. Simple password recoveries can take 3-7 days, while more complex cases involving damaged wallets or incomplete seed phrases may take 7-14 days. We provide a detailed timeline estimate during your free consultation and keep you updated throughout the process.",
      },
      {
        question: "What is your success rate?",
        answer:
          "We maintain an industry-leading 98% success rate across all recovery cases. Our team of certified blockchain specialists and cryptography experts has successfully recovered over $500M in lost cryptocurrency for 10,000+ clients worldwide. During your free consultation, we'll provide an honest assessment of your specific case's recovery probability.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How much does crypto wallet recovery cost?",
        answer:
          "We operate on a no recovery, no fee basis. You pay nothing upfront and only pay if we successfully recover your cryptocurrency. Our fee is a percentage of the recovered amount, typically ranging from 15-25% depending on the complexity of the case. You'll receive transparent pricing during your free consultation with no hidden fees.",
      },
      {
        question: "When do I have to pay for the service?",
        answer:
          "Payment is only required after successful recovery. Once we've recovered your cryptocurrency and securely transferred it to your new wallet, you'll receive an invoice. We accept payment in cryptocurrency or traditional methods (bank transfer, credit card). You pay nothing if we're unable to recover your funds.",
      },
      {
        question: "Are there any upfront costs or consultation fees?",
        answer:
          "No. Our initial consultation and case evaluation are completely free with no obligations. We'll analyze your situation, provide an honest assessment of recovery possibilities, and outline a recovery plan at no cost. You only pay if we successfully recover your cryptocurrency.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    questions: [
      {
        question: "Is the recovery process secure?",
        answer:
          "Absolutely. We use military-grade AES-256 encryption for all data transfers and storage. Our recovery processes occur in secure, isolated environments. We never store your private keys permanently and all sensitive information is deleted after successful recovery. Our infrastructure meets bank-level security standards and we're fully compliant with international data protection regulations.",
      },
      {
        question: "Will you have access to my cryptocurrency?",
        answer:
          "No. We use advanced recovery techniques that don't require us to have control over your funds. Once recovered, we securely transfer the cryptocurrency directly to your new wallet. We operate under strict confidentiality agreements and never retain access to your recovered assets. Your security and privacy are our top priorities.",
      },
      {
        question: "Do you share my information with third parties?",
        answer:
          "Never. We operate under strict Non-Disclosure Agreements (NDAs) and do not share your personal information, wallet details, or recovery case information with any third parties, including government agencies, unless legally required. Your privacy is protected by our confidentiality policies and secure infrastructure.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        question: "Can you recover cryptocurrency from a forgotten password?",
        answer:
          "Yes. Password recovery is one of our most common services. Using advanced decryption methods, custom algorithms, and AI-powered tools, we can often recover wallets with forgotten passwords. Success depends on factors like password complexity and wallet type, but our specialists have recovered thousands of password-protected wallets.",
      },
      {
        question: "What if I only have part of my seed phrase?",
        answer:
          "We can help! If you have most of your 12 or 24-word recovery phrase (typically 8+ words), our seed phrase reconstruction service can often recover the missing words using advanced computational techniques. The more words you have, the higher the success probability. Contact us for a free assessment of your specific situation.",
      },
      {
        question: "Can you recover funds sent to the wrong address?",
        answer:
          "This depends on the specific circumstances. If funds were sent to a wrong address you control, we can help recover access. If sent to someone else's address, recovery isn't possible as blockchain transactions are irreversible. However, we provide investigation services to track transactions and potentially contact recipients in certain cases.",
      },
    ],
  },
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (category: string, index: number) => {
    const key = `${category}-${index}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <section
      className="relative bg-gradient-to-b from-black via-zinc-900 to-black py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
      id="faqs"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      {/* Gradient orbs */}
      <div
        className="absolute top-1/4 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 sm:px-4 sm:py-2 backdrop-blur-sm mb-4 sm:mb-6">
            <HelpCircle
              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">
              Got Questions?
            </span>
          </div>

          <h1
            id="faq-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="text-white">Frequently Asked</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-3xl mx-auto">
            Everything you need to know about our cryptocurrency wallet recovery
            services. Can't find your answer? Contact our support team.
          </p>
        </header>

        {/* FAQ Categories */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              {/* Category header */}
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {category.category}
                </h2>
                <div
                  className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 sm:mt-3"
                  aria-hidden="true"
                />
              </div>

              {/* Questions */}
              <div className="space-y-3 sm:space-y-4">
                {category.questions.map((faq, index) => {
                  const key = `${category.category}-${index}`;
                  const isOpen = openItems[key];

                  return (
                    <article
                      key={index}
                      className="group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition-all"
                      itemProp="mainEntity"
                      itemScope
                      itemType="https://schema.org/Question"
                    >
                      {/* Question button */}
                      <button
                        onClick={() => toggleItem(category.category, index)}
                        className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 md:p-6 text-left hover:bg-white/5 transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${key}`}
                      >
                        <div className="flex-1">
                          <h3
                            className="text-base sm:text-lg md:text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all pr-2"
                            itemProp="name"
                          >
                            {faq.question}
                          </h3>
                        </div>

                        {/* Toggle icon */}
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`
                            w-6 h-6 sm:w-8 sm:h-8 rounded-full 
                            bg-gradient-to-br from-blue-500/20 to-purple-500/20 
                            border border-white/10
                            flex items-center justify-center
                            transition-all duration-300
                            ${isOpen ? "rotate-180" : ""}
                          `}
                          >
                            {isOpen ? (
                              <Minus
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <Plus
                                className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400"
                                aria-hidden="true"
                              />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Answer */}
                      <div
                        id={`faq-answer-${key}`}
                        className={`
                          overflow-hidden transition-all duration-300 ease-in-out
                          ${
                            isOpen
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          }
                        `}
                        itemProp="acceptedAnswer"
                        itemScope
                        itemType="https://schema.org/Answer"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 md:pb-6 pt-0">
                          <div className="border-t border-white/10 pt-4 sm:pt-5 md:pt-6">
                            <p
                              className="text-xs xs:text-sm sm:text-base text-white/60 leading-relaxed"
                              itemProp="text"
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm p-6 sm:p-8 md:p-10">
            {/* Decorative gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
              aria-hidden="true"
            />

            <div className="relative text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 mb-4 sm:mb-6">
                <MessageCircle
                  className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400"
                  aria-hidden="true"
                />
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                Still Have Questions?
              </h2>

              <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Our recovery specialists are available 24/7 to answer your
                questions and provide a free consultation for your specific
                case.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 bg-white text-black font-semibold rounded-lg hover:scale-105 transition-all text-sm sm:text-base"
                  aria-label="Contact our cryptocurrency recovery support team"
                >
                  <MessageCircle
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    aria-hidden="true"
                  />
                  <span>Chat with Support</span>
                </Link>

                <Link
                  href="mailto:support@walletrecover.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-8 sm:py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-all hover:scale-105 backdrop-blur-sm text-sm sm:text-base"
                  aria-label="Email our cryptocurrency recovery support team"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span>Email Us</span>
                </Link>
              </div>

              {/* Quick contact info */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/50">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
                      aria-hidden="true"
                    />
                    <span>Average response time: &lt;2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full bg-blue-400"
                      aria-hidden="true"
                    />
                    <span>Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular searches / Quick links */}
        <div className="mt-12 sm:mt-16">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-white/80 mb-2">
              Popular Topics
            </h3>
            <p className="text-xs sm:text-sm text-white/50">
              Quick links to commonly searched topics
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              "Bitcoin Recovery",
              "Ledger Wallet",
              "Seed Phrase Help",
              "MetaMask Recovery",
              "Scam Investigation",
              "Password Recovery",
            ].map((topic, index) => (
              <Link
                key={index}
                href={`/services/${topic.toLowerCase().replace(/\s+/g, "-")}`}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white/70 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
