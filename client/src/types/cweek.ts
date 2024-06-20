interface Player {
  id: number
  player: {
    name: {
      name: string
      surname: string
      full: string
    }
    formation: {
      code: number
      name: string
    }
    number: number | null
    team: {
      id: number
    }
    country: {
      code: number
      name: string
    }
    value: {
      value: number
      currency: string
    }
    previousValue: {
      value: number
      currency: string
    } | null
    wage: {
      value: number
      currency: string
    }
    characteristics: {
      age: number
      height: number
      weight: number
      bmi: number
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
    stats: {
      cards: {
        cards: number
        yellow: number
        red: number
      }
      goals: number
      assists: number
      matches: number
    }
    nationalStats: {
      cards: {
        cards: number
        yellow: number
        red: number
      }
      goals: number
      assists: number
      matches: number
    }
    face: {
      face: number
      skinColor: number
      hairColor: number
      hair: number
      eyes: number
      nose: number
      beard: number
      beardColor: number
      shirt: number
      mouth: number
    }
    youthTeamId: number
    injury: {
      daysRemaining: number
      severe: boolean
    }
    nationalSharing: boolean
  }
  report: {
    week: number
    day: {
      season: number
      week: number
      seasonWeek: number
      day: number
      date: {
        value: string
        timestamp: number
      }
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
    type: {
      code: number
      name: string
    }
    kind: {
      code: number
      name: string
    }
    playerValue: {
      value: number
      currency: string
    }
    games: {
      minutesOfficial: number
      minutesFriendly: number
      minutesNational: number
    }
    intensity: number
    formation: {
      code: number
      name: string
    }
    injury: {
      daysRemaining: number
      severe: boolean
    }
  }
}

export interface CWeek {
  players: Player[]
}
