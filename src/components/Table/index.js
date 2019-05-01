import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Row from './Row'
import Body from './Body'

import './styles.sass'

class Table extends React.PureComponent {
  static mapColumnToName(column) {
    return column.name
  }

  constructor(props) {
    super(props)

    this.state = {
      rows: props.rows.map((row, rowIndex) => ({
        id: rowIndex,
        ...row,
      })),
      selectedRows: [],
    }

    this.handleSelectRow = this.handleSelectRow.bind(this)
  }

  handleSelectRow(rowId, wasSelected) {
    const { onChangeSelection } = this.props
    const { selectedRows, rows } = this.state

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
    const { selectedRows, rows } = this.state

    return (
      <div
        className={cx({
          drixit__Table: true,
          [className]: className !== null,
        })}
      >
        <Row
          columns={columns}
          className="drixit__Table__Header"
          mapRowToValue={Table.mapColumnToName}
        />

        <Body
          columns={columns}
          rows={rows}
          onSelectRow={this.handleSelectRow}
          selectedRows={selectedRows}
        />
      </div>
    )
  }
}

Table.propTypes = {
  columns: Row.propTypes.columns,
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
