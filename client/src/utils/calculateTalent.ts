import { Report } from '../types/training'

interface SkillGrowthData {
  week: number
  skill: string
  growth: number
}

// Function to estimate talent based on historical skill growth data
export function estimateTalent(skillGrowthData: SkillGrowthData[]): number {
  // Separate data for each skill
  const skillData: { [skill: string]: { x: number[]; y: number[] } } = {}

  // Populate skillData
  skillGrowthData.forEach(({ week, skill, growth }) => {
    if (!skillData[skill]) {
      skillData[skill] = { x: [], y: [] }
    }
    skillData[skill].x.push(week)
    skillData[skill].y.push(growth)
  })

  // Linear regression for each skill
  const skillTalent: { [skill: string]: number } = {}
  Object.keys(skillData).forEach((skill) => {
    const { x, y } = skillData[skill]

    // Linear regression formula: y = mx + b
    const n = x.length
    const sumX = x.reduce((acc, val) => acc + val, 0)
    const sumY = y.reduce((acc, val) => acc + val, 0)
    const sumXY = x.reduce((acc, val, index) => acc + val * y[index], 0)
    const sumXSquare = x.reduce((acc, val) => acc + val * val, 0)

    const m = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX * sumX)

    // Talent is the slope of the linear regression line
    skillTalent[skill] = m
  })

  // Average talent across all skills
  const totalTalent = Object.values(skillTalent).reduce(
    (acc, val) => acc + val,
    0
  )
  const averageTalent = totalTalent / Object.keys(skillTalent).length

  return averageTalent
}

type SkillName = keyof Report['skills']

const skillsToConsider: SkillName[] = [
  'playmaking',
  'striker',
  'keeper',
  'pace',
  'defending',
  'technique',
  'passing'
]

export function calculateSkillGrowth(data: Report[]) {
  const growth: Record<string, number> = {}

  skillsToConsider.forEach((skillName) => {
    const skillData = data.filter((entry) => {
      const { kind, type, intensity } = entry
      return (
        skillName === type.name && kind.name !== 'missing' && intensity >= 50
      )
    })

    if (skillData.length >= 3) {
      const weeks = skillData.length
      const finalSkillValue = skillData[0].skills[skillName] // Newest value
      const initialSkillValue = skillData[weeks - 1].skills[skillName] // Oldest value
      const skillDivisor = finalSkillValue - initialSkillValue
      if (skillDivisor > 0) {
        const skillGrowth = weeks / skillDivisor
        growth[skillName] = parseFloat(skillGrowth.toFixed(1))
      } else growth[skillName] = 0
    } else {
      growth[skillName] = 0 // Skill data not available or didn't change
    }
  })

  const growthValues = Object.values(growth)
  const sumGrowth = growthValues.reduce((sum, value) => sum + value, 0)
  let averageGrowth = 0

  if (sumGrowth > 0) {
    averageGrowth = sumGrowth / growthValues.filter((val) => val !== 0).length
  }

  growth['averageGrowth'] = parseFloat(averageGrowth.toFixed(2))

  return growth
}
