import { Linkedin, Globe, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="w-full bg-gray-900 border-t border-gray-800 mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm">
            Created by <span className="text-white font-semibold">Ibrahim Nasir</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/ibrahimnasir0/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">LinkedIn</span>
            </a>

            <a
              href="https://ibrahimnasir.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
              aria-label="Personal Website"
            >
              <Globe className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Website</span>
            </a>

            <a
              href="https://github.com/ibrahimnasir0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
