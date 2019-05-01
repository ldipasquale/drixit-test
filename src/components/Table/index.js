import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Header, { DIRECTION_NONE, DIRECTION_ASC, DIRECTION_DESC } from './Header'
import Body from './Body'

import './styles.sass'

const sortRowsByDirection = {
  [DIRECTION_ASC]: (rows, column) => [...rows].sort((a, b) => (a[column] > b[column] ? -1 : 1)),
  [DIRECTION_DESC]: (rows, column) => [...rows].sort((a, b) => (a[column] < b[column] ? -1 : 1)),
}

class Table extends React.PureComponent {
  static getSortRows(direction) {
  }


  constructor(props) {
    super(props)

    this.state = {
      sortedRows: props.rows,
      selectedRows: [],
      sorting: {},
    }

    this.handleSort = this.handleSort.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
  }

  handleSort(newSorting) {
    const { rows } = this.props

    return this.setState({
      sorting: newSorting,
      sortedRows: newSorting.direction === DIRECTION_NONE
        ? rows
        : sortRowsByDirection[newSorting.direction](rows, newSorting.id),
    })
  }

  handleSelectRow(rowId, wasSelected) {
    const { onChangeSelection, rows } = this.props
    const { selectedRows } = this.state

    const newSelectedRows = wasSelected
      ? selectedRows.filter(selectedRowId => selectedRowId !== rowId)
      : selectedRows.concat(rowId)

    const newSelection = newSelectedRows.length === 0
      ? rows
      : rows.filter(row => newSelectedRows.includes(row.id))

    return this.setState({
      selectedRows: newSelectedRows,
    }, () => onChangeSelection(newSelection))
  }

  render() {
    const { columns, className } = this.props
    const { selectedRows, sortedRows, sorting } = this.state

    return (
      <div
        className={cx({
          drixit__Table: true,
          [className]: className !== null,
        })}
      >
        <Header
          columns={columns}
          sorting={sorting}
          onSort={this.handleSort}
        />

        <Body
          columns={columns}
          rows={sortedRows}
          onSelectRow={this.handleSelectRow}
          selectedRows={selectedRows}
        />
      </div>
    )
  }
}

Table.propTypes = {
  columns: Header.propTypes.columns,
  rows: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line react/forbid-prop-types
  onChangeSelection: PropTypes.func.isRequired,
  className: PropTypes.string,
}

Table.defaultProps = {
  columns: {},
  rows: [],
  className: null,
}

export default Table
