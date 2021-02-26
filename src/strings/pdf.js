// @flow

const PDF_STRINGS = {
  instructions: 'Instructions for Completing Power of Attorney Form',
  printInstructions:
    'Print two original copies (one for the caregiver, one for the parent(s)/legal guardian) of these documents and wait to sign both copies until you are in front of a notary public or two witnesses.',
  bothCopiesCaregiver:
    'For both original copies: have the caregiver write their initials in Part II (Questions 10 – 14).',
  bothInitials:
    'For both original copies: have the parent(s)/legal guardian(s) and the caregiver write their initials Part III (Question 15).',
  bothCopiesParent:
    'For both original copies: have the parent(s)/legal guardian(s) and the caregiver sign the document in front a notary or two witnesses.',
  originalCopyCaregiver:
    'Give one original signed copy to the caregiver to keep in a secure location.  You may also want to provide the caregiver with a copy of the child’s birth certificate, school information and doctor’s information.',
  originalCopyYou:
    'Keep the other original signed copy of the document for yourself in a safe place.',
  originalCopyThirdParty:
    "Consider giving a copy to your child’s school and a copy to your child's doctor.",
  revoke:
    'You may revoke this power of attorney in writing at any time.  If you revoke the power of attorney, provide a copy of the written revocation to the caregiver(s) and any agency or person who has received a copy of the power of attorney so that they are on notice that it has been revoked.',
  instructionsEsp:
    'Instrucciones para completar La Forma de Poder Notarial Para El Cuidado De Un Menor',
  printInstructionsEsp:
    'Imprima dos copias originales de estos documentos (una copia para el cuidador y otra para el/los padre(s) custodia legal) y fírme las dos copias solamente cuando este usted cara a cara con un notario público o, alternativamente, dos testigos.',
  bothCopiesCaregiverEsp:
    'Para las dos copias originales: el cuidador deberá escribir sus iniciales en Parte II (Preguntas 10 - 14).',
  bothInitialsEsp:
    'Para las dos copias originales: el/los padre(s)/custodia legal y el cuidador deberán escribir sus iniciales en Parte III (Pregunta 15).',
  bothCopiesParentEsp:
    'Para las dos copias originales: el/los padre(s)/custodia legal y el cuidador deberán firmar el documento cuando estén cara a cara con un notario público o, alternativamente, dos testigos.',
  originalCopyCaregiverEsp:
    'Dele una copia original firmada al guardián para almacenar en un sitio seguro. Quizá querrá darle al guardián una copia de la acta de nacimiento del menor, información de su escuela, e información del médico.',
  originalCopyYouEsp:
    'Mantenga la otra copia original firmada para usted en un sitio seguro.',
  originalCopyThirdPartyEsp:
    'Considere darle una copia a la escuela y al médico del menor.',
  revokeEsp:
    'Usted puede revocar por escrito este poder notarial en cualquier momento. Si usted revoca el poder notarial, dele una copia de la revocación escrita a el/los guardián(es) y a cualquier agencia o persona que ha recibido una copia del poder notarial para que estén informados que se ha revocado.',
  poaTitle: 'POWER OF ATTORNEY FOR CARE OF A MINOR CHILD or children',
  useOfThisForm:
    'Use of this form is authorized by T.C.A. § 34-6-301 et seq. Completion of this form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and to authorize medical treatment. However, a school district may require additional documentation/information as permitted by this section of Tennessee law before enrolling a child/children in school or any extracurricular activities. Please print clearly.  The form is to be filled out and/or initialed by parent(s)/legal guardian(s).',
  pleasePrintClearly: 'Please print clearly.',
  filledOut:
    'To be filled out and/or initialed by parent(s)/legal guardian(s).',
  minorChildName: 'Minor Child’s full name',
  motherAddress: 'Mother/Legal Guardian’s Full Name',
  fatherAddress: 'Father/Legal Guardian’s Full Name',
  address: 'Address',
  initalCaregiverAddress:
    'Initial Caregiver’s Full Name, Relationship, Address, & Phone',
  successorCaregiverAddress:
    'Successor Caregiver’s Full Name, Relationship, Address, & Phone',
  parentalCustody: 'Parental Custody (check the appropriate custody status)',
  bothLiving:
    'Both parents are living, have legal custody of the minor child and have signed this document;',
  or: 'OR',
  legalCustodyExample: '(e.g., imprisonment, whereabouts unknown).',
  oneParentLegalCustodyBothSigned:
    'One parent has legal custody of the minor child and both parents have signed this document and consent to the appointment of the caregiver;',
  oneParentLegalCustodyMail:
    'One parent has legal custody of the minor child, and has sent by Certified Mail, Return Receipt requested, to the other parent at last known address, a copy of this document and a notice of the provisions in § 34-6 - 305; or the non-custodial parent has not consented to the appointment and consent cannot be obtained because',
  temporaryAuthority:
    'Temporary care-giving authority regarding the minor child is being given to the caregiver because of the following type of hardship',
  illnessOrIncarceration: 'the serious illness of a parent or legal guardian;',
  physicalOrMentalCondition:
    'the physical or mental condition of the parent or legal guardian or the child is such that care and supervision of the child cannot be provided;',
  lossOfHome:
    'the loss or uninhabitability of the child’s home as a result of a natural disaster;',
  needForTreatment:
    'the need for medical or mental health treatment (including substance abuse treatment) by the parent or legal guardian;',
  parentIncarceration: 'the incarceration of a parent or legal guardian;',
  detentionDeportation:
    'the detention or deportation of a parent or guardian; and/or',
  other: 'other (please describe)',
  custodialParentDetained:
    'Custodial parent(s) has/have been detained by immigration authorities and/or are involved in an immigration proceeding/ deportation.',
  undersignedAuthorize:
    'I/We the undersigned, authorize the named caregiver to do one or more of the following:',
  enrollInSchool:
    'enroll the child in school and extracurricular activities (including but not limited to Boy Scouts, Boys & Girls Club),',
  obtainTreatment:
    'obtain medical, dental, and mental health treatment for the child, and',
  provideNeeds:
    'provide for the child’s food, lodging, housing, recreation and travel.',
  obtainPassport: 'obtain a passport for the child/children;',
  travelAlone: 'travel alone with the child/children within the United States;',
  arrangeTravel:
    'to make travel arrangements for the child/children to travel outside the United States, together with the caregiver or on their own, for the SOLE purpose of being reunited with me/us in our country of residence; and/or',
  grantAdditionalPower:
    'I/We grant the following additional power(s) to the named caregiver:',
  doesNotProvideCustody:
    'I/We understand that this document does not provide legal custody to the caregiver. If at any time I/we disagree with a decision of the named caregiver or choose to make any healthcare or educational decisions for my/our child, I/we must revoke the power of attorney, in writing, and provide written documentation to the health care provider and the local education agency (i.e., school).',
  documentTerminated:
    'I/We understand that this document may be terminated in another written document signed by either parent with legal custody or by any order of a court with competent jurisdiction.',
  partTwo: 'Part II: To be initialed by caregiver',
  initialInside: '(initial inside parenthesis).',
  properlyExecuted:
    'I understand that this document, properly executed, gives me the right to enroll the minor child in the local education agency serving the area where I reside.',
  notProvideLegalCustody:
    'I understand that this document does not provide me with legal custody.',
  priorEnrollment:
    'I understand that, prior to enrollment, the local education agency may require documentation of the minor child’s residence with a caregiver and/or documentation or other verification of the validity of the stated hardship.',
  limitedFederalLaw:
    'I understand that, except where limited by federal law, I shall be assigned the rights, duties, and responsibilities that would otherwise be assigned to the parent, legal guardian or legal custodian pursuant to Tennessee Code Annotated Title 49.',
  resideWithMe:
    'I understand that, if the minor child ceases to reside with me, I am required by law to notify any person, school or health care provider to whom I have given this document.',
  partThree: 'Part III: To be initialed by parent(s) and caregiver',
  initialInsideParenthesis: '(initial inside parenthesis).',
  understandEnrollInSchool:
    'I/We understand that, by accepting the power of attorney, if we enroll a student in a school system while fraudulently representing the child’s current residence or the parents’ hardship or circumstances for using the power of attorney, either or both of us is liable for restitution to the school district for an amount equal to the per pupil expenditure for the district in which the student is fraudulently enrolled. Restitution shall be cumulative for each year the child has been fraudulently enrolled in the system and may include costs and fees related to litigation.',
  declareUnderPenalty:
    'I/We declare under penalty of perjury under the laws of the State of Tennessee that the foregoing is true and correct.',
  stateOF: 'STATE OF',
  countyOf: 'COUNTY OF',
  date: 'Date:',
  motherGuardian: 'Mother/Legal Guardian',
  motherSignature:
    'The Mother/Legal Guardian, ___, personally appeared before me this _____ day of ____________, 20___.',
  notaryPublic: 'NOTARY PUBLIC',
  commissionExpires: 'My commission expires:',
  fatherGuardian: 'Father/Legal Guardian',
  fatherSignature:
    'The Father/Legal Guardian, ___, personally appeared before me this _____ day of ____________, 20___.',
  caregiver: 'Caregiver',
  caregiverSignature:
    'The Caregiver, ___, personally appeared before me this _____ day of ____________, 20___.',
  inLieu:
    'In lieu of a notary, pursuant to Tennessee Code Annotated § 34-6-302, the Legal Guardian(s) may complete the following acknowledgement by two witnesses.',
  inLieuOfNotary:
    'In lieu of a notary public, pursuant to T.C.A. § 34-6-302, the Legal Guardian(s) may complete the following acknowledgement by two disinterested witnesses.  Two witnesses must sign and date their signatures concurrently (at the same time) and in each other’s presence:  The Legal Guardian(s) signed or acknowledged signing this document in my/our presence and, based upon personal observation, appear(s) to be emotionally and mentally competent to complete this Power of Attorney for Care of a Minor Child/Children form.',
  legalGuardianSigned:
    'The Legal Guardian(s) signed or acknowledged signing this document in my presence and, based upon personal observation, appears to be emotionally and mentally competent to complete this Power of Attorney for Care of a Minor Child form. Two witnesses must sign and date their signatures concurrently (at the same time) and in each other’s presence.',
  signatureOfWitnessOne: '(Signature of Witness #1)',
  dateParenthesis: '(Date)',
  signatureOfWitnessTwo: '(Signature of Witness #2)',
  directionsToParents: 'DIRECTIONS TO PARENTS:',
  leadingDash: '-        ',
  space: ' ',
  giveOriginal:
    'Give an original signed copy to each named caregiver to keep in a secure location.',
  keepCopy: 'Keep a copy for yourself in a safe place.',
  discussCaregiving:
    'Discuss caregiving expectations with the caregiver(s).  Caregivers may refuse to serve if they are not able or willing to be a caregiver.',
  mayRevoke: 'You may revoke this power of attorney in writing at any time.',
  ifYouRevoke:
    'If you revoke the power of attorney, provide a copy of the written revocation to the caregiver(s) and any agency or person who has received a copy of the power of attorney so that they are on notice that it has been revoked.',
  noticeToAgencyProvider:
    'NOTICE TO THE LOCAL EDUCATION AGENCY AND/OR HEALTH CARE PROVIDER:',
  pursuantTo:
    'Pursuant to T.C.A. § 34-6-308, no person, school official or health care provider who acts in good faith reliance on a power of attorney for care of a minor child to enroll the child in school or to provide medical, dental or mental health care, without actual knowledge of facts contrary to those authorized, is subject to criminal or civil liability to any person, or is subject to professional disciplinary action for such reliance. This section shall apply even if medical, dental, or mental health care is provided to a minor child or the child is enrolled in a school in contravention of the wishes of the parent with legal custody of the minor child, as long as the person, school official or health care provider has been provided a copy of an appropriately executed power of attorney for care of a minor child, and has not been provided written documentation that the parent has revoked the power of attorney for care of a minor child.',
  additionallyPursuantTo:
    'Additionally, pursuant to T.C.A. § 34-6-310, a person who relies on the power of attorney for care of a minor child has no obligation to make any further inquiry or investigation. Nothing in this part shall relieve any individual from liability for violations of other provisions of law.',
  serveJointlyAndSeveraly:
    'I/We wish for the named persons above to serve jointly and severally as caregivers, working together and/or serving independently as caregiver(s) as needed and appropriate.  The successor caregiver instead may wait to serve only once the initial caregiver is no longer able or willing to serve as caregiver.'
}

export default PDF_STRINGS
