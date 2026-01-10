import React from 'react'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-[#fdfcf9] text-[#214534] px-8 md:px-32 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">

          <div className="space-y-6 max-w-md geist-modify">
            <h2 className="font-extrabold text-[#4D2FB2] text-4xl">KrizPay</h2>
            <p className="text-sm text-[#214534]">
              KrizPay is transforming crypto transactions in India by enabling seamless
              crypto-to-INR merchant payments using UPI.
            </p>

            <div className="space-y-6 geist-modify text-lg">
              {[
                {
                  title: "Crypto Payments",
                  desc:
                    "Pay merchants directly using cryptocurrency by scanning their UPI QR code.",
                },
                {
                  title: "Secure Escrow",
                  desc:
                    "Our proprietary escrow system ensures secure transfer between customers and liquidity providers.",
                },
                {
                  title: "Instant Settlement",
                  desc:
                    "Real-time settlements eliminate delays common with traditional crypto conversions.",
                },
                {
                  title: "AML & KYC",
                  desc:
                    "Built-in AML monitoring and KYC verification ensure compliance and transparency.",
                },
                {
                  title: "Tax Transparency",
                  desc:
                    "Accurate profit tracking to simplify crypto taxation under Indian regulations.",
                },
              ].map((item, i) => (
                <div key={i}>
                  <h4 className="font-bold text-[#4D2FB2]">
                    KrizPay{" "}
                    <span className="font-normal text-[#9e9e9e]">
                      {item.title}
                    </span>
                  </h4>
                  <p className="text-gray-700 mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 geist-modify">
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="flex flex-col gap-2 text-lg text-[#214534]">
              {[
                "How KrizPay Works",
                "Crypto to INR Payments",
                "Merchant Onboarding",
                "Crypto Taxation in India",
                "AML & KYC Framework",
                "Security Architecture",
                "Pricing & Fees",
                "Developer APIs",
                "FAQs",
              ].map((item, index) => (
                <li key={index} className="link-hover cursor-pointer w-fit">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 geist-modify">
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="flex flex-col gap-2 text-lg text-[#214534]">
              {[
                "About KrizPay",
                "Founding Team",
                "Careers",
                "Media & Press",
                "Partnerships",
                "Investor Relations",
                "Contact",
              ].map((item, index) => (
                <li key={index} className="link-hover cursor-pointer w-fit">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </footer>

      <div className="bg-[#fdfcf9] geist-modify text-[#1e1e1e] px-8 md:px-32 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 text-sm">

            <h4 className="text-xl font-semibold -mt-6">Contact Us</h4>
            <div className="text-base">
              <ul className="flex flex-col gap-2">
                <li className="cursor-pointer link-hover w-fit mb-4">hello@krizpay.com</li>
                <li className="cursor-pointer link-hover w-fit mb-4">support@krizpay.com</li>
                <li className="cursor-pointer link-hover w-fit mb-4">FAQs</li>
                <li className="cursor-pointer link-hover w-fit mb-4">Documentation</li>
              </ul>
            </div>

            <h4 className="text-xl font-semibold">Legal</h4>
            <div className="-mt-2 text-base">
              <ul className="flex flex-col gap-2">
                <li className="cursor-pointer link-hover w-fit mb-4">Privacy Policy</li>
                <li className="cursor-pointer link-hover w-fit mb-4">Terms of Use</li>
                <li className="cursor-pointer link-hover w-fit mb-4">AML & KYC Policy</li>
                <li className="cursor-pointer link-hover w-fit mb-4">Regulatory Disclosures</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#fdfcf9] px-8 md:px-32 pt-10 pb-16 text-[#1e1e1e] text-sm">
        <div className="flex gap-6 geist-modify mb-6">
          <FacebookIcon className="w-7 h-7 cursor-pointer hover:text-[#4D2FB2] transition" />
          <InstagramIcon className="w-7 h-7 cursor-pointer hover:text-[#4D2FB2] transition" />
          <LinkedinIcon className="w-7 h-7 cursor-pointer hover:text-[#4D2FB2] transition" />
        </div>

        <div className="space-y-6 leading-[22px] geist-modify max-w-5xl text-[#414240]">
          <p>
            KrizPay enables cryptocurrency-based merchant payments in India by converting
            crypto assets into INR via verified liquidity providers. Transactions are secured
            through escrow, AML checks, and KYC verification.
          </p>

          <p>
            Cryptocurrency transactions in India are subject to a 30% tax on gains and 1% TDS
            as per prevailing regulations. KrizPay provides transparent profit tracking to
            assist users in tax compliance.
          </p>

          <p>
            KrizPay does not act as a bank or financial institution. All transactions are
            subject to regulatory compliance and availability of liquidity providers.
          </p>
        </div>
      </div>

      <hr className="mx-auto w-full max-w-6xl border-t border-[#d3d3d3]" />

      <div className="bg-[#fdfcf9] px-6 md:px-32 py-12 text-sm text-[#414240] leading-relaxed geist-modify">
        <div className="max-w-7xl mx-auto leading-[22px] space-y-6">

          <p>
            © 2025 KrizPay Technologies Pvt. Ltd. All rights reserved.
          </p>

          <p>
            KrizPay provides a technology platform facilitating crypto-to-INR transactions
            through third-party liquidity providers. Services may not be available in all
            regions and are subject to regulatory approval.
          </p>

          <p>
            Any unauthorized use of KrizPay intellectual property, including trademarks,
            logos, and proprietary technology, is strictly prohibited.
          </p>

          <p>
            © Siddhant Bhagat
          </p>

        </div>
      </div>
    </div>
  )
}

export default Footer
