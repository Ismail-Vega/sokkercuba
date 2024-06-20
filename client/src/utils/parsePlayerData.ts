export interface Position {
  id: number
  name: string
  team: string
  score: number
  position: number
  iconData?: {
    down: boolean
    color: string
  }
}

const getStatusIconData = (prevPos: Position[], currentPos: Position[]) => {
  const data = currentPos.map((item, idx) => {
    const prevIdx = prevPos.findIndex((val) => val.id === item.id)
    const isEqualScore = idx === prevIdx ? 'disabled' : 'success'
    const isDown = idx > prevIdx
    const iconData = {
      down: isDown,
      color: idx > prevIdx ? 'error' : isEqualScore
    }

    return { ...item, iconData, position: idx + 1 }
  })

  return data
}

export const parsePositions = (data: any[]) => {
  const currentPositions: Position[] = []
  const prevPositions: Position[] = []

  data.forEach((player) => {
    const name = player[1][0].player_name
    const team = player[1][0].team
    const currentValue = Number(player[1][player[1].length - 1]?.score || 0)
    const prevValue = Number(player[1][player[1].length - 2]?.score || 0)
    const prev = { id: player[0], name, team, score: prevValue, position: 0 }
    const current = {
      id: player[0],
      name,
      team,
      position: 0,
      score: currentValue
    }
    prevPositions.push(prev)
    currentPositions.push(current)
  })

  prevPositions.sort((a, b) => (a.score > b.score ? -1 : 1))
  currentPositions.sort((a, b) => (a.score > b.score ? -1 : 1))

  return getStatusIconData(prevPositions, currentPositions)
}

export const parseName = (str: string) => {
  const parts = str.split(' ')
  const name = parts[0]
  const rest = parts.slice(1).map((word) => {
    if (parts.length > 1) {
      return word.charAt(0)
    } else {
      return word.substring(0, 2)
    }
  })

  const result = name + ' ' + rest.join('')
  return result.substring(0, 17)
}
