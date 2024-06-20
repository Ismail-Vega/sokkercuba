export interface Juniors {
  juniors: {
    id: number
    teamId: number
    name: string
    fullName: {
      name: string
      surname: string
      full: string
    }
    skill: number
    age: number
    weeksLeft: number
  }[]
}
