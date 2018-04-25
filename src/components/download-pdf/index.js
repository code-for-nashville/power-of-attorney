import React, { Component } from 'react';

import {
  Box,
  Button,
  Header
} from 'grommet';

import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

import createDocDefinition from '../../pdf/pdf-document'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class DownloadPDF extends Component {

  _downloadPDF = (name) => {
    const docDefinition = createDocDefinition(this.props.data);
    pdfMake.createPdf(docDefinition).download();
  }

  render() {
    return (
      <Header>
        <Box flex={true}
          className='download-container'
          justify='end'
          direction='row'
          responsive={true}
          align='center'
        >
          <div>
            <h3>Download Power of Attorney PDF</h3>
            <Button
              className='download-btn'
              onClick={() => this._downloadPDF(childName)}
              label='Download'
            />
            <hr />
          </div>
        </Box>
      </Header>
    );
  }
};
