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
  effectiveImmediatly: 'effectiveImmediatly',
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
      parentalStatusReason
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
                <CheckHere text={consentInitials[0]} />
                <CheckHere text={consentInitials[1]} />
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
                    parentalStatus === PARENTAL_STATUSES.bothParents ? 'X' : ''
                  }
                />
                <CheckHere
                  text={
                    parentalStatus === PARENTAL_STATUSES.bothParents ? 'X' : ''
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
                      : ''
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
                      : ''
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
                      : ''
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
          </div>
        </div>
      </div>
    )
  }
}

export default HiddenPDF
