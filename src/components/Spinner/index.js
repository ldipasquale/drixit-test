import React from 'react'
import Loader from 'react-loader-spinner'

import './styles.sass'

export default function () {
  return (
    <div className="drixit__Spinner">
      <Loader
        type="Puff"
        color="#7ed9d2"
        height="72"
        width="72"
      />
    </div>
  )
}
