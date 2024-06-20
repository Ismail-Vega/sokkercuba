import { useContext, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import MenuItem from '@mui/material/MenuItem'
import TableRow from '@mui/material/TableRow'
import { SkillsTableData, columns, createData } from './types'
import { useTheme } from '@mui/material/styles'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { AppContext } from '../../store/StoreProvider'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { skillCellRenderer } from './skillCellRenderer'
import { Report } from '../../types/training'
import { calculateSkillGrowth } from '../../utils/calculateTalent'

export default function IndividualReport() {
  const theme = useTheme()
  const { state } = useContext(AppContext)
  const { players, training } = state
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [playerShown, setPlayerShown] = useState(players?.players[0] || null)
  const [playerReports, setPlayerReports] = useState<Report[]>([])

  const playersData = players?.players ? players.players : []

  const selectValue = useMemo(
    () =>
      playersData.length
        ? playersData.find(
          (pj) => pj.info.name.full === playerShown?.info.name.full
        )
        : null,
    [playerShown, playersData]
  )

  const rows = useMemo(() => {
    const data = training?.length
      ? training.find((v) => v.id === playerShown?.id)
      : null

    setPlayerReports(data?.reports || [])

    if (data && data.reports?.length) {

      const reports = data.reports.map((rep) => {
        const {
          week,
          skills,
          age: newAge,
          skillsChange,
          type: skillTrained,
          formation,
          kind: trainingType,
          games: minutes,
          intensity: eff,
          injury
        } = rep

        const pos = formation?.name || "NA"
        const type = skillTrained.name
        const kind =
          trainingType.name === 'missing' && injury.daysRemaining > 6
            ? 'injured'
            : trainingType.name
        const age = newAge || playerShown?.info.characteristics.age || 0
        const games = `${minutes.minutesOfficial}'/${minutes.minutesFriendly}'/${minutes.minutesNational}'`
        const skillsData: Partial<SkillsTableData> = skillCellRenderer({
          skills,
          skillsChange
        })

        const {
          stamina: stam,
          pace,
          technique: tech,
          passing: pass,
          keeper: keep,
          defending: dfnd,
          playmaking: plmk,
          striker: strk
        } = skillsData

        return createData(
          week,
          age,
          stam,
          pace,
          tech,
          pass,
          keep,
          dfnd,
          plmk,
          strk,
          type,
          pos,
          kind,
          games,
          eff
        )
      })
      return reports
    }

    return null
  }, [training, playerShown])

  const handlePlayerChange = (event: SelectChangeEvent) => {
    const player =
      playersData.find((pj) => pj.info.name.full === event.target.value) || null

    setPlayerShown(player)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Box>
      <Box sx={{
        gap: "24px",
        display: 'flex',
        alignItems: 'center',
      }}>
        <FormControl sx={{ minWidth: 210 }}>
          <InputLabel id="player-select-label">Players</InputLabel>
          <Select
            label="Players"
            id="player-select"
            labelId="player-select-label"
            onChange={handlePlayerChange}
            value={selectValue?.info.name.full || ''}
            inputProps={{ MenuProps: { disableScrollLock: true } }}
          >
            {playersData.map(({ id, info }) => (
              <MenuItem key={id} value={info.name.full}>
                {info.name.full}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{
          gap: "8px",
          display: 'flex',
          alignItems: 'center',
        }}>Gross Talent: {calculateSkillGrowth(playerReports).averageGrowth}</Box>
      </Box>
      {playerShown && (
        <Box mt={2}>
          <Paper variant="outlined" sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          fontWeight: 'bold'
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.week}
                          >
                            {columns.map((column) => {
                              const borderColor =
                                theme.palette.mode === 'light'
                                  ? '#e0e0e0'
                                  : '#515151'
                              const hasRightBorder =
                                column.id === 'age'
                                  ? { borderRight: `1px solid ${borderColor}` }
                                  : {}
                              const hasLeftBorder =
                                column.id === 'type'
                                  ? { borderLeft: `1px solid ${borderColor}` }
                                  : {}
                              const value = row[column.id]

                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  sx={{ ...hasLeftBorder, ...hasRightBorder }}
                                >
                                  {value}
                                </TableCell>
                              )
                            })}
                          </TableRow>
                        )
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={rows?.length || 0}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[10, 25, 100]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </Box>
  )
}
