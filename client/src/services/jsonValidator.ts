import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import * as user from '../constants/schemas/user.json'
import * as players from '../constants/schemas/players.json'
import * as juniors from '../constants/schemas/juniors.json'
import * as cweek from '../constants/schemas/cweek.json'
import * as tsummary from '../constants/schemas/tsummary.json'
import * as training from '../constants/schemas/training.json'
import * as sokker_data from '../constants/schemas/sokker-data.json'

const ajv = new Ajv({
  allErrors: true,
  code: {
    source: true
  },
  allowUnionTypes: true
})
addFormats(ajv)
ajv.addSchema(user, 'user')
ajv.addSchema(players, 'players')
ajv.addSchema(juniors, 'juniors')
ajv.addSchema(cweek, 'cweek')
ajv.addSchema(tsummary, 'tsummary')
ajv.addSchema(training, 'training')
ajv.addSchema(sokker_data, 'all')
export default ajv
