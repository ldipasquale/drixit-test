import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Row from './Row'

class TableBody extends React.PureComponent {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(row) {
    const { columns, selectedRows, onSelectRow } = this.props

    const rowId = row.id

    return (
      <Row
        key={rowId}
        id={rowId}
        columns={columns}
        data={row}
        enableSelection
        isSelected={selectedRows.includes(rowId)}
        onSelect={onSelectRow}
      />
    )
  }

  render() {
    const { rows } = this.props

    return (
      <div className="drixit__Table__Body">
        {rows.map(this.renderRow)}
      </div>
    )
  }
}

TableBody.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  enableSelection: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  data: PropTypes.object,
  mapRowToValue: PropTypes.func,
}

TableBody.defaultProps = {
  className: null,
  index: -1,
  enableSelection: false,
  isSelected: false,
  onSelect: null,
  data: null,
  mapRowToValue: (column, data) => data[column.id],
}

export default TableBody
