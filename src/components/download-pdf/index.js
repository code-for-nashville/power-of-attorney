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

import { FAQ_PATH, HOME_PATH } from '../../paths';
import createDocDefinition from '../../pdf/pdf-document'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default class DownloadPDF extends Component {

  _downloadPDF = (name) => {
      const docDefinition = createDocDefinition(this.props.data)
      this.props.data.childrenNames.forEach(name => {
        pdfMake.createPdf(docDefinition).download();
      });
  }

  render() {
    return (
      <Header>
        <Box flex={true}
          justify='end'
          direction='row'
          responsive={false}
        >
          {this.props.data.childrenNames.map((childName) => {
            return (
              <Button
                onClick={() => this._downloadPDF(childName)}
              />
            )
          })}
        </Box>
      </Header>
    );
  }
};
