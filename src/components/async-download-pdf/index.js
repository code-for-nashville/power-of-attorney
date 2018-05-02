import React from 'react';
import { asyncComponent } from 'react-async-component';

import {
  Spinning,
  Toast
} from 'grommet';
import { translate } from 'react-i18next';

const ErrorNotification = ({ t }) => (
  <Toast status='critical'>
    {t('unknownError')}
  </Toast>
);

/*
We use PDFMake, a fantastic library for generating client side PDFS

The downside is that it is about 500kb (about half the size of our app
when we split this up). This wraps the DownloadPDF component that uses
PDFMake so that it only loads after the user enters the PDF generation
screen.
*/
export default asyncComponent({
  ErrorComponent: translate()(ErrorNotification),
  LoadingComponent: Spinning,
  name: 'AsyncDownloadPDF',
  resolve: () => import('./DownloadPDF')
})
