import { Box } from '@mui/material/'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import PolicyIcon from '@mui/icons-material/Policy'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { footerItems } from '../Navigation/navItems'
import { useNavigate, useLocation } from 'react-router-dom'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://www.sokkercuba.com/">
        Sokker Cuba
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export function Footer() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isAddonPath = pathname === '/addon'

  return (
    <Box
      sx={{
        mt: 'auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[200] : '#1a1a38'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <Breadcrumbs aria-label="breadcrumb">
            {footerItems.map(({ value, path, icon }) =>
              isAddonPath && path === 'addon' ? (
                <Link
                  key="privacy"
                  variant="body2"
                  color="inherit"
                  underline="hover"
                  component="button"
                  onClick={() => navigate('addon/privacy')}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <PolicyIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Addon Privacy
                </Link>
              ) : (
                <Link
                  key={value}
                  variant="body2"
                  color="inherit"
                  underline="hover"
                  component="button"
                  onClick={() => navigate(path)}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  {icon}
                  {value}
                </Link>
              )
            )}
          </Breadcrumbs>
        </Box>
        <Divider sx={{ m: '16px' }} />
        <Container maxWidth="sm">
          <Typography variant="body1">
            La vieja escuela del Sokker Cubano! Dudas, Consultas, pregunte sin
            pena! Si desea añadir a alguien pase el link del grupo.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  )
}
