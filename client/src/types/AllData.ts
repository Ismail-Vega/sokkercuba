import { User } from './user'
import { Juniors } from './juniors'
import { CWeek } from './cweek'
import { TSummary } from './tsummary'
import { Team } from './team'
import { Training } from './training'

export interface AllData {
  user?: User
  juniors?: Juniors
  cweek?: CWeek
  tsummary?: TSummary
  players?: Team
  training?: Training[]
}
