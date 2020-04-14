import React from 'react'
import ReactDOM from 'react-dom'

import html2pdf from 'html2pdf.js'

export default (Blank, opt = {}, props = {}) => {
    const rootEl = document.createElement('div')
    const offsetY = window.pageYOffset

    ReactDOM.render(
      <Blank {...props}/>,
      rootEl,
    )

    html2pdf()
      .set({
        ...opt, 
        html2canvas: { 
          y: offsetY
        }
      })
      .from(rootEl)
      .to('canvas')
      .save()
  }
