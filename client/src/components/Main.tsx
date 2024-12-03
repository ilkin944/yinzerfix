import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Hero from './Hero'
import About from './About'
import CTA1 from './CTA1'
import Projects from './Projects'
import Services from './Services'
import Testimonials from './Testimonials'
import WhyUS from './WhyUS'
import Brands from './Brands'
import InfoSection from './InfoSection'
import Satisfaction from './Satisfaction'
import Process from './Process'
import Contact from './Contact'

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <WhyUS />
        <Services />
        <CTA1 />
        <Brands />
        <InfoSection />
        <Satisfaction />
        <Projects />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
