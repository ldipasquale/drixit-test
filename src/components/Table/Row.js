import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Cell from './Cell'

class TableRow extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
    this.renderCell = this.renderCell.bind(this)
    this.renderSelection = this.renderSelection.bind(this)
  }

  handleSelect() {
    const { id, isSelected, onSelect } = this.props

    return onSelect(id, isSelected)
  }

  renderCell(column) {
    const { data, mapRowToValue } = this.props

    return (
      <Cell
        key={column.id}
        widthMultiplier={column.widthMultiplier}
        style={column.style}
      >
        {mapRowToValue(column, data)}
      </Cell>
    )
  }

  renderSelection() {
    const { enableSelection, isSelected } = this.props

    return (
      <div className="drixit__Table__Row__SelectionCell">
        {enableSelection && (
          <input
            type="checkbox"
            selected={isSelected}
            onClick={this.handleSelect}
          />
        )}
      </div>
    )
  }

  render() {
    const { columns, isSelected, className } = this.props

    return (
      <div
        className={cx({
          drixit__Table__Row: true,
          'drixit__Table__Row--selected': isSelected,
          [className]: className !== null,
        })}
      >
        {this.renderSelection()}

        {columns.map(this.renderCell)}
      </div>
    )
  }
}

TableRow.propTypes = {
  columns: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  }).isRequired,
  className: PropTypes.string,
  enableSelection: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.number,
  mapRowToValue: PropTypes.func,
}

TableRow.defaultProps = {
  className: null,
  enableSelection: false,
  isSelected: false,
  onSelect: null,
  data: null,
  id: -1,
  mapRowToValue: (column, data) => data[column.id],
}

export default TableRow
