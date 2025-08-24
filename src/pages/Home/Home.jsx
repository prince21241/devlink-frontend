import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  SearchIcon,
  UsersIcon,
  CommentIcon,
  BellIcon,
  GlobeNetworkIcon,
  LightbulbIcon,
  BookIcon,
  RocketIcon,
  CodeIcon,
  StarIcon,
  CheckIcon,
} from "../../components/Icons/Icons";

export default function Home() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Page background (blue theme) */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
        {/* Soft animated blobs (blue-only) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply blur-xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply blur-xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300 rounded-full mix-blend-multiply blur-xl opacity-30 animate-pulse delay-500" />
        </div>

        {/* Navigation */}
        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600 text-white text-2xl md:text-3xl font-bold shadow-sm hover:bg-blue-700 transition-colors"
          >
            <CodeIcon className="w-6 h-6 text-white" />
            <span>DevLink</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </a>
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
            >
              Login
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div
            className={`flex flex-col lg:flex-row items-center justify-between transition-all duration-1000 ease-out ${
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Left copy */}
            <div className="lg:w-1/2 text-center lg:text-left space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="text-blue-700 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text drop-shadow-lg">
                    Connect.
                  </span>
                  <br />
                  <span className="text-blue-700 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text">
                    Code.
                  </span>
                  <br />
                  <span className="text-blue-700 bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text">
                    Collaborate.
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-grey-600 leading-relaxed max-w-2xl">
                  Join the most vibrant developer community. Share knowledge,
                  build connections, and accelerate your career.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/register">
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-white" />
                    <span>Sign Up Today</span>
                  </button>
                </Link>

                <Link to="/login">
                  <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold text-lg rounded-2xl border border-gray-200 hover:bg-white hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>

            {/* Right visual */}
            <div className="lg:w-1/2 mt-16 lg:mt-0 relative">
              <div className="relative">
                {/* Card */}
                <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
                  <div className="space-y-6">
                    {/* Mock header (fixed) */}
                    <div className="flex items-center space-x-3 pb-4 border-b border-white/20">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full flex items-center justify-center shadow-lg">
                        <CodeIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="ml-auto flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full" />
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <div className="w-3 h-3 bg-green-400 rounded-full" />
                      </div>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-4">
                      <FeatureCard
                        icon={<SearchIcon className="w-7 h-7" />}
                        title="Smart Search"
                        description="Find developers and projects instantly"
                      />
                      <FeatureCard
                        icon={<CommentIcon className="w-7 h-7" />}
                        title="Real-time Chat"
                        description="Connect and collaborate seamlessly"
                      />
                      <FeatureCard
                        icon={<BellIcon className="w-7 h-7" />}
                        title="Smart Notifications"
                        description="Stay updated on what matters"
                      />
                    </div>
                  </div>
                </div>

                {/* Floating bits (blue-only) */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl rotate-12 opacity-80 animate-bounce delay-300 flex items-center justify-center">
                  <RocketIcon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full opacity-80 animate-pulse flex items-center justify-center">
                  <UsersIcon className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-1/2 -right-10 w-16 h-16 bg-gradient-to-r from-blue-400 to-sky-400 rounded-lg rotate-45 opacity-80 animate-ping flex items-center justify-center">
                  <div className="-rotate-45">
                    <BellIcon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute top-1/4 -left-8 w-14 h-14 bg-gradient-to-r from-cyan-400 to-sky-500 rounded-full opacity-70 animate-bounce delay-700 flex items-center justify-center">
                  <SearchIcon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section id="features" className="relative z-10 py-20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose DevLink?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to build meaningful connections in the developer community
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureSection
                icon={<GlobeNetworkIcon className="w-8 h-8" />}
                title="Global Network"
                description="Connect with developers from around the world and expand your professional network."
              />
              <FeatureSection
                icon={<LightbulbIcon className="w-8 h-8" />}
                title="Smart Discovery"
                description="Find the right people and projects with our intelligent search and recommendation system."
              />
              <FeatureSection
                icon={<BookIcon className="w-8 h-8" />}
                title="Knowledge Sharing"
                description="Share your expertise, learn from others, and grow together as a community."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center px-6 relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full opacity-20 animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-16 h-16 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-lg rotate-45 opacity-20 animate-bounce" />

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-sky-600 rounded-full mb-6">
                <RocketIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to join the community?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Start building meaningful connections with developers worldwide. Create your account and begin networking today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/register">
                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2">
                    <UsersIcon className="w-5 h-5 text-white" />
                    <span>Sign Up Today</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                </Link>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span>Free forever</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckIcon className="w-4 h-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About */}
      <section id="about" className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-8 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow text-white">
              <CodeIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">
                DevLink is a community-driven developer network platform, proudly created by <span className="font-semibold">Prince Raval</span>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Components ---------- */

function FeatureCard({ icon, title, description }) {
  const bgStyle = {
    backgroundImage: "linear-gradient(135deg, #2563EB, #06B6D4)", // blue → cyan
  };
  return (
    <div className="flex items-center space-x-3 p-4 bg-white/30 backdrop-blur-sm rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 shadow-sm hover:shadow-md">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300"
        style={bgStyle}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-bold text-gray-900 text-sm">{title}</div>
        <div className="text-xs text-gray-700">{description}</div>
      </div>
    </div>
  );
}

function FeatureSection({ icon, title, description }) {
  const bgStyle = {
    backgroundImage: "linear-gradient(135deg, #2563EB, #38BDF8)", // blue → sky
  };
  return (
    <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/50 hover:border-white/80 transition-all duration-300 hover:scale-105">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300"
        style={bgStyle}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
