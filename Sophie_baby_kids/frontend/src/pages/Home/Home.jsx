import React from 'react'

import Navbar from "../../components/Navbar/Navbar"
import HeroSection from '../../components/HeroSection/HeroSection'
import PromotionBanner from '../../components/PromotionBanner/PromotionBanner'
import CategorySection from '../../components/CategorySection/CategorySection'
import ProductsSection from '../../components/ProductsSection/ProductsSection'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <PromotionBanner />
      <CategorySection />
      <ProductsSection />
      <Footer />
    </>
  )
}

export default Home
