import { ReactNode } from 'react'
import ListItem from '@mui/material/ListItem'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import ExtensionIcon from '@mui/icons-material/Extension'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'

interface NavBarItemProps {
  path: string
  value: string
  icon?: ReactNode
  onClick?: () => void
  navigate: (path: string) => void
}

export const drawerPublicItems = [
  {
    path: '/',
    value: 'Home',
    icon: <HomeIcon />
  },
  {
    path: 'xtreme',
    value: 'Xtreme',
    icon: <EmojiEventsIcon />
  },
  {
    path: 'scouting',
    value: 'Scouting',
    icon: <PersonSearchIcon />
  }
]

export const drawerPrivateItems = [
  {
    path: 'squad',
    value: 'Team',
    icon: <PeopleIcon />
  },
  {
    path: 'training',
    value: 'Training',
    icon: <SelfImprovementIcon />
  }
]

export const footerItems = [
  {
    path: 'about',
    value: 'About',
    icon: <PersonSearchIcon sx={{ mr: 0.5 }} fontSize="inherit" />
  },
  {
    path: 'contact',
    value: 'Contact',
    icon: <ContactMailIcon sx={{ mr: 0.5 }} fontSize="inherit" />
  },
  {
    path: 'addon',
    value: 'Addon',
    icon: <ExtensionIcon sx={{ mr: 0.5 }} fontSize="inherit" />
  }
]

export const navBarItems = [
  {
    path: 'home',
    value: 'CLUB'
  },
  {
    path: 'u21',
    value: 'U21'
  },
  {
    path: 'nt',
    value: 'NT'
  }
]

export const NavBarItem = ({
  path,
  value,
  icon,
  onClick,
  navigate
}: NavBarItemProps) => (
  <ListItem disablePadding>
    <ListItemButton
      onClick={() => {
        navigate(path)
        if (onClick) onClick()
      }}
    >
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={value} />
    </ListItemButton>
  </ListItem>
)
