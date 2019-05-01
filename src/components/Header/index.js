import React from 'react'
import PropTypes from 'prop-types'

import './styles.sass'

function Header({ onDownloadCSV, onDownloadPDF }) {
  return (
    <div className="drixit__Header">
      <img
        className="drixit__Header__Icon"
        src="/public/csv.png"
        alt="Download CSV"
        onClick={onDownloadCSV}
      />

      <img
        className="drixit__Header__Icon"
        src="/public/pdf.png"
        alt="Download PDF"
        onClick={onDownloadPDF}
      />
    </div>
  )
}

Header.propTypes = {
  onDownloadCSV: PropTypes.func.isRequired,
  onDownloadPDF: PropTypes.func.isRequired,
}

export default React.memo(Header)
