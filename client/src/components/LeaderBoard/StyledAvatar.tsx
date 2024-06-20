import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import { getImgUrl } from '../../utils/getImgUrl'

interface StyledAvatarProps {
  id: string
  name: string
  size: number
  position: number
  color:
    | 'primary'
    | 'secondary'
    | 'default'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

function StyledAvatar({ id, name, color, position, size }: StyledAvatarProps) {
  const children = (
    <Avatar
      alt={`${name}`}
      src={getImgUrl(
        `https://api.multiavatar.com/${id}.png?apikey=05kJFvVzgh2DH3`
      )}
      sx={{
        width: size,
        height: size
      }}
    />
  )

  return position === 1 ? (
    <StyledBadge
      color={color}
      overlap="circular"
      badgeContent={position}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {children}
    </StyledBadge>
  ) : (
    <Badge
      color={color}
      overlap="circular"
      badgeContent={position}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {children}
    </Badge>
  )
}

export default StyledAvatar
