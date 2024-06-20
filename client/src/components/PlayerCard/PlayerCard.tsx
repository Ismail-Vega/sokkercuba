import { Box } from '@mui/material'
import Card from '@mui/material/Card'
import List from '@mui/material/List'
import Link from '@mui/material/Link'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import { TeamPlayer } from '../../types/team'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import ToggleButtonsMultiple from './ToggleButtonGroup'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import { SkillsLevels } from '../../constants/SkillsData'
import RectangleIcon from '@mui/icons-material/Rectangle'
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp'

const listStyle = {
  width: '100%',
  lineHeight: { xs: 0.5, md: 0.8, lg: 1.33 },
  fontSize: { xs: '0.6rem', md: '0.65rem', lg: '0.8rem' },
  bgcolor: 'background.paper'
}

const nameStyle = {
  maxWidth: '150px',
  textWrap: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

type CardStats = {
  cards: number
  yellow: number
  red: number
}

function renderCard(cardStats: CardStats) {
  const { yellow, red } = cardStats

  if (red > 0) {
    return (
      <RectangleIcon
        color="error"
        fontSize="small"
        sx={{ transform: 'rotate(90deg)' }}
      />
    )
  }

  if (yellow === 1) {
    return <LooksOneIcon sx={{ color: '#ffeb3b' }} />
  }

  if (yellow === 2) {
    return <LooksTwoIcon sx={{ color: '#ffeb3b' }} />
  }

  return "0 "
}

function PlayerCard({ id, info }: TeamPlayer) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        borderRadius: '16px',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          gap: '4px',
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #ffffff33',
          paddingX: { xs: '10px', md: '12px', lg: '16px' }
        }}
      >
        <Link
          color="inherit"
          underline="hover"
          href={`https://sokker.org/player/PID/${id}`}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Typography variant="subtitle2" sx={nameStyle}>
            {info.name.full + ','}
          </Typography>
        </Link>

        <Typography variant="subtitle2">
          {`age: ${info.characteristics.age}`}
        </Typography>
        <ToggleButtonsMultiple id={id} />
      </Box>

      <CardContent
        sx={{
          width: '100%',
          paddingX: '8px'
        }}
      >
        <List sx={listStyle} aria-label="player card info">
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' }
            }}
          >
            <Box sx={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
              value:
              <Typography
                variant="subtitle2"
                fontWeight={700}
              >{`${info.value.value
                .toLocaleString('en-US')
                .replace(/,/g, ' ')} $MN`}</Typography>
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' }
            }}
          >
            <Box sx={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
              wage:{' '}
              <Typography
                variant="subtitle2"
                fontWeight={700}
              >{`${info.wage.value
                .toLocaleString('en-US')
                .replace(/,/g, ' ')} $MN`}</Typography>
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' }
            }}
          >
            <Box sx={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.form
              ].toLocaleLowerCase()} [${info.skills.form}]`}</Typography>{' '}
              form
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' }
            }}
          >
            <Box sx={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.tacticalDiscipline
              ].toLocaleLowerCase()} [${info.skills.tacticalDiscipline
                }]`}</Typography>{' '}
              tactical discipline
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' }
            }}
          >
            <Box sx={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
              height:
              <Typography
                fontWeight={700}
                variant="subtitle2"
              >{`${info.characteristics.height} cm,`}</Typography>{' '}
              weight:
              <Typography
                fontWeight={700}
                variant="subtitle2"
              >{`${info.characteristics.weight.toFixed(1)} kg,`}</Typography>
              BMI:
              <Typography
                fontWeight={700}
                variant="subtitle2"
              >{`${info.characteristics.bmi.toFixed(2)}`}</Typography>
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' }
            }}
          >
            {' '}
            <Box sx={{ gap: '4px', display: 'flex', alignItems: 'center' }}>
              <>cards: {renderCard(info.stats.cards)}</>
              <>NT cards: {renderCard(info.nationalStats.cards)}</>
              <>injury:
                {info.injury.daysRemaining > 0 ? (
                  <>
                    <LocalHospitalSharpIcon color="error" fontSize="small" />
                    {`(${info.injury.daysRemaining} days)`}
                  </>
                ) : (
                  'none'
                )}</>
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem></ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.stamina
              ].toLocaleLowerCase()} [${info.skills.stamina
                }]`}</Typography>{' '}
              stamina
            </Box>
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.keeper
              ].toLocaleLowerCase()} [${info.skills.keeper}]`}</Typography>{' '}
              keeper
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.pace
              ].toLocaleLowerCase()} [${info.skills.pace}]`}</Typography>{' '}
              pace
            </Box>
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.defending
              ].toLocaleLowerCase()} [${info.skills.defending
                }]`}</Typography>{' '}
              defender
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.technique
              ].toLocaleLowerCase()} [${info.skills.technique
                }]`}</Typography>{' '}
              technique
            </Box>
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.playmaking
              ].toLocaleLowerCase()} [${info.skills.playmaking
                }]`}</Typography>{' '}
              playmaker
            </Box>
          </ListItem>
          <Divider variant="middle" />
          <ListItem
            sx={{
              paddingY: '4px',
              paddingX: { xs: '10px', md: '12px', lg: '16px' },
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.passing
              ].toLocaleLowerCase()} [${info.skills.passing
                }]`}</Typography>{' '}
              passing
            </Box>
            <Box
              sx={{
                flex: 1,
                gap: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Typography fontWeight={700} variant="subtitle2">{`${SkillsLevels[
                info.skills.striker
              ].toLocaleLowerCase()} [${info.skills.striker
                }]`}</Typography>{' '}
              striker
            </Box>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  )
}

export default PlayerCard
