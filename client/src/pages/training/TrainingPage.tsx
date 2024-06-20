import PageTabs from '../../components/PageTabs/PageTabs'
import IndividualReport from './IndividualReport'

const Tabs = [
  { label: 'MAIN TEAM PROGRESS', children: 'MAIN TEAM PROGRESS' },
  { label: 'INDIVIDUAL REPORTS', children: <IndividualReport /> }
]

export default function TrainingPage() {
  return <PageTabs tabs={Tabs} />
}
