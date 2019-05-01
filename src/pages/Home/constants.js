import numeral from 'numeral'

import { formats } from 'constants'

const metricsNumbers = [6, 7, 8]

const numberTableColumn = {
  style: { textAlign: 'center' },
  format: value => numeral(value).format(formats.NUMBER),
}

const percentageTableColumn = {
  style: { textAlign: 'center' },
  format: value => numeral(value / 100).format(formats.PERCENTAGE),
}

export const tableColumns = [
  {
    id: 'name',
    name: '',
  },
  {
    ...percentageTableColumn,
    id: 'acc6%',
    name: '% de Tiempo<br />Ac 6',
  },
  {
    ...numberTableColumn,
    id: 'acc6',
    name: 'Acc B6 Total<br />Eff #',
  },
  {
    ...percentageTableColumn,
    id: 'acc7%',
    name: '% de Tiempo<br />Ac 7',
  },
  {
    ...numberTableColumn,
    id: 'acc7',
    name: 'Acc B7 Total<br />Eff #',
  },
  {
    ...percentageTableColumn,
    id: 'acc8%',
    name: '% de Tiempo<br />Ac 8',
  },
  {
    ...numberTableColumn,
    id: 'acc8',
    name: 'Acc B8 Total<br />Eff #',
  },
  {
    ...percentageTableColumn,
    id: 'summary',
    name: 'Promedio',
    format(value, row) {
      const totalAmount = metricsNumbers.reduce((accumulator, number) => {
        const percentage = row[`acc${number}%`]
        const amount = row[`acc${number}`]

        if (percentage === 0 || amount === 0) {
          return accumulator
        }

        return accumulator + (amount / percentage * 100)
      }, 0)

      const effectiveAmount = metricsNumbers.reduce((accumulator, number) => accumulator + row[`acc${number}`], 0)

      return numeral(effectiveAmount / totalAmount).format(formats.PERCENTAGE)
    },
  },
]

export const chartBars = [
  {
    id: 'bar1',
    name: 'Aceleración Baja Int.',
    description: '1 a 2 m/s2',
    color: '#234561',
  },
  {
    id: 'bar2',
    name: 'Aceleración Media Int.',
    description: '2 a 3 m/s2',
    color: '#7ed9d2',
  },
  {
    id: 'bar3',
    name: 'Aceleración Alta Int.',
    description: '+3 m/s2',
    color: '#ba62b9',
  },
]
