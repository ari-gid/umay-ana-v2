import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-pink-medium/20 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🌸</span>
              <span className="text-lg font-bold text-[#FF5FA2]">BloomCare</span>
            </div>
            <p className="text-sm text-gray-500">
              A calm and supportive pregnancy companion for women, month 1 through 9.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/articles" className="hover:text-[#FF5FA2]">Articles</Link></li>
              <li><Link href="/forum" className="hover:text-[#FF5FA2]">Community Forum</Link></li>
              <li><Link href="/doctors" className="hover:text-[#FF5FA2]">Find Doctors</Link></li>
              <li><Link href="/assistant" className="hover:text-[#FF5FA2]">AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Topics</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/articles?topic=nutrition" className="hover:text-[#FF5FA2]">Nutrition</Link></li>
              <li><Link href="/articles?topic=exercise" className="hover:text-[#FF5FA2]">Exercise</Link></li>
              <li><Link href="/articles?topic=mental-health" className="hover:text-[#FF5FA2]">Mental Health</Link></li>
              <li><Link href="/articles?topic=medical" className="hover:text-[#FF5FA2]">Medical</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/auth/login" className="hover:text-[#FF5FA2]">Login</Link></li>
              <li><Link href="/auth/register" className="hover:text-[#FF5FA2]">Register</Link></li>
              <li><Link href="/profile" className="hover:text-[#FF5FA2]">My Profile</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">© 2024 BloomCare. Made with 💕 for expecting mothers.</p>
          <p className="text-xs text-gray-400">
            ⚠️ Content is for informational purposes only. Always consult your healthcare provider.
          </p>
        </div>
      </div>
    </footer>
  )
}
