import Link from "next/link"
import Image from "next/image"
import { Calendar, User, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">Schedulr</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-teal-600">
              About
            </Link>
            <Link href="#" className="text-sm font-medium text-gray-600 transition-colors hover:text-teal-600">
              Contact
            </Link>
            <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50" asChild>
              <Link href="/auth">Login</Link>
            </Button>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Medical background"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="relative z-10 container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-24 text-center">
            <div className="max-w-3xl mx-auto bg-white/90 p-8 md:p-12 rounded-xl shadow-lg">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-teal-700 mb-4">
                Book Smarter, Live Healthier
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                Schedule appointments with top healthcare providers in your area. No more waiting on hold or filling out
                the same forms repeatedly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg" asChild>
                  <Link href="/auth">
                    <User className="mr-2 h-5 w-5" />
                    I'm a Patient
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="/auth/side-by-side">
                    <UserCog className="mr-2 h-5 w-5" />
                    I'm a Doctor
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-sky-50 to-white py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-4">Why Choose MediSchedule?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform makes healthcare appointment scheduling simple and efficient for both patients and
                providers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">Save Time</h3>
                <p className="text-gray-600">
                  Book appointments in minutes, not hours. No more waiting on hold or filling out repetitive paperwork.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Your health information is protected with enterprise-grade security and encryption.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-600"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">Find the Right Doctor</h3>
                <p className="text-gray-600">
                  Browse verified reviews and credentials to find the perfect healthcare provider for your needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-teal-800 text-white py-12">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-6 w-6" />
                <span className="text-xl font-bold">Schedulr</span>
              </div>
              <p className="text-teal-100">Making healthcare accessible and convenient for everyone.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-teal-100 hover:text-white">
                    HIPAA Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-teal-700 mt-8 pt-8 text-center text-teal-100">
            <p>&copy; {new Date().getFullYear()} Schedulr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
