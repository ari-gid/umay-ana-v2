import HeroSection from '@/components/home/HeroSection'
import PregnancyCalculator from '@/components/home/PregnancyCalculator'
import Recommendations from '@/components/home/Recommendations'
import Link from 'next/link'

export default function Home() {
  const features = [
    { icon: '📖', title: 'Expert Articles', desc: 'Curated content for every trimester', href: '/articles' },
    { icon: '💬', title: 'Community Forum', desc: 'Connect with other expecting mothers', href: '/forum' },
    { icon: '👩‍⚕️', title: 'Find Doctors', desc: 'Trusted OBGYNs near you', href: '/doctors' },
    { icon: '🤖', title: 'AI Assistant', desc: '24/7 pregnancy guidance', href: '/assistant' },
  ]

  return (
    <div>
      <HeroSection />

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f) => (
              <Link key={f.href} href={f.href}>
                <div className="bg-[#FFE6F0] rounded-2xl p-5 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-2">{f.icon}</div>
                  <h3 className="font-bold text-gray-800 text-sm">{f.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Know Where You Are 🌸</h2>
            <p className="text-gray-500 mt-2">Calculate your pregnancy week and due date</p>
          </div>
          <PregnancyCalculator />
        </div>
      </section>

      {/* Articles */}
      <Recommendations />

      {/* CTA */}
      <section className="py-16 bg-[#FF5FA2] text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Your BloomCare Journey Today 🌺</h2>
          <p className="text-white/90 mb-8">
            Join thousands of expecting mothers who use BloomCare for support, information, and community.
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-white text-[#FF5FA2] font-bold px-8 py-4 rounded-full hover:bg-[#FFE6F0] transition-colors text-lg shadow-lg"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
