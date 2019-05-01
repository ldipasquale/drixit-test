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
    const { enableSelection, isSelected, id } = this.props

    return (
      <div className="drixit__Table__Row__SelectionCell">
        {enableSelection && (
          <React.Fragment>
            <input
              className="drixit__Table__Row__SelectionCell__Control"
              id={`select${id}`}
              type="checkbox"
              checked={isSelected}
            />
          </React.Fragment>
        )}
      </div>
    )
  }

  render() {
    const { columns, isSelected, className, enableSelection } = this.props

    return (
      <div
        className={cx({
          drixit__Table__Row: true,
          'drixit__Table__Row--selected': isSelected,
          [className]: className !== null,
        })}
        {
          ...enableSelection && {
            onClick: this.handleSelect,
          }
        }
      >
        {this.renderSelection()}

        {columns.map(this.renderCell)}
      </div>
    )
  }
}

TableRow.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  })).isRequired,
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
  mapRowToValue: (column, data) => {
    const value = data[column.id]

    return column.format
      ? column.format(value, data)
      : value
  },
}

export default TableRow
