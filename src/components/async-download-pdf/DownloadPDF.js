import React, {Component} from 'react'

import {Box, Button, Header} from 'grommet'

import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'

import createDocDefinition from '../../pdf/pdf-document'

import './style.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs

pdfMake.tableLayouts = {
  underlineLayout: {
    hLineWidth: function(i, node) {
      if (i === 0) {
        return 0
      }
      return 1
    },
    vLineWidth: function(i) {
      return 0
    },
    hLineColor: function(i) {
      return 'black'
    },
    paddingLeft: function(i) {
      return 0
    },
    paddingRight: function(i, node) {
      return 0
    }
  }
}

export default class DownloadPDF extends Component {
  _downloadPDF = () => {
    const docDefinition = createDocDefinition(this.props.data)
    pdfMake.createPdf(docDefinition).download()
  }
  viewPDF = () => {
    const docDefinition = createDocDefinition(this.props.data)
    pdfMake.createPdf(docDefinition).open()
  }

  render() {
    return (
      <Header>
        <Box
          flex={true}
          className="download-container"
          responsive={true}
          align="center"
        >
          <h3>Form</h3>
          <Button
            className="download-btn"
            onClick={() => this.viewPDF()}
            label="Open"
          />
          <Button
            className="download-btn"
            onClick={() => this._downloadPDF()}
            label="Download"
          />
          <hr />
        </Box>
      </Header>
    )
  }
}
