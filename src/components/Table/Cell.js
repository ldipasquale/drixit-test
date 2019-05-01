import React from 'react'
import PropTypes from 'prop-types'

function TableCell({ children, style, widthMultiplier }) {
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

TableCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  widthMultiplier: PropTypes.number,
}

TableCell.defaultProps = {
  children: null,
  style: {},
  widthMultiplier: -1,
}

export default React.memo(TableCell)
