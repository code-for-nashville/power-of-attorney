export type FormInputs = {
  childrenNames: Array<string>,
  parentalStatus: string,
  parentalStatusReason: string,
  motherAddress: {[AddressKeysType]: string},
  fatherAddress: {[AddressKeysType]: string},
  caregiverAddress: {[AddressKeysType]: string}
}
