import * as React from 'react'
import { Box } from '@mui/material'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

interface Tab {
  label: string
  children?: React.ReactNode
}

interface PageTabsProps {
  tabs: Tab[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`squad-tabpanel-${index}`}
      aria-labelledby={`squad-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

export default function PageTabs({ tabs }: PageTabsProps) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs">
          {tabs.map((tab, idx) => {
            return (
              <Tab
                label={tab.label}
                key={tab.label + idx}
                {...a11yProps(idx)}
              />
            )
          })}
        </Tabs>
      </Box>
      {tabs.map((tab, idx) => {
        const { label, children } = tab

        return (
          <TabPanel key={label + '-panel-' + idx} value={value} index={idx}>
            {children}
          </TabPanel>
        )
      })}
    </Box>
  )
}
