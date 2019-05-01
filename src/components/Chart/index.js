import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { ResponsiveContainer, BarChart, Legend, Bar, XAxis } from 'recharts'

import './styles.sass'

const BAR_SIZE = 16
const MAX_BAR_SIZE = 32

class Chart extends React.PureComponent {
  static renderBar({ id, name, description, color }) {
    return (
      <Bar
        dataKey={id}
        name={name}
        description={description}
        fill={color}
        label={{ position: 'top', marginTop: '20' }}
      />
    )
  }

  static renderLegendItem(value, { payload }) {
    return (
      <div className="drixit__Chart__Legend__Item">
        <div className="drixit__Chart__Legend__Item__Name">{value}</div>
        <div className="drixit__Chart__Legend__Item__Description">{payload.description}</div>
      </div>
    )
  }

  constructor(props) {
    super(props)

    this.calculateBarSize = this.calculateBarSize.bind(this)
  }

  calculateBarSize() {
    const { maxPointsAmount, points } = this.props

    const ratio = maxPointsAmount / points.length
    const currentBarSize = ratio * BAR_SIZE

    return currentBarSize > MAX_BAR_SIZE
      ? MAX_BAR_SIZE
      : currentBarSize
  }

  render() {
    const { points, bars, className } = this.props

    return (
      <div
        className={cx({
          drixit__Chart: true,
          [className]: className !== null,
        })}
      >
        <ResponsiveContainer>
          <BarChart data={points} barSize={this.calculateBarSize()}>
            <XAxis
              dy={20}
              dataKey="name"
              angle={-30}
              tickLine={false}
              height={60}
            />

            {bars.map(Chart.renderBar)}

            <Legend
              iconSize={30}
              iconType="square"
              chartHeight={48}
              formatter={Chart.renderLegendItem}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

Chart.propTypes = {
  className: PropTypes.string,
  maxPointsAmount: PropTypes.number,
  points: PropTypes.arrayOf(PropTypes.object).isRequired,
  bars: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
}

Chart.defaultProps = {
  className: null,
  maxPointsAmount: -1,
}

export default Chart
