export interface PlayerInfo {
  name: {
    name: string
    surname: string
    full: string
  }
  formation: null
  number: null
  team: {
    id: number
    name: string
    rank: number
    rankPosition: number
    emblem: string
    country: {
      code: number
      name: string
    }
    colors: {
      first: {
        shirt: {
          hex: string
        }
        trousers: {
          hex: string
        }
        type: {
          code: number
          name: string
        }
      }
      second: {
        shirt: {
          hex: string
        }
        trousers: {
          hex: string
        }
        type: {
          code: number
          name: string
        }
      }
      keeper: {
        shirt: {
          hex: string
        }
        trousers: {
          hex: string
        }
        type: {
          code: number
          name: string
        }
      }
    }
    nationalType: number
    bankrupt: boolean
  }
  country: {
    code: number
    name: string
  }
  value: {
    value: number
    currency: string
  }
  previousValue: null
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
