export interface Report {
  age: number
  week: number
  day: {
    season: number
    week: number
    seasonWeek: number
    day: number
    date: { value: string; timestamp: number }
  }
  skills: {
    form: number
    tacticalDiscipline: number
    teamwork: number
    experience: number
    stamina: number
    keeper: number
    playmaking: number
    passing: number
    technique: number
    defending: number
    striker: number
    pace: number
  }
  skillsChange: {
    form: number
    tacticalDiscipline: number
    teamwork: number
    experience: number
    stamina: number
    keeper: number
    playmaking: number
    passing: number
    technique: number
    defending: number
    striker: number
    pace: number
    down: number
    up: number
  }
  type: { code: number; name: string }
  kind: { code: number; name: string }
  playerValue: { value: number; currency: string }
  games: {
    minutesOfficial: number
    minutesFriendly: number
    minutesNational: number
  }
  intensity: number
  formation: { code: number; name: string } | null
  injury: { daysRemaining: number; severe: boolean }
}

export interface Training {
  id: number
  reports: Report[]
}
