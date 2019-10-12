// @flow
import React, {Component} from 'react'

import {Box, Button, Header} from 'grommet'

import pdfFonts from 'pdfmake/build/vfs_fonts'
import pdfMake from 'pdfmake/build/pdfmake'
import type {FormInputs} from '../../types'
import HiddenPDF from '../../pdf/pdf-document'

import './style.css'

type DownloadPDFProps = {
  data: FormInputs
}

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

export default class DownloadPDF extends Component<DownloadPDFProps> {
  _downloadPDF = () => {
    HiddenPDF.downloadPDF()
  }
  viewPDF = () => {
    HiddenPDF.viewPDF()
  }

  render() {
    const {data} = this.props
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
            onClick={this.viewPDF}
            label="Open"
          />
          <Button
            className="download-btn"
            onClick={this._downloadPDF}
            label="Download"
          />
          <hr />
        </Box>
        <HiddenPDF data={data} />
      </Header>
    )
  }
}
