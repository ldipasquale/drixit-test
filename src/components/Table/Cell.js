import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import Cell from './Cell'

class TableCell extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { children, style, widthMultiplier } = this.props

    return (
      <div
        className="drixit__Table__Row__Cell"
        style={{
          ...style,
          ...widthMultiplier && {
            flex: widthMultiplier,
          },
        }}
        dangerouslySetInnerHTML={{
          __html: children,
        }}
      />
    )
  }
}

TableCell.propTypes = {
  children: PropTypes.string,
  style: PropTypes.object,
  widthMultiplier: PropTypes.number,
}

TableCell.defaultProps = {
  children: null,
  style: {},
  widthMultiplier: -1,
}

export default TableCell
