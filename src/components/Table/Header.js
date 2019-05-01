import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Row from './Row'

const DIRECTION_NONE = 'NONE'
const DIRECTION_ASC = 'ASC'
const DIRECTION_DESC = 'DESC'

const nextDirections = {
  [DIRECTION_NONE]: DIRECTION_ASC,
  [DIRECTION_ASC]: DIRECTION_DESC,
  [DIRECTION_DESC]: DIRECTION_NONE,
}

class TableHeader extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleSort = this.handleSort.bind(this)
    this.renderCell = this.renderCell.bind(this)
  }

  handleSort({ currentTarget }) {
    const { sorting, onSort } = this.props
    const columnId = currentTarget.dataset.id

    return onSort({
      id: columnId,
      direction: sorting.id === columnId
        ? nextDirections[sorting.direction]
        : nextDirections[DIRECTION_NONE],
    })
  }

  renderCell(column) {
    const { sorting } = this.props

    if (column.disableSorting) {
      return null
    }

    const isSorted = sorting.id === column.id

    return (
      <div
        className="drixit__Table__Header__Cell"
        data-id={column.id}
        onClick={this.handleSort}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: column.name,
          }}
        />

        <div className="drixit__Table__Header__Cell__Sorting">
          <div
            className={cx({
              drixit__Table__Header__Cell__Sorting__Icon: true,
              'drixit__Table__Header__Cell__Sorting__Icon--asc': true,
              'drixit__Table__Header__Cell__Sorting__Icon--selected': isSorted && sorting.direction === DIRECTION_ASC,
            })}
          />

          <div
            className={cx({
              drixit__Table__Header__Cell__Sorting__Icon: true,
              'drixit__Table__Header__Cell__Sorting__Icon--desc': true,
              'drixit__Table__Header__Cell__Sorting__Icon--selected': isSorted && sorting.direction === DIRECTION_DESC,
            })}
          />
        </div>
      </div>
    )
  }

  render() {
    const { columns, sorting } = this.props

    return (
      <Row
        columns={columns}
        className="drixit__Table__Header"
        renderCell={this.renderCell}
        data={sorting}
      />
    )
  }
}

TableHeader.propTypes = {
  columns: Row.propTypes.columns,
  onSort: PropTypes.func.isRequired,
  sorting: PropTypes.shape({
    id: PropTypes.string,
    direction: PropTypes.oneOf([DIRECTION_NONE, DIRECTION_ASC, DIRECTION_DESC]),
  }),
}

TableHeader.defaultProps = {
  columns: {},
  sorting: {},
}

export {
  DIRECTION_NONE,
  DIRECTION_ASC,
  DIRECTION_DESC,
}

export default TableHeader
