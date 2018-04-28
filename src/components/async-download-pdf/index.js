import React from 'react';
import { asyncComponent } from 'react-async-component';

import {
  Spinning,
  Toast
} from 'grommet';

const ErrorNotification = (
  <Toast status='critical'>
    An unknown error that occured - please refresh the page and try again.
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
  ErrorComponent: ErrorNotification,
  LoadingComponent: Spinning,
  name: 'AsyncDownloadPDF',
  resolve: () => import('./DownloadPDF')
})
