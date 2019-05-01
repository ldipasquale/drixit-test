import React, { useState } from 'react'

import Header from 'components/Header'
import Chart from 'components/Chart'
import Table from 'components/Table'

import PlayersService from 'services/Players'

import { tableColumns, chartBars } from './constants'

import './styles.sass'

const originalPlayers = PlayersService.get()

function Home() {
  const [players, setPlayers] = useState(originalPlayers)

  return (
    <div className="drixit__Home">
      <Header
        onDownloadCSV={console.log}
        onDownloadPDF={console.log}
      />

      <Chart
        className="drixit__Home__Chart"
        maxPointsAmount={originalPlayers.length}
        points={players}
        bars={chartBars}
      />

      <Table
        className="drixit__Home__Table"
        columns={tableColumns}
        rows={players}
        onChangeSelection={setPlayers}
      />
    </div>
  )
}

export default React.memo(Home)
