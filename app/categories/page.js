import CategoryList from '@/src/components/category page/CategoryList'
import FeaturedCategories from '@/src/components/category page/FeaturedCategory'
import Footer from '@/src/components/homepage/Footer'
import Header from '@/src/components/homepage/Header'
import React from 'react'

const page = () => {
  return (
    <div>
      <Header/>
      <FeaturedCategories/>
      <CategoryList/>
      <Footer/>
    </div>
  )
}

export default page