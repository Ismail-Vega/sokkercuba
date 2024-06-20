import { ReactNode } from 'react'

interface Column {
  id:
    | 'week'
    | 'age'
    | 'stamina'
    | 'pace'
    | 'technique'
    | 'passing'
    | 'keeper'
    | 'defending'
    | 'playmaking'
    | 'striker'
    | 'type'
    | 'pos'
    | 'kind'
    | 'games'
    | 'eff'
  label: string
  minWidth?: number
  align?: 'left' | 'center'
}

export interface SkillsTableData {
  week: number
  age: number
  stamina: ReactNode
  pace: ReactNode
  technique: ReactNode
  passing: ReactNode
  keeper: ReactNode
  defending: ReactNode
  playmaking: ReactNode
  striker: ReactNode
  type: string
  pos: string
  kind: string
  games: string
  eff: number
}

export const columns: readonly Column[] = [
  { id: 'week', label: 'Week', minWidth: 48 },
  { id: 'age', label: 'Age', minWidth: 48 },
  {
    id: 'stamina',
    label: 'Stam',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'pace',
    label: 'Pace',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'technique',
    label: 'Tech',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'passing',
    label: 'Pass',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'keeper',
    label: 'Keep',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'defending',
    label: 'Def.',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'playmaking',
    label: 'Plmk',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'striker',
    label: 'Strk',
    minWidth: 48,
    align: 'center'
  },
  {
    id: 'type',
    label: 'Type',
    minWidth: 48,
    align: 'left'
  },
  {
    id: 'pos',
    label: 'Pos.',
    minWidth: 48,
    align: 'left'
  },
  {
    id: 'kind',
    label: 'Kind',
    minWidth: 48,
    align: 'left'
  },
  {
    id: 'games',
    label: 'Games',
    minWidth: 48,
    align: 'left'
  },
  {
    id: 'eff',
    label: 'Eff.',
    minWidth: 48,
    align: 'left'
  }
]

export function createData(
  week: number,
  age: number,
  stamina: ReactNode,
  pace: ReactNode,
  technique: ReactNode,
  passing: ReactNode,
  keeper: ReactNode,
  defending: ReactNode,
  playmaking: ReactNode,
  striker: ReactNode,
  type: string,
  pos: string,
  kind: string,
  games: string,
  eff: number
): SkillsTableData {
  return {
    week,
    age,
    stamina,
    pace,
    technique,
    passing,
    keeper,
    defending,
    playmaking,
    striker,
    type,
    pos,
    kind,
    games,
    eff
  }
}
