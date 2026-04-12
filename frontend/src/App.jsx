import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import SushirajHero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'
import Services from './components/Services'
import Products from './components/Products'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'


function App() {

  return (
   <>
   <SushirajHero/>
   <About/>
   <Services/>
   <Products/>
   <Testimonials/>
   <Contact/>
   <Footer/>
   </>
  )
}

export default App
