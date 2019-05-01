import React from 'react'

import Spinner from 'components/Spinner'
import Header from 'components/Header'
import Chart from 'components/Chart'
import Table from 'components/Table'

import { tableColumns, chartBars } from './constants'
import usePlayers from './usePlayers'

import './styles.sass'

function Home() {
  const [players, isFetchingPlayers, selectedPlayers, setSelectedPlayers] = usePlayers()

  if (isFetchingPlayers) {
    return (
      <Spinner />
    )
  }

  return (
    <div className="drixit__Home">
      <Header
        onDownloadCSV={() => null}
        onDownloadPDF={() => null}
      />

      <Chart
        className="drixit__Home__Chart"
        maxPointsAmount={players.length}
        points={selectedPlayers}
        bars={chartBars}
      />

      <Table
        className="drixit__Home__Table"
        columns={tableColumns}
        rows={players}
        onChangeSelection={setSelectedPlayers}
      />
    </div>
  )
}

export default React.memo(Home)
