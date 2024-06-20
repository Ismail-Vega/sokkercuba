import { useContext } from 'react'
import Grid from '@mui/material/Grid'
import { AppContext } from '../../store/StoreProvider'
import PlayerCard from '../../components/PlayerCard/PlayerCard'

function Squad() {
  const { state, dispatch } = useContext(AppContext)
  const { players } = state

  const data = players && players.players.length > 0 ? players.players : null

  return (
    <Grid container spacing={{ xs: '4px', md: '4px', lg: '24px' }}>
      {data &&
        data.map((player) => {
          const {
            id,
            info: { nationalSharing }
          } = player

          return nationalSharing ? (
            <Grid item key={id} xs={12} sm={8} md={6} xl={4}>
              <PlayerCard {...player} />
            </Grid>
          ) : null
        })}
    </Grid>
  )
}

export default Squad
