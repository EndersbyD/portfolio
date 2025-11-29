"use client";

import { useState, useEffect } from "react";
import {
  EnvelopeIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ArrowDownIcon,
  LinkIcon,
  ArrowTopRightOnSquareIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navItems: Array<{ id: string; label: string; href?: string }> = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "admin", label: "Admin", href: "/admin" },
  ];

  const skills = [
    { name: "TypeScript", level: 95 },
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
    { name: "Node.js", level: 90 },
    { name: "Python", level: 85 },
    { name: "AWS", level: 85 },
    { name: "Docker", level: 80 },
    { name: "Kubernetes", level: 75 },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Scalable e-commerce solution built with Next.js, TypeScript, and Stripe integration. Features real-time inventory management and analytics dashboard.",
      tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      link: "#",
      github: "#",
    },
    {
      title: "Cloud Infrastructure Manager",
      description: "DevOps tool for managing multi-cloud infrastructure with automated deployment pipelines and monitoring capabilities.",
      tech: ["Python", "AWS", "Docker", "Kubernetes"],
      link: "#",
      github: "#",
    },
    {
      title: "Real-time Collaboration App",
      description: "Web-based collaboration platform with real-time editing, video conferencing, and project management features.",
      tech: ["React", "WebSocket", "Node.js", "MongoDB"],
      link: "#",
      github: "#",
    },
  ];

  const experience = [
    {
      company: "Tech Corp",
      role: "Senior Software Engineer",
      period: "2021 - Present",
      description: [
        "Led development of microservices architecture serving 1M+ users",
        "Mentored team of 5 junior developers and established coding standards",
        "Reduced system latency by 40% through performance optimization",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
      ],
    },
    {
      company: "StartupXYZ",
      role: "Full Stack Developer",
      period: "2019 - 2021",
      description: [
        "Built scalable web applications using React and Node.js",
        "Designed and implemented RESTful APIs handling 100K+ requests/day",
        "Collaborated with cross-functional teams in agile environment",
      ],
    },
    {
      company: "DevCompany",
      role: "Software Engineer",
      period: "2017 - 2019",
      description: [
        "Developed responsive web applications using modern JavaScript frameworks",
        "Participated in code reviews and maintained high code quality standards",
        "Contributed to open-source projects and internal tooling",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Portfolio
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      className="text-sm font-medium transition-colors text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-slate-600 dark:text-slate-300"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => {
                if (item.href) {
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
              Senior Software
              <br />
              <span className="text-blue-600 dark:text-blue-400">Engineer</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Building scalable solutions and leading teams to deliver exceptional software
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <EnvelopeIcon className="h-5 w-5" />
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                View Projects
                <ArrowDownIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-12 flex justify-center gap-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="GitHub"
              >
                <CodeBracketIcon className="h-5 w-5" />
                <span>GitHub</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="LinkedIn"
              >
                <BriefcaseIcon className="h-5 w-5" />
                <span>LinkedIn</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">About Me</h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              I'm a Senior Software Engineer with over 7 years of experience building scalable web
              applications and leading development teams. I specialize in modern JavaScript
              frameworks, cloud infrastructure, and creating solutions that solve real-world
              problems.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              My passion lies in writing clean, maintainable code and architecting systems that can
              scale. I enjoy mentoring junior developers and contributing to open-source projects
              that make a difference.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <CodeBracketIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Clean Code
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Writing maintainable and scalable code
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <BriefcaseIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Leadership
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Leading teams and mentoring developers
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-lg shadow-md">
                <AcademicCapIcon className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Learning
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  Continuously learning new technologies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-300">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-blue-600 dark:bg-blue-400 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <LinkIcon className="h-5 w-5" />
                      Live Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                    >
                      <CodeBracketIcon className="h-5 w-5" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Work Experience
            </h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8 relative pl-12 border-l-4 border-blue-600 dark:border-blue-400"
              >
                <div className="absolute left-0 top-8 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full -ml-2"></div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {exp.role}
                </h3>
                <p className="text-lg text-blue-600 dark:text-blue-400 mb-2">{exp.company}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-slate-600 dark:text-slate-300 flex items-start gap-2"
                    >
                      <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <EnvelopeIcon className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-300">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
