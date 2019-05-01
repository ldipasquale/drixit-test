import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Row from './Row'

class TableBody extends React.PureComponent {
  constructor(props) {
    super(props)

    this.renderRow = this.renderRow.bind(this)
  }

  renderRow(row, rowIndex) {
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
        className={cx({
          'drixit__Table__Row--odd': rowIndex % 2 === 0,
        })}
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
  columns: Row.propTypes.columns,
  rows: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  onSelectRow: PropTypes.func.isRequired,
  selectedRows: PropTypes.arrayOf(PropTypes.number),
}

TableBody.defaultProps = {
  columns: {},
  rows: [],
  selectedRows: [],
}

export default TableBody
