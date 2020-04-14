import React from 'react'
import ReactDOM from 'react-dom'

import html2pdf from 'html2pdf.js'

export default (Blank, opt = {}, props = {}) => {
    const rootEl = document.createElement('div')

    document.body.appendChild(rootEl)

    ReactDOM.render(
      <Blank {...props}/>,
      rootEl,
    )

    html2pdf().from(rootEl).set(opt).save().then(res => {
      rootEl.remove()
    })
  }
