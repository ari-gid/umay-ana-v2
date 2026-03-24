'use client'

import { useState } from 'react'
import { calculatePregnancy, calculateLmpFromWeeks, getBabySize } from '@/lib/pregnancy'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function PregnancyCalculator() {
  const [mode, setMode] = useState<'lmp' | 'weeks'>('lmp')
  const [lmpDate, setLmpDate] = useState('')
  const [weeks, setWeeks] = useState('')
  const [days, setDays] = useState('0')
  const [result, setResult] = useState<{
    weeks: number
    days: number
    dueDate: Date
    trimester: number
    babySize: string
  } | null>(null)

  const calculate = () => {
    let lmp: Date

    if (mode === 'lmp') {
      if (!lmpDate) return
      lmp = new Date(lmpDate)
    } else {
      if (!weeks) return
      lmp = calculateLmpFromWeeks(parseInt(weeks), parseInt(days || '0'))
    }

    const calc = calculatePregnancy(lmp)
    setResult({
      ...calc,
      babySize: getBabySize(calc.weeks),
    })
  }

  const trimesterLabels = ['', 'First Trimester', 'Second Trimester', 'Third Trimester']
  const trimesterColors = ['', 'bg-green-50 text-green-700', 'bg-blue-50 text-blue-700', 'bg-purple-50 text-purple-700']

  return (
    <Card className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        🗓️ Pregnancy Calculator
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Find out how far along you are and when your baby is due
      </p>

      {/* Mode toggle */}
      <div className="flex rounded-xl overflow-hidden border border-pink-medium/30 mb-6">
        <button
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === 'lmp' ? 'bg-[#FF5FA2] text-white' : 'bg-white text-gray-600 hover:bg-[#FFE6F0]'
          }`}
          onClick={() => setMode('lmp')}
        >
          Last Period Date
        </button>
        <button
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === 'weeks' ? 'bg-[#FF5FA2] text-white' : 'bg-white text-gray-600 hover:bg-[#FFE6F0]'
          }`}
          onClick={() => setMode('weeks')}
        >
          I Know My Weeks
        </button>
      </div>

      {mode === 'lmp' ? (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First day of your last period
          </label>
          <input
            type="date"
            value={lmpDate}
            onChange={(e) => setLmpDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="input-field w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 bg-white"
          />
        </div>
      ) : (
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Weeks</label>
            <input
              type="number"
              value={weeks}
              onChange={(e) => setWeeks(e.target.value)}
              min="1"
              max="42"
              placeholder="e.g. 20"
              className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 bg-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
            <input
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              min="0"
              max="6"
              placeholder="0-6"
              className="w-full px-4 py-3 rounded-xl border border-pink-medium/40 focus:outline-none focus:ring-2 focus:ring-[#FF5FA2]/40 bg-white"
            />
          </div>
        </div>
      )}

      <Button variant="primary" className="w-full" onClick={calculate}>
        Calculate 🌸
      </Button>

      {result && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#FFE6F0] rounded-2xl p-4 text-center">
            <div className="text-3xl font-bold text-[#FF5FA2]">{result.weeks}</div>
            <div className="text-sm text-gray-600">
              Weeks {result.days > 0 ? `+ ${result.days} days` : ''}
            </div>
          </div>
          <div className="bg-[#FFE6F0] rounded-2xl p-4 text-center">
            <div className="text-sm font-semibold text-[#FF5FA2]">Due Date</div>
            <div className="text-base font-bold text-gray-800">
              {result.dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
          <div className={`col-span-2 rounded-2xl p-4 text-center ${trimesterColors[result.trimester]}`}>
            <div className="text-lg font-bold">{trimesterLabels[result.trimester]}</div>
            <div className="text-sm mt-1">
              🍼 Your baby is about the size of a <strong>{result.babySize}</strong>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
