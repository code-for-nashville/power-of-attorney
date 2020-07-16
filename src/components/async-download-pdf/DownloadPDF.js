// @flow
import React, {Component} from 'react'

import {Box, Button, Header} from 'grommet'

import type {FormInputs} from '../../types'
import HiddenPDF from '../../pdf/pdf-document'

import './style.css'

type DownloadPDFProps = {
  data: FormInputs
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
