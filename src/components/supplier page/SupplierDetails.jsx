import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Shield, 
  Package, 
  Clock,
  ChevronDown,
  Star,
  Users,
  CheckCircle,
  Award,
  TrendingUp,
  X
} from 'lucide-react';
import SupplierReviewAndRatings from './SupplierReviewAndRatings';

const StatDetails = ({ stat, onClose }) => {
  const detailsContent = {
    'Years Active': {
      title: 'Company History & Growth',
      content: [
        {
          year: '2024',
          milestone: 'Expanded to international markets',
          description: 'Successfully launched operations in 3 new countries'
        },
        {
          year: '2022',
          milestone: 'Major facility upgrade',
          description: 'Invested in state-of-the-art manufacturing equipment'
        },
        {
          year: '2020',
          milestone: 'Company founding',
          description: 'Started operations with 10 employees'
        }
      ]
    },
    'Total Orders': {
      title: 'Order Statistics',
      content: [
        {
          period: 'Last Month',
          orders: 450,
          growth: '+15%',
          topProducts: ['Product A', 'Product B', 'Product C']
        },
        {
          period: 'Last Quarter',
          orders: 1200,
          growth: '+25%',
          satisfaction: '98%'
        },
        {
          period: 'Year to Date',
          orders: 3600,
          growth: '+30%',
          newClients: 45
        }
      ]
    },
    'Response Time': {
      title: 'Response Time Analytics',
      content: [
        {
          metric: 'Average First Response',
          value: '2 hours',
          target: '< 3 hours',
          achievement: '95%'
        },
        {
          metric: 'Query Resolution',
          value: '24 hours',
          target: '< 48 hours',
          achievement: '92%'
        },
        {
          metric: 'Emergency Response',
          value: '30 minutes',
          target: '< 1 hour',
          achievement: '98%'
        }
      ]
    },
    'Client Base': {
      title: 'Client Demographics',
      content: [
        {
          segment: 'Enterprise',
          percentage: '45%',
          growth: '+20%',
          retention: '95%'
        },
        {
          segment: 'Mid-Market',
          percentage: '35%',
          growth: '+25%',
          retention: '88%'
        },
        {
          segment: 'Small Business',
          percentage: '20%',
          growth: '+30%',
          retention: '82%'
        }
      ]
    }
  };

  const details = detailsContent[stat.label];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <stat.icon className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-800">{details.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {stat.label === 'Years Active' && details.content.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-600 pl-4">
              <div className="flex items-center text-lg font-semibold text-gray-800">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                {item.year} - {item.milestone}
              </div>
              <p className="mt-1 text-gray-600">{item.description}</p>
            </div>
          ))}

          {stat.label === 'Total Orders' && details.content.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-2">{item.period}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-xl font-bold text-gray-800">{item.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Growth</p>
                  <p className="text-xl font-bold text-green-600">{item.growth}</p>
                </div>
                {item.topProducts && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600">Top Products</p>
                    <div className="flex gap-2 mt-1">
                      {item.topProducts.map((product, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {stat.label === 'Response Time' && details.content.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-800">{item.metric}</h3>
                <p className="text-sm text-gray-600">Target: {item.target}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-blue-600">{item.value}</p>
                <p className="text-sm text-green-600">{item.achievement} achieved</p>
              </div>
            </div>
          ))}

          {stat.label === 'Client Base' && details.content.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800">{item.segment}</h3>
                <span className="text-xl font-bold text-blue-600">{item.percentage}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Growth</p>
                  <p className="text-green-600 font-semibold">{item.growth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Retention</p>
                  <p className="text-blue-600 font-semibold">{item.retention}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SupplierDetails = ({ supplier }) => {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedStat, setSelectedStat] = useState(null);
  
  const displayedProducts = showAllProducts ? supplier.products : supplier.products.slice(0, 4);
  
  const stats = [
    { label: 'Years Active', value: supplier.yearsActive || '4 Years', icon: Calendar },
    { label: 'Total Orders', value: supplier.totalOrders || '5,234', icon: Package },
    { label: 'Response Time', value: supplier.responseTime || '< 2 hrs', icon: Clock },
    { label: 'Client Base', value: supplier.clientBase || '250+', icon: Users },
  ];

  const certifications = [
    { name: 'ISO 9001', year: '2023' },
    { name: 'Environmental Safety', year: '2023' },
    { name: 'Quality Assurance', year: '2024' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-4xl font-bold">{supplier.name}</h1>
                {supplier.isVerified && (
                  <span className="flex items-center px-3 py-1 bg-green-500 bg-opacity-20 rounded-full text-sm">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Verified Supplier
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-blue-100">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {supplier.location}
                </span>
                <span className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  {supplier.businessType}
                </span>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex gap-4">
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Contact Supplier
              </button>
              <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-400 transition-colors">
                Request Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStat(stat)}
                    className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  {['overview', 'products', 'certifications'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`py-4 px-2 border-b-2 font-medium ${
                        selectedTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-6">
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">About Us</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {supplier.description || "A leading manufacturer and supplier with over 10 years of experience in providing high-quality products and exceptional service to our clients worldwide."}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">Global Shipping Available</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">Secure Payments</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">Quality Guaranteed</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <TrendingUp className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">Market Leader</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'products' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {displayedProducts.map((product, index) => (
                        <div key={index} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-gray-800">{product}</h3>
                              <p className="text-sm text-gray-600 mt-1">
                                High-quality product with competitive pricing
                              </p>
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    {supplier.products.length > 4 && (
                      <button
                        onClick={() => setShowAllProducts(!showAllProducts)}
                        className="flex items-center justify-center w-full text-blue-600 hover:text-blue-700"
                      >
                        {showAllProducts ? 'Show Less' : 'Show More'}
                        <ChevronDown className={`w-4 h-4 ml-1 transform ${showAllProducts ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                )}

                {selectedTab === 'certifications' && (
                  <div className="space-y-4">
                    {certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <h3 className="font-medium text-gray-800">{cert.name}</h3>
                            <p className="text-sm text-gray-600">Certified {cert.year}</p>
                          </div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          View Certificate
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{supplier.phone || "+1 (555) 123-4567"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{supplier.email || "contact@supplier.com"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{supplier.website || "www.supplier.com"}</span>
                </div>
              </div>
            </div>

            {/* Stats Detail Modal */}
      {selectedStat && (
        <StatDetails 
          stat={selectedStat} 
          onClose={() => setSelectedStat(null)} 
        />
      )}

            {/* Reviews Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Customer Reviews</h3>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">4.8/5</span>
                </div>
              </div>
              <SupplierReviewAndRatings supplierId={supplier.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;