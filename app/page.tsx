import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Skillset from '@/components/Skillset'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import About from '@/components/About'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Skillset />
      <Experience />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}


