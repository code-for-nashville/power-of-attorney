import React, { Component } from 'react';

import {
  Anchor,
  Box,
  Button,
  Header,
  Menu
} from 'grommet';

import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

import createDocDefinition from '../../pdf/pdf-document'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class DownloadPDF extends Component {

  _downloadPDF = (name) => {
      const docDefinition = createDocDefinition(this.props.data);
      this.props.data.childrenNames.forEach((name) => {
        pdfMake.createPdf(docDefinition).download();
      });
  }

  render() {
    console.log("DOWLOAD_PDF COMPONENT", this.props.data);
    return (
      <Header>
        <Box flex={true}
          className='download-container'
          justify='end'
          direction='row'
          responsive={true}
          align='center'
        >
          {this.props.data.childrenNames.map((childName) => {
            return (
              <div>
                <h3>{childName}'s form</h3>
                <Button
                  className='download-btn'
                  onClick={() => this._downloadPDF(childName)}
                  label='Download'
                />
                <hr />
              </div>
            )
          })}
        </Box>
      </Header>
    );
  }
};
