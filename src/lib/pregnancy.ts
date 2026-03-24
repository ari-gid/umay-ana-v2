export function calculatePregnancy(lmpDate: Date) {
  const now = new Date()
  const diffMs = now.getTime() - lmpDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(diffDays / 7)
  const days = diffDays % 7

  const dueDate = new Date(lmpDate)
  dueDate.setDate(dueDate.getDate() + 280)

  let trimester = 1
  if (weeks >= 14 && weeks < 28) trimester = 2
  if (weeks >= 28) trimester = 3

  return {
    weeks,
    days,
    dueDate,
    trimester,
    currentWeek: weeks,
  }
}

export function calculateLmpFromWeeks(weeksPregnant: number, daysPregnant: number = 0): Date {
  const totalDays = weeksPregnant * 7 + daysPregnant
  const lmp = new Date()
  lmp.setDate(lmp.getDate() - totalDays)
  return lmp
}

export function getTrimesterLabel(trimester: number): string {
  const labels: Record<number, string> = {
    1: 'First Trimester',
    2: 'Second Trimester',
    3: 'Third Trimester',
  }
  return labels[trimester] ?? 'Unknown'
}

export function getBabySize(week: number): string {
  const sizes: Record<number, string> = {
    4: 'poppy seed',
    5: 'sesame seed',
    6: 'lentil',
    7: 'blueberry',
    8: 'raspberry',
    9: 'grape',
    10: 'kumquat',
    11: 'fig',
    12: 'lime',
    13: 'lemon',
    14: 'peach',
    15: 'apple',
    16: 'avocado',
    17: 'pear',
    18: 'bell pepper',
    19: 'mango',
    20: 'banana',
    21: 'carrot',
    22: 'papaya',
    23: 'grapefruit',
    24: 'ear of corn',
    25: 'cauliflower',
    26: 'scallion',
    27: 'head of lettuce',
    28: 'eggplant',
    29: 'butternut squash',
    30: 'cabbage',
    31: 'coconut',
    32: 'squash',
    33: 'pineapple',
    34: 'cantaloupe',
    35: 'honeydew melon',
    36: 'romaine lettuce',
    37: 'Swiss chard',
    38: 'leek',
    39: 'mini watermelon',
    40: 'small pumpkin',
  }
  return sizes[week] ?? 'growing baby'
}
