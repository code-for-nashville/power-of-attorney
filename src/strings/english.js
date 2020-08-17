// @flow
const ENGLISH = {
  forTennessee: 'For Tennessee',
  immigrantParents: 'Immigrant Parents',
  ensureCare:
    'Ensure care of a minor in the case of deportation or detainment by granting power of attorney.',
  immigrant:
    'Immigrant parents face detention or deportation with little or no warning. In many cases, both parents are in the same location when detained or facing deportation. As a result, children of detained and/or deported parents are left with no legal guardian. Once detained or deported, parents are often inaccessible for days or weeks with little or no contact with their children or family. Parents facing detention or deportation can prepare, in advance, for the care of their minor children by granting a Power of Attorney. A Power of Attorney allows immigrant parents to grant permission to a trusted adult to care for their minor child in the event of detention or deportation.',
  gettingStarted:
    'Getting started is quick and easy with this online Power of Attorney form!',
  startForm: 'Start Form',
  childsFullName: "Child's Full name",
  pleaseAddStreet: 'Please add a street address.',
  name: 'Name',
  pleaseAddName: 'Please add a name.',
  streetAddress: 'Street Address',
  pleaseAddCity: 'Please add a city.',
  pleaseAddStreetAddress: 'Please add a street address',
  pleaseAddRelationship: 'Please add a caregiver relationship to children',
  pleaseAddPhoneNumber: 'Please add a phone number to the caregiver',
  pleaseAddInitials: 'Please add the initials of one parent to give consent',
  pleaseAddState: 'Please add a state.',
  city: 'City',
  state: 'State',
  pleaseAddZip: 'Please enter a 5 digit zip code.',
  zip: 'Zip Code',
  numberOfChildren: 'Number of children',
  minorName: "Minor Child's Name",
  pleaseAddChildName: 'Please add the name of each child.',
  motherName: 'Mother/Legal Guardian’s Name & Address',
  fatherName: 'Father/Legal Guardian’s Name & Address',
  initialCaregiverName: 'Initial Caregiver’s Name & Address',
  successorCaregiverName: 'Successor Caregiver’s Name & Address',
  parentalCustody: 'Parental Custody',
  pleaseAddParentalStatus: '(check the appropriate custody status)',
  pleaseAddReason: 'Please add a reason.',
  bothParents:
    'Both parents are living, have legal custody of the minor child/children, and have signed this document;',
  parentDeceased: 'One parent is deceased;',
  legalCustodySigned:
    'One parent has legal custody of the minor child/children, and both parents have signed this document and consent to the appointment of the caregiver(s);',
  legalCustodySent:
    'One parent has legal custody of the minor child/children, and s/he has sent by Certified Mail, Return Receipt requested, to the other parent at their last known address, a copy of this document and a notice of the provisions in T.C.A. § 34-6-305; or the non-custodial parent has not consented to the appointment and consent cannot be obtained because',
  legalCustodySentLink:
    'Click here for a copy of the text of T.C.A. § 34-6-305 (2017)',
  reasonNotReached: 'Reason non-custodial parent could not be reached:',
  condition: 'Condition',
  hardships: 'Hardships',
  effectiveImmediatly:
    'effective immediately upon signing this document, but with the intention that the caregiver(s) will only take charge of my/our child/children if and when one or more of the following type(s) of hardship may occur (check at least one below):',
  untilHardships:
    'only if and when one or more of the following type(s) of hardship may occur (check at least one below):',
  seriousIllness: 'the serious illness of a parent or legal guardian;',
  physicalOrMentalCondition:
    'the physical or mental condition of the parent or legal guardian or the child/children is such that care and supervision of the child/children cannot be provided;',
  uninhabitability:
    'the loss or uninhabitability of the child/children’s home as a result of a natural disaster or otherwise;',
  needTreatment:
    'the need for medical or mental health treatment (including substance abuse treatment) by the parent or legal guardian;',
  incarceration: 'the incarceration of a parent or legal guardian;',
  detention: 'the detention or deportation of a parent or guardian; and/or',
  describe: 'other',
  pleaseDescribe: '(please describe):',
  describeHardshipError: 'Description required',
  hardshipsError: 'Please select at least one',
  conditionError: 'Please select one',
  powerOfAttorney: 'POWER OF ATTORNEY FOR CARE OF A MINOR CHILD OR CHILDREN',
  childInformation: 'Child Information',
  guardianInformation: 'Guardian Information',
  caregiversInformation: 'Caregiver’s Information',
  submit: 'Submit',
  next: 'next',
  formWithErrors: 'The form has {{errorCount}} error(s)',
  faq: 'Frequently Asked Questions',
  whatIsPOA: 'What is a Power of Attorney?',
  poaIs:
    'A Power of Attorney is a legal document in which a parent authorizes another adult to care for their minor child. By signing a Power of Attorney, the parent does not give up any parental rights.',
  WhatIsThisFormUsedFor: 'What is this form used for?',
  formWasCreated:
    'This form was created for immigrant parents in Tennessee who face the threat of being detained and/or deported. It allows parents to grant a caregiver temporary rights to make decisions for their minor child on their behalf. The Power of Attorney goes into effect only if the parents have been detained or deported. Completion of this form, along with the proper signatures, authorizes the caregiver to enroll the child in school, obtain medical treatment for the child, and provide for the child’s food, housing, and travel.',
  formWasCreatedNote:
    'NOTE: Each child must have a separate Power of Attorney form.  You cannot use one form for all of your children.',
  whoShouldIChoose: 'Who should I choose as my caregiver?',
  yourCaregiver:
    'Your caregiver should be someone you trust. A caregiver must be at least 18 years old.  This document will allow the caregiver the right and responsibility to make decisions for your child on your behalf. The person you designate to care for your child should be a U.S. citizen or someone with immigration status who does not also face the threat of detention or deportation.',
  howCanITerminate: 'How can I terminate the Power of Attorney?',
  youCanTerminate:
    'You may terminate the Power of Attorney at any time by putting in writing your desire to do so.',
  whatDocuments: 'What documents do I need?',
  whatDocumentsAnswer:
    'Proof of parents’ ID and proof of ID for the assigned caregiver will be required to get the document notarized.  The document must be signed by all parties in front of a notary or two witnesses.  A notarized document is usually more effective, and it is highly suggested you notarize the document instead of just finding two witnesses.',
  howMuch: 'How much does a Power of Attorney Cost?',
  howMuchAnswer:
    'It is free of charge.  There may be a small fee due to the notary public for notarizing the document.',
  whereSendDocuments: 'Where do I need to send the documents?',
  whereSendDocumentsAnswer:
    'You should provide a copy of the Power of Attorney and the child’s birth certificate to the caregiver.  You may also want to provide a copy of the Power of Attorney to both the child’s school and medical providers.',
  whereCanILearn:
    'Where can I learn more about Power of Attorney for the care of a minor child?',
  lawCanBeFound: 'A copy of the Tennessee Code (T.C.A. 2017) can be found',
  here: 'here',
  privacy: 'Privacy and Confidentiality',
  doesNotTrack:
    'Your information and privacy is important to us.  This website does not track, keep or otherwise monitor the information inputted.',
  Home: 'Home',
  FAQ: 'FAQ',
  beforeStart: 'Before you start...',
  partI: 'Part I:',
  useOfThisForm:
    'This form is legal information, not legal advice. While this form in no way terminates your rights as a parent, it does provide a caregiver authority to care for your child(ren). If you are unsure of your rights or needs, you should consult an attorney to discuss your legal needs. This site does not track, save, or retain any information entered. If you leave this site before completing and downloading the form, you will need to start over. Use of this form is authorized by T.C.A. § 34-6-301 et seq. Completion of this form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and to authorize medical treatment. However, a school district may require additional documentation/information as permitted by this section of Tennessee law before enrolling a child in school or any extracurricular activities.',
  thisFormIsToBeFilled:
    'This form is to be filled out and initialed by parent(s)/legal guardian(s).',
  MORE_INFORMATION: 'MORE INFORMATION',
  I_UNDERSTAND: 'I UNDERSTAND',
  Form: 'Form',
  Open: 'Open',
  Download: 'Download',
  unknownError:
    'An unknown error that occured - please refresh the page and try again.',
  cuteBabyBoy: 'Cute baby boy looking up.',
  back: 'Back',
  relationship: 'Relationship',
  phoneNumber: 'Phone Number',
  initials: 'Parent Initials',
  serveJointlyAndSeveraly:
    'I/We wish for the named persons above to serve jointly and severally as caregivers, working together and/or serving independently as caregiver(s) as needed and appropriate.  The successor caregiver instead may wait to serve only once the initial caregiver is no longer able or willing to serve as caregiver.',
  temporaryAuthority: 'Temporary Authority',
  notProvideCustody: 'Does not Provide Custody',
  mayBeTerminated: 'Can Be Terminated',
  authorizations: 'Authorizations',
  iOrWeAuthorize:
    'I/We the undersigned, authorize the named caregiver to do one or more of the following:',
  enrollInSchoolAndExtracurriculars:
    'enroll the child/children in school and extracurricular activities (including but not limited to Boy Scouts, Boys & Girls Club, etc.)',
  obtainMedicalTreatment:
    'obtain medical, dental, and mental health treatment for the child/children',
  accessEducationalAndMedicalRecords:
    'access educational and medical records, per HIPAA rules, as needed',
  provideEssentials:
    'provide for the child/children’s food, lodging, housing, recreation, and travel',
  obtainPassport: 'obtain a passport for the child/children',
  travelAlone: 'travel alone with the child/children within the United States',
  makeTravelArrangements:
    'to make travel arrangements for the child/children to travel outside the United States, together with the caregiver or on their own, for the SOLE purpose of being reunited with me/us in our country of residence',
  additionalPowers: 'exercise additional power(s) as described below',
  additionalPowersError: 'Please describe the additional powers',
  acknowledgements: 'Acknowledgements',
  notProvidingLegalCustody:
    'I/We understand that this document does not provide legal custody to the caregiver.  If at any time I/we disagree with a decision of the named caregiver or choose to regain or take back caregiving duties from the named person(s), including making healthcare or educational decisions for my/our child/children, I/we must revoke the power of attorney, in writing, and provide written documentation to the health care provider and the local education agency (i.e., school).',
  documentMayBeTerminated:
    'I/We understand that this document may be terminated in another written document signed by either parent with legal custody or by any order of a court with competent jurisdiction.',
  iOrWeUnderstand: 'I/We understand',
  iOrWeDoNotUnderstand: 'I/We do not understand',
  acknowledgementsError:
    'Please read and acknowledge that you understand the above'
}

export type TranslateStringsType = typeof ENGLISH

export default ENGLISH
