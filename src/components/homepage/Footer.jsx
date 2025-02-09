import React from 'react';
import Link from 'next/link';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">RawMat</h3>
            <p className="text-gray-400 mb-6">
              Bangladesh's leading B2B platform for raw materials trading, connecting suppliers and buyers nationwide.
            </p>
            <div className="flex space-x-4">
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social) => (
                <Link
                  key={social}
                  href={`https://${social}.com`}
                  className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
                >
                  <span className="sr-only">{social}</span>
                  {/* Replace this with your actual social icons:
                      For example, using react-icons:
                      {social === 'facebook' && <FiFacebook />}
                  */}
                   {/* Example of icon usage - replace FiFacebook with correct icons */}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-white transition">Careers</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-4">
              <li><Link href="/sourcing" className="text-gray-400 hover:text-white transition">Sourcing Solutions</Link></li>
              <li><Link href="/logistics" className="text-gray-400 hover:text-white transition">Logistics Services</Link></li>
              <li><Link href="/financial" className="text-gray-400 hover:text-white transition">Financial Services</Link></li>
              <li><Link href="/inspection" className="text-gray-400 hover:text-white transition">Inspection Services</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center">
                <FiMapPin className="mr-2" />
                123 Business District, Dhaka, Bangladesh
              </li>
              <li className="flex items-center">
                <FiPhone className="mr-2" />
                +880 1234-567890
              </li>
              <li className="flex items-center">
                <FiMail className="mr-2" />
                info@rawmat.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 RawMat. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;