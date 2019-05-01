import React from 'react'

import Header from 'components/Header'
import Table from 'components/Table'

import PlayersService from 'services/Players'

const players = PlayersService.get()

function Home() {
  const columns = [
    { id: 'name', name: '' },
    { id: 'acc6%', name: '% de Tiempo<br />Ac 6', style: { textAlign: 'center' } },
    { id: 'acc6', name: 'Acc B6 Total<br />Eff #', style: { textAlign: 'center' } },
    { id: 'acc7%', name: '% de Tiempo<br />Ac 7', style: { textAlign: 'center' } },
    { id: 'acc7', name: 'Acc B7 Total<br />Eff #', style: { textAlign: 'center' } },
    { id: 'acc8%', name: '% de Tiempo<br />Ac 8', style: { textAlign: 'center' } },
    { id: 'acc8', name: 'Acc B8 Total<br />Eff #', style: { textAlign: 'center' } },
  ]

  return (
    <div className="drixit__Home">
      <Header
        onDownloadCSV={console.log}
        onDownloadPDF={console.log}
      />

      <Table
        columns={columns}
        rows={players}
        onChangeSelection={console.log}
      />
    </div>
  )
}

export default React.memo(Home)
