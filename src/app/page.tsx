import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experince";
import { Footer } from "@/components/Footer";
import { GFGActivity } from "@/components/GeeksForGeeks";
import { GitHubActivity } from "@/components/GithubActivity";
import { Hero } from "@/components/Hero";
import { LeetCodeActivity } from "@/components/LeetCodeActivity";
import { Navigation } from "@/components/Navigation";
import { NpmPackage } from "@/components/Packages";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      {/* <NpmPackage /> */}
      {/* <Blog /> */}
      {/* <LeetCodeActivity /> */}
      {/* <GFGActivity /> */}
      {/* <GitHubActivity /> */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </div>
  )
}