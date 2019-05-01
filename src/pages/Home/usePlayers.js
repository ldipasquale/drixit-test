import { useState, useEffect } from 'react'

import PlayersService from 'services/Players'

export default function useParagraph() {
  const [players, setPlayers] = useState('')
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await PlayersService.get()
      setPlayers(data)
      setSelectedPlayers(data)
      setIsFetching(false)
    }

    fetchData()
  }, [])

  return [players, isFetching, selectedPlayers, setSelectedPlayers]
}
