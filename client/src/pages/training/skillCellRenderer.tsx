import React from 'react'
import { Box } from '@mui/material'

interface Skills {
  [key: string]: number
}

interface SkillsChange {
  [key: string]: number
}

interface SkillsCellRendererProps {
  skills: Skills
  skillsChange: SkillsChange
}

export const skillCellRenderer = ({
  skills,
  skillsChange
}: SkillsCellRendererProps) => {
  const skillComponents: { [key: string]: React.ReactNode } = {}

  Object.entries(skillsChange).forEach(([skill, change]) => {
    const backgroundColor =
      change > 0 ? '#4caf50' : change < 0 ? '#f44336' : 'transparent'

    skillComponents[skill] = (
      <Box sx={{ backgroundColor, borderRadius: '4px' }}>{skills[skill]}</Box>
    )
  })

  return skillComponents
}
