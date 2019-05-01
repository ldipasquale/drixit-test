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
        ...row,
        id: rowIndex,
      })),
      selectedRows: [],
    }

    this.handleSelectRow = this.handleSelectRow.bind(this)
  }

  handleSelectRow(rowId, wasSelected) {
    const { onChangeSelection } = this.props
    const { selectedRows, rows } = this.state

    const newSelectedRows = wasSelected
      ? selectedRows.filter(row => row.id !== rowId)
      : selectedRows.concat(rowId)

    return this.setState({
      selectedRows: newSelectedRows
    }, () => onChangeSelection(rows.filter(row => newSelectedRows.includes(row.id))))
  }

  render() {
    const { columns } = this.props
    const { selectedRows, rows } = this.state

    return (
      <div className="drixit__Table">
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
}

export default Table
