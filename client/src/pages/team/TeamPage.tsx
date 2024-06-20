import Squad from './Squad'
import PageTabs from '../../components/PageTabs'

const Tabs = [
  { label: 'MAIN', children: <Squad /> },
  { label: 'JUNIORS', children: 'JUNIORS DATA' }
]

export default function PlayersPage() {
  return <PageTabs tabs={Tabs} />
}
