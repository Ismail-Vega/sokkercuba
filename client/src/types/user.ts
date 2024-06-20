export interface SokkerCredentials {
  email: string
  password: string
}

interface Country {
  code: number
  name: string
}

interface Shirt {
  hex: string
}

interface Trousers {
  hex: string
}

interface Colors {
  first: {
    shirt: Shirt
    trousers: Trousers
    type: {
      code: number
      name: string
    }
  }
  second: {
    shirt: Shirt
    trousers: Trousers
    type: {
      code: number
      name: string
    }
  }
  keeper: {
    shirt: Shirt
    trousers: Trousers
    type: {
      code: number
      name: string
    }
  }
}

interface Team {
  id: number
  name: string
  rank: number
  emblem: string
  country: Country
  colors: Colors
  nationalType: number
  bankrupt: boolean
}

interface Budget {
  value: number
  currency: string
}

interface DateValue {
  value: string
  timestamp: number
}

interface Today {
  season: number
  week: number
  seasonWeek: number
  day: number
  date: DateValue
}

interface DateTime {
  date: string
  timezone_type: number
  timezone: string
}

interface Lock {
  transfersLocked: boolean
  readOnlyMode: boolean
}

interface Settings {
  locale: string
  theme: string
}

export interface User {
  id: number
  name: string
  team: Team
  budget: Budget
  roles: any[]
  plus: boolean
  hasTrialPlus: boolean
  plusDeadline: any
  today: Today
  dateTime: DateTime
  enabledFeatures: string[]
  sl: string
  nationalTeamId: number
  nationalTeam: any
  firstLogin: boolean
  lock: Lock
  settings: Settings
}
