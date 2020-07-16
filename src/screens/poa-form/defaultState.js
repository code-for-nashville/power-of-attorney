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
  initialCaregiverAddress: MOCK_FORM
    ? mockedAddress('initialCaregiver')
    : emptyAddress,
  successorCaregiverAddress: MOCK_FORM
    ? mockedAddress('successorCaregiver')
    : emptyAddress,
  initialCaregiverRelationship: MOCK_FORM ? 'friend' : '',
  initialCaregiverPhoneNumber: MOCK_FORM ? '555-555-5555' : '',
  successorCaregiverRelationship: MOCK_FORM ? 'friend' : '',
  successorCaregiverPhoneNumber: MOCK_FORM ? '555-555-5555' : '',
  consentInitials: MOCK_FORM ? ['XX', 'XX'] : ['', ''],
  parentalStatus: MOCK_FORM ? 'bothParents' : '',
  parentalStatusReason: '',
  condition: '',
  hardships: [],
  describeHardship: '',
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
    parentalStatusReason: null,
    conditionError: null,
    hardshipsError: null
  }
}

export default defaultState
