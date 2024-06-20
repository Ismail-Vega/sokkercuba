import Card from '@mui/material/Card'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import { Box, SvgIcon } from '@mui/material'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import { ScrollToTopOnMount } from '../../components'
import { ReactComponent as ChromeIcon } from './chrome_icon.svg'
import { ReactComponent as FirefoxIcon } from './firefox-browser-icon.svg'

const AddonPage = () => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <ScrollToTopOnMount />

      <Card sx={{ maxWidth: '512px' }}>
        <CardMedia
          sx={{ height: 512 }}
          image="addon-logo.png"
          title="addon logo"
        />
        <CardContent>
          <Typography sx={{ fontSize: 16 }} color="text.primary" gutterBottom>
            Sokker JSON data exporter
          </Typography>

          <Typography variant="body2" color="text.secondary">
            This extension helps https://sokker.org authenticated users to get
            JSON data so it can be used to improve the management of your team.
          </Typography>
          <br />
          <Typography>Get it on: </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            startIcon={<SvgIcon component={FirefoxIcon} inheritViewBox />}
          >
            <Link
              target="_blank"
              href="https://addons.mozilla.org/en-US/firefox/addon/sokker-json-data-exporter"
              underline="none"
            >
              Firefox
            </Link>
          </Button>
          <Button
            size="small"
            startIcon={<SvgIcon component={ChromeIcon} inheritViewBox />}
          >
            <Link
              target="_blank"
              href="https://chrome.google.com/webstore/detail/sokker-json-data-exporter/ioehnfgobejdjgfgbellbkhhhofecdid"
              underline="none"
            >
              Chrome
            </Link>
          </Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default AddonPage
