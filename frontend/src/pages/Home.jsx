import React from 'react'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Skill from '../Components/Skill'
import Project from '../Components/Project'
import Contact from '../Components/Contact'
import ScrollReveal from '../Components/ScrollReveal.jsx'

export default function Home() {
  return (
    <>
      <ScrollReveal>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>

      <ScrollReveal>
        <Skill />
      </ScrollReveal>

      <ScrollReveal>
        <Project />
      </ScrollReveal>

      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </>
  )
}
