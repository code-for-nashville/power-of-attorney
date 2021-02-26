// @flow
import * as React from 'react'
import html2pdf from 'html2pdf.js'
import PDFStrings from '../strings/pdf'
import Strings from '../strings/english'
import './styles.css'
import {NumberedContent, CheckHere} from './components'
import type {FormInputs} from '../types'
export const MOTHER_ADDRESS = 'motherAddress'
export const FATHER_ADDRESS = 'fatherAddress'
export const INITIAL_CAREGIVER = 'initialCaregiver'
export const INITIAL_CAREGIVER_ADDRESS = `${INITIAL_CAREGIVER}Address`
export const INITIAL_CAREGIVER_PHONE_NUMBER = `${INITIAL_CAREGIVER}PhoneNumber`
export const INITIAL_CAREGIVER_RELATIONSHIP = `${INITIAL_CAREGIVER}Relationship`
export const SUCCESSOR_CAREGIVER = 'successorCaregiver'
export const SUCCESSOR_CAREGIVER_ADDRESS = `${SUCCESSOR_CAREGIVER}Address`
export const SUCCESSOR_CAREGIVER_PHONE_NUMBER = `${SUCCESSOR_CAREGIVER}PhoneNumber`
export const SUCCESSOR_CAREGIVER_RELATIONSHIP = `${SUCCESSOR_CAREGIVER}Relationship`

export const PARENTAL_STATUSES = {
  bothParents: 'bothParents',
  parentDeceased: 'parentDeceased',
  legalCustodySigned: 'legalCustodySigned',
  legalCustodySent: 'legalCustodySent'
}

export const AUTHORITY_GIVEN_CONDITIONS = {
  effectiveImmediately: 'effectiveImmediately',
  untilHardships: 'untilHardships'
}

export const HARDSHIPS = {
  seriousIllness: 'seriousIllness',
  physicalOrMentalCondition: 'physicalOrMentalCondition',
  uninhabitability: 'uninhabitability',
  needTreatment: 'needTreatment',
  incarceration: 'incarceration',
  detention: 'detention',
  describe: 'describe'
}

export const AUTHORIZATION = {
  undersigned: 'undersigned',
  enrollInSchool: 'enrollInSchool',
  obtainTreatment: 'obtainTreatment',
  provideNeeds: 'provideNeeds',
  obtainPassport: 'obtainPassport',
  travelAlone: 'travelAlone',
  arrangeTravel: 'arrangeTravel',
  grantAdditionalPower: 'grantAdditionalPower'
}

export const UNDERSTAND = {
  iOrWeUnderstand: 'iOrWeUnderstand',
  iOrWeDoNotUnderstand : 'iOrWeDoNotUnderstand'
}

const PDF_ID = 'print-container'
type HiddenPDFProps = {data: FormInputs}

const opt = {
  pagebreak: {mode: 'avoid-all', before: '.page'},
  margin: [20, 16]
}
const formatAddress = ({street_address, locality, region, postal_code}) => {
  return `${street_address}, ${locality}, ${region} ${postal_code}`
}

class HiddenPDF extends React.Component<HiddenPDFProps> {
  static downloadPDF() {
    const element = document.getElementById(PDF_ID)
    if (element) {
      const worker = html2pdf()
      worker
        .set(opt)
        .from(element.innerHTML)
        .save()
    }
  }

  static viewPDF = async () => {
    const element = document.getElementById(PDF_ID)
    if (element) {
      const worker = html2pdf()
      worker
        .set(opt)
        .from(element.innerHTML)
        .outputPdf('dataurlnewwindow')
    }
  }

  render() {
    const {data} = this.props
    const {
      childrenNames,
      motherAddress,
      fatherAddress,
      initialCaregiverAddress: initalCaregiver,
      successorCaregiverAddress: successorCaregiver,
      initialCaregiverRelationship,
      initialCaregiverPhoneNumber,
      successorCaregiverRelationship,
      successorCaregiverPhoneNumber,
      consentInitials,
      parentalStatus,
      parentalStatusReason,
      authorityGivenConditions,
      hardships,
      authorization,
      acknowledgedNotProvidingLegalCustody,
      acknowledgedDocumentMayBeTerminated
    } = data
    return (
      <div id={PDF_ID} className="hiddenPDF">
        <div className="pdfContainer">
          <div>
            <p className="title">{PDFStrings.instructions}</p>
            <br />
            <ol>
              <li className="text">{PDFStrings.printInstructions}</li>
              <li className="text">{PDFStrings.bothCopiesCaregiver}</li>
              <li className="text">{PDFStrings.bothInitials}</li>
              <li className="text">{PDFStrings.bothCopiesParent}</li>
              <li className="text">{PDFStrings.originalCopyCaregiver}</li>
              <li className="text">{PDFStrings.originalCopyYou}</li>
              <li className="text">{PDFStrings.originalCopyThirdParty}</li>
              <li className="text">{PDFStrings.revoke}</li>
            </ol>
          </div>
          <div className="page break">
            <p className="title">{PDFStrings.instructionsEsp}</p>
            <br />
            <ol>
              <li className="text">{PDFStrings.printInstructionsEsp}</li>
              <li className="text">{PDFStrings.bothCopiesCaregiverEsp}</li>
              <li className="text">{PDFStrings.bothInitialsEsp}</li>
              <li className="text">{PDFStrings.bothCopiesParentEsp}</li>
              <li className="text">{PDFStrings.originalCopyCaregiverEsp}</li>
              <li className="text">{PDFStrings.originalCopyYouEsp}</li>
              <li className="text">{PDFStrings.originalCopyThirdPartyEsp}</li>
              <li className="text">{PDFStrings.revokeEsp}</li>
            </ol>
          </div>
          <div className="page break">
            <p className="title uppercase">{PDFStrings.poaTitle}</p>
            <p>{PDFStrings.useOfThisForm}</p>
            <br />
            <NumberedContent number={1}>
              <div className="row">
                <span className="label bold">{PDFStrings.minorChildName}:</span>
                <div className="underline full-width">{childrenNames[0]}</div>
              </div>
              <div className="row">
                <span className="label bold">{PDFStrings.minorChildName}:</span>
                <span className="underline full-width">{childrenNames[1]}</span>
              </div>
              <div className="row">
                <span className="label bold">{PDFStrings.minorChildName}:</span>
                <span className="underline full-width">{childrenNames[2]}</span>
              </div>
              <div className="row">
                <span className="label bold">{PDFStrings.minorChildName}:</span>
                <span className="underline full-width">{childrenNames[3]}</span>
              </div>
            </NumberedContent>
            <br />
            <div className="row">
              <span className="label bold">{PDFStrings.motherAddress}:</span>
              <span className="underline full-width">{motherAddress.name}</span>
            </div>
            <div className="row">
              <span className="label bold">{PDFStrings.address}:</span>
              <span className="underline full-width">
                {formatAddress(motherAddress)}
              </span>
            </div>
            <div className="row">
              <span className="label bold">{PDFStrings.fatherAddress}:</span>
              <span className="underline full-width">{fatherAddress.name}</span>
            </div>
            <div className="row">
              <span className="label bold">{PDFStrings.address}:</span>
              <span className="underline full-width">
                {formatAddress(fatherAddress)}
              </span>
            </div>
            <br />
            <NumberedContent number={2}>
              <div className="row">
                <span className="bold">
                  {PDFStrings.initalCaregiverAddress}:
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {initalCaregiver.name}
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {initialCaregiverRelationship}
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {formatAddress(initalCaregiver)}
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {initialCaregiverPhoneNumber}
                </span>
              </div>
              <div className="row">
                <span className="bold">
                  {PDFStrings.successorCaregiverAddress}:
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {successorCaregiver.name}
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {successorCaregiverRelationship}
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {formatAddress(successorCaregiver)}
                </span>
              </div>
              <div className="row center">
                <span className="underline half-width">
                  {successorCaregiverPhoneNumber}
                </span>
              </div>
              <div className="row">
                <CheckHere
                  text={consentInitials[0] === '' ? '    ' : consentInitials[0]}
                />
                <CheckHere
                  text={consentInitials[1] === '' ? '    ' : consentInitials[1]}
                />
                <span>{PDFStrings.serveJointlyAndSeveraly}</span>
              </div>
            </NumberedContent>
            <NumberedContent number={3}>
              <div className="row">
                <span className="bold">{PDFStrings.parentalCustody}:</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    parentalStatus === PARENTAL_STATUSES.bothParents
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    parentalStatus === PARENTAL_STATUSES.bothParents
                      ? 'X'
                      : '    '
                  }
                />
                <span>
                  {Strings.bothParents}
                  {PDFStrings.or}
                </span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    parentalStatus === PARENTAL_STATUSES.parentDeceased
                      ? 'X'
                      : '    '
                  }
                />
                <span>
                  {Strings.parentDeceased}
                  {PDFStrings.or}
                </span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    parentalStatus === PARENTAL_STATUSES.legalCustodySigned
                      ? 'X'
                      : '    '
                  }
                />
                <span>
                  {Strings.legalCustodySigned}
                  {PDFStrings.or}
                </span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    parentalStatus === PARENTAL_STATUSES.legalCustodySent
                      ? 'X'
                      : '    '
                  }
                />
                <span>
                  {Strings.legalCustodySent}
                  <span className="underline half-width">
                    {parentalStatusReason || '\u00A0'}
                  </span>
                  {PDFStrings.legalCustodyExample}
                </span>
              </div>
            </NumberedContent>
            <NumberedContent number={4}>
              <div className="row">
                <span className="bold">{PDFStrings.temporaryAuthority}:</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorityGivenConditions ===
                    AUTHORITY_GIVEN_CONDITIONS.effectiveImmediately
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    authorityGivenConditions ===
                    AUTHORITY_GIVEN_CONDITIONS.effectiveImmediately
                      ? 'X'
                      : '    '
                  }
                />
                <span>
                  {Strings.effectiveImmediately}
                </span>
              </div>
              <div className="row">
                <span className="bold">{PDFStrings.or}:</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorityGivenConditions ===
                    AUTHORITY_GIVEN_CONDITIONS.untilHardships
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    authorityGivenConditions ===
                    AUTHORITY_GIVEN_CONDITIONS.untilHardships
                      ? 'X'
                      : '    '
                  }
                />

                <span>
                  {Strings.untilHardships}
                </span>
              </div>
              <div>
                <div className="row">
                  <CheckHere
                    text={hardships === HARDSHIPS.seriousIllness ? 'X' : '    '}
                  />
                  <CheckHere
                    text={hardships === HARDSHIPS.seriousIllness ? 'X' : '    '}
                  />

                  <span>{PDFStrings.illnessOrIncarceration}</span>
                </div>
                <div className="row">
                  <CheckHere
                    text={
                      hardships === HARDSHIPS.physicalOrMentalCondition
                        ? 'X'
                        : '    '
                    }
                  />
                  <CheckHere
                    text={
                      hardships === HARDSHIPS.physicalOrMentalCondition
                        ? 'X'
                        : '    '
                    }
                  />

                  <span>{PDFStrings.physicalOrMentalCondition}</span>
                </div>
                <div className="row">
                  <CheckHere
                    text={
                      hardships === HARDSHIPS.uninhabitability ? 'X' : '    '
                    }
                  />
                  <CheckHere
                    text={
                      hardships === HARDSHIPS.uninhabitability ? 'X' : '    '
                    }
                  />

                  <span>{PDFStrings.lossOfHome}</span>
                </div>
                <div className="row">
                  <CheckHere
                    text={hardships === HARDSHIPS.needTreatment ? 'X' : '    '}
                  />
                  <CheckHere
                    text={hardships === HARDSHIPS.needTreatment ? 'X' : '    '}
                  />

                  <span>{PDFStrings.needForTreatment}</span>
                </div>
                <div className="row">
                  <CheckHere
                    text={hardships === HARDSHIPS.incarceration ? 'X' : '    '}
                  />
                  <CheckHere
                    text={hardships === HARDSHIPS.incarceration ? 'X' : '    '}
                  />

                  <span>{PDFStrings.parentIncarceration}</span>
                </div>
                <div className="row">
                  <CheckHere
                    text={hardships === HARDSHIPS.detention ? 'X' : '    '}
                  />
                  <CheckHere
                    text={hardships === HARDSHIPS.detention ? 'X' : '    '}
                  />

                  <span>{PDFStrings.detentionDeportation}</span>
                </div>
                <div className="row">
                  <CheckHere
                    text={hardships === HARDSHIPS.describe ? 'X' : '    '}
                  />
                  <CheckHere
                    text={hardships === HARDSHIPS.describe ? 'X' : '    '}
                  />
                  <span className="underline full-width">
                    {PDFStrings.other}
                  </span>
                </div>{' '}
                <div className="row" />
                <div>
                  <span className="underline full-width">{}</span>
                </div>{' '}
                <div className="row" />
              </div>
            </NumberedContent>
            <NumberedContent number={5}>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.undersigned ? 'X' : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.undersigned ? 'X' : '    '
                  }
                />
                <span>{PDFStrings.undersignedAuthorize}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.enrollInSchool
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.enrollInSchool
                      ? 'X'
                      : '    '
                  }
                />
                <span>{PDFStrings.enrollInSchool}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.obtainTreatment
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.obtainTreatment
                      ? 'X'
                      : '    '
                  }
                />
                <span>{PDFStrings.obtainTreatment}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.provideNeeds ? 'X' : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.provideNeeds ? 'X' : '    '
                  }
                />
                <span>{PDFStrings.provideNeeds}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.obtainPassport
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.obtainPassport
                      ? 'X'
                      : '    '
                  }
                />
                <span>{PDFStrings.obtainPassport}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.travelAlone ? 'X' : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.travelAlone ? 'X' : '    '
                  }
                />
                <span>{PDFStrings.travelAlone}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.arrangeTravel ? 'X' : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.arrangeTravel ? 'X' : '    '
                  }
                />
                <span>{PDFStrings.arrangeTravel}</span>
              </div>
              <div className="row">
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.grantAdditionalPower
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    authorization === AUTHORIZATION.grantAdditionalPower
                      ? 'X'
                      : '    '
                  }
                />
                <span>{PDFStrings.grantAdditionalPower}</span>
              </div>
              <div className="row" />
              <div>
                <span className="underline full-width">{}</span>
              </div>{' '}
              <div className="row" />
              <div>
                <span className="underline full-width">{}</span>
              </div>{' '}
              <div className="row" />
            </NumberedContent>
            <NumberedContent number={6}>
              <div className="row">
                <CheckHere
                  text={
                    acknowledgedNotProvidingLegalCustody === UNDERSTAND.iOrWeUnderstand ? 'X' : '    '
                  }
                />
                <CheckHere
                  text={
                    acknowledgedNotProvidingLegalCustody === UNDERSTAND.iOrWeUnderstand ? 'X' : '    '
                  }
                />
                <span>{PDFStrings.doesNotProvideCustody}</span>
              </div>
            </NumberedContent>
            <NumberedContent number={7}>
              <div className="row">
                <CheckHere
                  text={
                    acknowledgedDocumentMayBeTerminated === UNDERSTAND.iOrWeUnderstand
                      ? 'X'
                      : '    '
                  }
                />
                <CheckHere
                  text={
                    acknowledgedDocumentMayBeTerminated === UNDERSTAND.iOrWeUnderstand
                      ? 'X'
                      : '    '
                  }
                />
                <span>{PDFStrings.documentTerminated}</span>
              </div>
            </NumberedContent>
            <div className="row">
              <span>{PDFStrings.declareUnderPenalty}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.stateOF}</span>
              <span className="underline half-width">{}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.countyOf}</span>
              <span className="underline half-width">{}</span>
            </div>
            <div className="row" /> <div className="row" />
            <div className="row">
              <span className="underline half-width">{motherAddress.name}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.motherGuardian}</span>
              <span className="underline half-width">{PDFStrings.date}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.motherSignature}</span>
            </div>
            <div className="page break" />
            <div className="row">
              <span className="underline half-width">{}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.notaryPublic}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.commissionExpires}</span>
              <span className="underline half-width">{}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.stateOF}</span>
              <span className="underline half-width">{}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.countyOf}</span>
              <span className="underline half-width">{}</span>
            </div>
            <div className="row" /> <div className="row" />
            <div className="row">
              <span className="underline half-width">{fatherAddress.name}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.fatherGuardian}</span>
              <span className="underline half-width">{PDFStrings.date}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.fatherSignature}</span>
            </div>
            <div className="row" /> <div className="row" />
            <div className="row" /> <div className="row" />
            <div className="row">
              <span className="underline half-width">{}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.notaryPublic}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.commissionExpires}</span>
              <span className="underline half-width">{}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.inLieuOfNotary}</span>
            </div>
            <div className="row">
              <span className="underline full-width">
                {PDFStrings.signatureOfWitnessOne}
              </span>
              <span className="underline full-width">
                {PDFStrings.signatureOfWitnessTwo}
              </span>
            </div>
            <div className="row">
              <span className="underline half-width">{PDFStrings.date}</span>
              <span className="underline half-width">{PDFStrings.date}</span>
            </div>
            <div className="row" /> <div className="row" />
            <div className="page break" />
            <div className="row">
              <span className="label bold">
                {PDFStrings.directionsToParents}
              </span>
            </div>
            <div className="row">
              <span>{PDFStrings.leadingDash}{PDFStrings.giveOriginal}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.leadingDash}{PDFStrings.keepCopy}</span>
            </div>
            <div className="row">
              <span>{PDFStrings.leadingDash}{PDFStrings.discussCaregiving}</span>
            </div>
            <div>
              <span>{PDFStrings.leadingDash}{PDFStrings.mayRevoke}</span>
              <span>{PDFStrings.ifYouRevoke}</span>
            </div>
            <div className="row" /> <div className="row" />
            <div>
              <span className="label bold">
                {PDFStrings.noticeToAgencyProvider}
              </span>
              <span>{PDFStrings.pursuantTo}</span>
              <span>{PDFStrings.additionallyPursuantTo}</span>
              <span>{PDFStrings.serveJointlyAndSeveraly}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HiddenPDF
