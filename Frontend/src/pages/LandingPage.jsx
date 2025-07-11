import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle, Star, Users, Calendar, Shield, Globe, Sparkles, Play, ChevronDown } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import CTASection from '../components/LandingPage/CTASection';


const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Event Coordinator',
    text: 'EventFlow transformed how we manage our corporate events. The analytics dashboard is incredible!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
  },
  {
    name: 'Chen Wei',
    role: 'Director, StartupFest',
    text: 'The user experience is unmatched. Our team adopted it immediately without any training.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Conference Producer',
    text: 'Managing 1000+ attendees has never been easier. The automation features save us hours of work.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
  },
];

const featureColors = [
  'from-blue-400 to-blue-600',
  'from-pink-400 to-pink-600',
  'from-green-400 to-green-600',
  'from-yellow-400 to-yellow-600',
  'from-purple-400 to-purple-600',
  'from-indigo-400 to-indigo-600',
];

const features = [
  {
    icon: <Calendar />,
    title: 'Smart Event Creation',
    desc: 'Create beautiful events with our intuitive step-by-step interface.'
  },
  {
    icon: <Users />,
    title: 'Attendee Management',
    desc: 'Easily manage registrations, check-ins, and communication.'
  },
  {
    icon: <Shield />,
    title: 'Secure & Reliable',
    desc: 'Enterprise-grade security and 99.9% uptime guarantee.'
  },
  {
    icon: <Globe />,
    title: 'Global Reach',
    desc: 'Host events for audiences in 150+ countries.'
  },
  {
    icon: <Sparkles />,
    title: 'Automation',
    desc: 'Automate repetitive tasks and focus on creating memorable experiences.'
  },
  {
    icon: <Play />,
    title: 'Real-time Updates',
    desc: 'Stay informed with instant notifications and live updates.'
  },
];

const faqs = [
  {
    q: 'How quickly can I set up my first event?',
    a: 'You can create and publish your first event in under 5 minutes.'
  },
  {
    q: 'Is there a limit on the number of attendees?',
    a: 'No, you can manage events of any size with EventFlow.'
  },
  {
    q: 'Can I customize the branding for my events?',
    a: 'Yes, you can add your logo, colors, and more.'
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. We use enterprise-grade security and encryption.'
  },
];

const steps = [
  {
    icon: <Calendar className="h-7 w-7 text-white" />,
    title: 'Create',
    desc: 'Set up your event in minutes with our guided builder.'
  },
  {
    icon: <Users className="h-7 w-7 text-white" />,
    title: 'Promote',
    desc: 'Share your event and manage attendees easily.'
  },
  {
    icon: <Shield className="h-7 w-7 text-white" />,
    title: 'Analyze',
    desc: 'Track performance and gain insights in real time.'
  },
];


export default function LandingPage() {

  const [faqOpen, setFaqOpen] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const testimonialInterval = useRef();
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuthenticated = !!currentUser;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isTestimonialPaused) return;
    testimonialInterval.current = setInterval(() => {
      setTestimonialIdx(idx => (idx + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(testimonialInterval.current);
  }, [isTestimonialPaused]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 py-20 text-center overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        {/* Animated Glassmorphism Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-spin-slow" />
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-xl">
          Effortless <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">Event Management</span>
        </h1>
        <p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
          Plan, organize, and track your events with ease. Elevate your event experience with EventFlow.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => {
              if (isAuthenticated) {
                navigate('/events');
              } else {
                navigate('/register');
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-pink-600 hover:scale-105 transition text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Get Started Free"
          >
            Get Started Free
          </button>
          <a href="#features" className="px-8 py-3 bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-primary dark:text-white rounded-full font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="See Features">See Features</a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Users className="h-5 w-5 animate-float" /> 2M+ Attendees
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Calendar className="h-5 w-5 animate-float2" /> 50K+ Events
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <Shield className="h-5 w-5 animate-float3" /> 99.9% Uptime
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="w-full bg-gradient-to-br from-red-400 via-amber-300 to-yellow-200 dark:from-indigo-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
        <section id="features" className="max-w-6xl mx-auto px-4 py-20 rounded-3xl">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex flex-col items-center w-fit">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-2 inline-block text-center">Powerful Features</h2>
              <span className="block h-1 w-full rounded-full bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group rounded-2xl shadow-xl p-8 flex flex-col items-center text-center backdrop-blur-lg border border-gray-100 dark:border-gray-800 hover:scale-105 hover:shadow-2xl transition-all duration-200 bg-gradient-to-br ${featureColors[i % featureColors.length]} text-white focus-within:ring-2 focus-within:ring-white`}
                tabIndex={0}
                aria-label={f.title}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-3 mx-auto">
                  {React.cloneElement(f.icon, { className: "h-6 w-6 text-white" })}
                </div>
                <h3 className="text-xl font-bold mb-2 drop-shadow-lg">{f.title}</h3>
                <p className="text-white/90">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* How It Works Section */}
      <div className="w-full bg-gradient-to-br from-indigo-400 via-fuchsia-400 to-pink-400 dark:from-pink-900 dark:via-fuchsia-900 dark:to-violet-900 transition-colors duration-500">
        <section className="max-w-5xl mx-auto px-4 py-20 rounded-3xl">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex flex-col items-center w-fit">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-2 inline-block text-center">How It Works</h2>
              <span className="block h-1 w-full rounded-full bg-white" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`rounded-2xl shadow-xl p-8 flex flex-col items-center text-center bg-gradient-to-br ${featureColors[i % featureColors.length]} text-white focus-within:ring-2 focus-within:ring-white transition-transform duration-200 hover:scale-105`}
                tabIndex={0}
                aria-label={`Step ${i + 1}: ${step.title}`}
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4 relative">
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold bg-white/30 text-white px-3 py-1 rounded-full shadow">Step {i + 1}</span>
                  {step.icon}
                </div>
                <div className="text-xl font-semibold mb-2 drop-shadow-lg">{step.title}</div>
                <div className="text-white/90">{step.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Testimonials Carousel */}
      <div className="w-full bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-400 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900 transition-colors duration-500">
        <section className="max-w-4xl mx-auto px-4 py-20 rounded-3xl">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex flex-col items-center w-fit">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow mb-2 inline-block text-center">What Our Users Say</h2>
              <span className="block h-1 w-full rounded-full bg-white" />
            </div>
          </div>
          <div className="relative flex flex-col items-center">
            <div
              className="bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border-2 border-pink-200 dark:border-pink-900 max-w-xl w-full transition-all duration-500"
              onMouseEnter={() => setIsTestimonialPaused(true)}
              onMouseLeave={() => setIsTestimonialPaused(false)}
              tabIndex={0}
              aria-label="Testimonial"
            >
              <img src={testimonials[testimonialIdx].avatar} alt={testimonials[testimonialIdx].name} className="w-16 h-16 rounded-full mb-4 object-cover border-4 border-primary/30" />
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{testimonials[testimonialIdx].name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-300 mb-2">{testimonials[testimonialIdx].role}</div>
              <div className="text-gray-600 dark:text-gray-200 mb-4">“{testimonials[testimonialIdx].text}”</div>
              <div className="flex gap-1 justify-center mb-2">
                {[...Array(testimonials[testimonialIdx].rating)].map((_, j) => (
                  <Star key={j} className="text-yellow-400 h-5 w-5" fill="currentColor" />
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 transition shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous testimonial"
              >
                &larr;
              </button>
              <button
                onClick={() => setTestimonialIdx((testimonialIdx + 1) % testimonials.length)}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-blue-600 hover:to-pink-600 transition shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next testimonial"
              >
                &rarr;
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <CTASection />

      {/* FAQ Section */}
      <div className="w-full bg-gradient-to-br from-emerald-50 via-cyan-100 to-blue-50 dark:from-green-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-500">
        <section className="max-w-3xl mx-auto px-4 py-20 rounded-3xl">
          <div className="mb-12 flex flex-col items-center">
            <div className="flex flex-col items-center w-fit">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow mb-2 inline-block text-center">Frequently Asked Questions</h2>
              <span className="block h-1 w-full rounded-full bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500" />
            </div>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gradient-to-br from-white via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 rounded-xl shadow p-6 border-2 border-blue-200 dark:border-blue-900 transition-all duration-300">
                <button
                  className="w-full flex justify-between items-center text-left font-semibold text-gray-800 dark:text-white text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  aria-expanded={faqOpen === i}
                  aria-controls={`faq-content-${i}`}
                  aria-label={faq.q}
                >
                  {faq.q}
                  <ChevronDown className={`ml-2 text-primary transition-transform duration-300 ${faqOpen === i ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id={`faq-content-${i}`}
                  className={`overflow-hidden transition-all duration-500 ${faqOpen === i ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}
                  aria-hidden={faqOpen !== i}
                >
                  <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Animations for floating icons */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float2 { animation: float 3.5s ease-in-out infinite; }
        .animate-float3 { animation: float 4s ease-in-out infinite; }
        @keyframes spin-slow { 100% { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 1.2s ease; }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease-in-out infinite; }
      `}</style>
    </main>
  );
};