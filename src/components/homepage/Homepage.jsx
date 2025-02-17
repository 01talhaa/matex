"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiTruck,
  FiShield,
  FiCheckCircle,
  FiBarChart,
  FiBriefcase,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

// Import required styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "./Header";
import Footer from "./Footer";
import HeroSection from "./HeroSection";
import FeaturedCategories from "../category page/FeaturedCategory";
import FeaturedSuppliers from "../supplier page/FeaturedSuppliers";
import MarketInsights from "./MarketInsights";
import TopSuppliers from "./TopSuppliers";
import RecentTransactions from "./Transactions";

// recent transaction
const recentTransactions = [
  {
    id: 1,
    material: "Industrial Steel Sheets",
    quantity: "25 tons",
    price: "৳1,125,000",
    buyer: "ABC Manufacturing Ltd",
    seller: "Steel Corp BD",
    status: "Completed",
    date: "2 hours ago",
    verificationLevel: "Gold",
    location: "Chittagong",
  },
  {
    id: 2,
    material: "Raw Cotton",
    quantity: "15 tons",
    price: "৳875,000",
    buyer: "Textile Industries Co.",
    seller: "Cotton Suppliers Ltd",
    status: "In Transit",
    date: "5 hours ago",
    verificationLevel: "Platinum",
    location: "Dhaka",
  },
  {
    id: 3,
    material: "Plastic Granules",
    quantity: "10 tons",
    price: "৳450,000",
    buyer: "PlastiCraft BD",
    seller: "Polymer Solutions",
    status: "Processing",
    date: "8 hours ago",
    verificationLevel: "Silver",
    location: "Narayanganj",
  },
];

const categories = [
  {
    id: 1,
    name: "Metals",
    icon: "🏗️",
    count: 150,
    trending: true,
    subCategories: ["Steel", "Aluminum", "Copper", "Iron"],
  },
  // Add more categories with enhanced details
];

const stats = {
  suppliers: 1500,
  products: 25000,
  buyers: 10000,
  deliveries: 50000,
};

const insights = [
  {
    title: "Steel Price Analysis",
    description: "Weekly report on steel price trends in Bangladesh",
    date: "Updated 2 hours ago",
    change: "+2.5%",
    positive: true,
  },
  {
    title: "Cotton Market Report",
    description: "Monthly cotton market overview and forecasts",
    date: "Updated 1 day ago",
    change: "-1.2%",
    positive: false,
  },
  {
    title: "Plastic Industry Outlook",
    description: "Quarterly analysis of the plastic manufacturing sector",
    date: "Updated 3 days ago",
    change: "+3.8%",
    positive: true,
  },
];

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for navbar transformation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />

      {/* Enhanced Hero Section */}
      <HeroSection stats={stats} />

      {/* Featured Materials with Enhanced Card Design */}
      {/* <FeaturedMaterials/> */}
      <FeaturedCategories />

      {/* suppliers */}
      <FeaturedSuppliers />

      {/* Enhanced How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Simple steps to transform your procurement process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: FiSearch,
                title: "Find Materials",
                description:
                  "Browse through our vast catalog of verified suppliers and materials",
              },
              {
                icon: FiShield,
                title: "Secure Payments",
                description:
                  "Pay securely through our trusted payment gateway partners",
              },
              {
                icon: FiTruck,
                title: "Safe Delivery",
                description:
                  "Track your order and receive materials through verified logistics partners",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="text-white text-3xl" />
                </div>
                <h3 className="font-semibold text-xl mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center relative overflow-hidden group">
              {category.trending && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Trending
                </span>
              )}
              <span className="text-4xl mb-4 block transform group-hover:scale-110 transition-transform">
                {category.icon}
              </span>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.count} Products</p>
              <div className="space-y-1">
                {category.subCategories.map((sub, index) => (
                  <p key={index} className="text-sm text-gray-500">
                    {sub}
                  </p>
                ))}
              </div>
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Market Insights Section */}
      <MarketInsights insights={insights} />

      {/* Featured Suppliers Section with Carousel */}
      <TopSuppliers />

      {/*renect transaction section*/}

      <section className="py-20 bg-gray-50">
        <RecentTransactions transactions={recentTransactions}/>
      </section>

      {/* Professional Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Professional Features</h2>
            <p className="text-gray-600">
              Advanced tools for serious businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiTrendingUp,
                title: "Price Analytics",
                description:
                  "Advanced analytics with historical price trends, future predictions, and market insights",
                features: [
                  "Historical data analysis",
                  "Price predictions",
                  "Market comparisons",
                ],
              },
              {
                icon: FiAward,
                title: "Supplier Verification",
                description:
                  "Multi-level verification system with detailed supplier credibility scores",
                features: [
                  "Background checks",
                  "Quality certifications",
                  "Performance metrics",
                ],
              },
              {
                icon: FiBriefcase,
                title: "Trade Finance",
                description:
                  "Integrated financial solutions for seamless transactions",
                features: [
                  "Letter of credit",
                  "Bank guarantees",
                  "Invoice financing",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition group">
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <feature.icon className="text-blue-600 text-2xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-xl mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                  Learn More
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose RawMat</h2>
            <p className="text-gray-600">
              Experience the next generation of B2B raw material procurement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FiShield,
                title: "Verified Suppliers",
                description:
                  "All suppliers undergo strict verification process",
              },
              {
                icon: FiBarChart,
                title: "Market Intelligence",
                description: "Real-time pricing data and market trends",
              },
              {
                icon: FiTruck,
                title: "Logistics Support",
                description: "End-to-end delivery management and tracking",
              },
              {
                icon: FiCheckCircle,
                title: "Quality Assurance",
                description: "Stringent quality control measures",
              },
              {
                icon: FiShield,
                title: "Secure Payments",
                description: "Multiple secure payment options",
              },
              {
                icon: FiBarChart,
                title: "24/7 Support",
                description: "Round-the-clock customer assistance",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <feature.icon className="text-blue-600 text-xl" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Trust Badges */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FiShield, label: "100% Secure Payments" },
              { icon: FiCheckCircle, label: "Verified Suppliers" },
              { icon: FiTruck, label: "Nationwide Delivery" },
              { icon: FiBarChart, label: "Market-Leading Prices" },
            ].map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center text-gray-600">
                <badge.icon className="text-2xl mr-2 text-blue-600" />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
<section className="py-16 sm:py-20 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
  {/* Background Pattern */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute inset-0 bg-repeat bg-[url('/pattern.svg')]"></div>
  </div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Stay Updated with Market Trends
        </h2>
        <p className="text-sm sm:text-base text-blue-100 mb-8 max-w-2xl mx-auto">
          Get weekly insights about raw material prices, market analysis,
          and industry news delivered straight to your inbox
        </p>

        <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
          <div className="flex-1 relative group">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-6 py-3 sm:py-4 rounded-lg text-gray-800 bg-white/95 backdrop-blur-sm 
                       placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 
                       shadow-lg transition-all duration-300 group-hover:shadow-xl"
            />
            <div className="absolute inset-0 bg-blue-200 rounded-lg opacity-0 group-hover:opacity-10 
                          transition-opacity duration-300"></div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 sm:py-4 bg-yellow-400 hover:bg-yellow-300 text-blue-900 
                     rounded-lg font-semibold shadow-lg transition-all duration-300 
                     hover:shadow-xl hover:text-blue-800 flex items-center justify-center 
                     space-x-2 group"
          >
            <span>Subscribe</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-xs sm:text-sm text-blue-100/80"
        >
          🔒 We respect your privacy. Unsubscribe at any time.
        </motion.p>
      </motion.div>
    </div>
  </div>

  {/* Decorative Elements */}
  <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
  <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
</section>


      {/* Enhanced Footer with More Sections */}
      <Footer />
    </div>
  );
}
