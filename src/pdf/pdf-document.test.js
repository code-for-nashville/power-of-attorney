import createDocDefinition, {
  CAREGIVER_ADDRESS,
  FATHER_ADDRESS,
  MOTHER_ADDRESS
} from './pdf-document';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import fs from 'fs';
import { PARENTAL_STATUS_LIVING } from '../constants';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Test that it basically works. This is also handy to make changes the PDF and
// quickly see what it looks like.
it('renders with all the fields', done => {
  const definition = createDocDefinition({
    parentalStatus: PARENTAL_STATUS_LIVING,
    childrenNames: ['Max Shenfield'],
    [MOTHER_ADDRESS]: {
      name: 'Mother Collins',
      street_address: '1010 100 St.',
      locality: 'Nashville',
      region: 'TN',
      postal_code: '37281'
    },
    [FATHER_ADDRESS]: {
      name: 'Father Shenfield',
      street_address: '1010 100 St.',
      locality: 'Nashville',
      region: 'TN',
      postal_code: '37281'
    },
    [CAREGIVER_ADDRESS]: {
      name: 'Caregiver',
      street_address: '8324 100 St.',
      locality: 'Nashville',
      region: 'TN',
      postal_code: '37211'
    }
  })
  pdfMake.createPdf(definition).getBuffer(buffer => {
      fs.writeFileSync('pdf-document-test.pdf', buffer);
      done();
  });
});
