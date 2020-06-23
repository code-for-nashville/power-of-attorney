// @flow
const {REACT_APP_MOCK_FORM, REACT_APP_FORM_STEP} = process.env

const emptyAddress = {
  name: '',
  street_address: '',
  locality: '',
  region: 'TN',
  postal_code: ''
}
const MOCK_FORM = REACT_APP_MOCK_FORM === 'true'
const FORM_STEP = {
  number: REACT_APP_FORM_STEP ? parseInt(REACT_APP_FORM_STEP, 10) : 0,
  attempted: false
}

const mockedAddress = (name: string) => ({
  name,
  street_address: 'street_address',
  locality: 'locality',
  region: 'TN',
  postal_code: '11111'
})

export const defaultState = {
  acceptedModal: MOCK_FORM,
  step: FORM_STEP,
  numberOfChildren: 1,
  childrenNames: MOCK_FORM ? ['child'] : [],
  submitted: MOCK_FORM,
  motherAddress: MOCK_FORM ? mockedAddress('mother') : emptyAddress,
  fatherAddress: MOCK_FORM ? mockedAddress('father') : emptyAddress,
  caregiverAddress: MOCK_FORM ? mockedAddress('caregiver') : emptyAddress,
  parentalStatus: MOCK_FORM ? 'bothParents' : '',
  parentalStatusReason: '',
  errors: {
    childrenNames: null,
    motherAddress: {
      name: null
    },
    fatherAddress: {
      name: null
    },
    caregiverAddress: {
      name: null
    },
    parentalStatus: null,
    parentalStatusReason: null
  }
}

export default defaultState
