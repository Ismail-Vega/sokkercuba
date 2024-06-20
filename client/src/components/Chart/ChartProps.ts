export interface SkillData {
  date: number
  value: number
  formation: any
}
export interface ChartProps {
  skillName: string
  data: SkillData[]
  onDataChange: (page: number) => void
}
