export interface TSummary {
  weeks: [
    {
      gameDay: {
        season: number
        week: number
        seasonWeek: number
        day: number
        date: {
          value: string
          timestamp: number
        }
      }
      week: number
      stats: {
        general: number
        advanced: number
        skillsUp: number
      }
      juniors: {
        number: number
        skillsUp: number
      }
    }
  ]
}
