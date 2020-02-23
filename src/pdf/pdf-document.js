// @flow
import * as React from 'react'
import html2pdf from 'html2pdf.js'
import Strings from '../strings/pdf'
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

export const PARENTAL_STATUS_WITH_REASON = 'legalCustodySent'
export const PARENTAL_STATUSES = [
  'bothParents',
  'parentDeceased',
  'legalCustodySigned',
  PARENTAL_STATUS_WITH_REASON
]

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
      consentInitials
    } = data
    return (
      <div id={PDF_ID} className="hiddenPDF">
        <div className="pdfContainer">
          <div>
            <p className="title">{Strings.instructions}</p>
            <br />
            <ol>
              <li className="text">{Strings.printInstructions}</li>
              <li className="text">{Strings.bothCopiesCaregiver}</li>
              <li className="text">{Strings.bothInitials}</li>
              <li className="text">{Strings.bothCopiesParent}</li>
              <li className="text">{Strings.originalCopyCaregiver}</li>
              <li className="text">{Strings.originalCopyYou}</li>
              <li className="text">{Strings.originalCopyThirdParty}</li>
              <li className="text">{Strings.revoke}</li>
            </ol>
          </div>
          <div className="page break">
            <p className="title">{Strings.instructionsEsp}</p>
            <br />
            <ol>
              <li className="text">{Strings.printInstructionsEsp}</li>
              <li className="text">{Strings.bothCopiesCaregiverEsp}</li>
              <li className="text">{Strings.bothInitialsEsp}</li>
              <li className="text">{Strings.bothCopiesParentEsp}</li>
              <li className="text">{Strings.originalCopyCaregiverEsp}</li>
              <li className="text">{Strings.originalCopyYouEsp}</li>
              <li className="text">{Strings.originalCopyThirdPartyEsp}</li>
              <li className="text">{Strings.revokeEsp}</li>
            </ol>
          </div>
          <div className="page break">
            <p className="title uppercase">{Strings.poaTitle}</p>
            <p>{Strings.useOfThisForm}</p>
            <br />
            <NumberedContent number={1}>
              <div className="row">
                <span className="label bold">{Strings.minorChildName}:</span>
                <div className="underline full-width">{childrenNames[0]}</div>
              </div>
              <div className="row">
                <span className="label bold">{Strings.minorChildName}:</span>
                <span className="underline full-width">{childrenNames[1]}</span>
              </div>
              <div className="row">
                <span className="label bold">{Strings.minorChildName}:</span>
                <span className="underline full-width">{childrenNames[2]}</span>
              </div>
              <div className="row">
                <span className="label bold">{Strings.minorChildName}:</span>
                <span className="underline full-width">{childrenNames[3]}</span>
              </div>
            </NumberedContent>
            <br />
            <div className="row">
              <span className="label bold">{Strings.motherAddress}:</span>
              <span className="underline full-width">{motherAddress.name}</span>
            </div>
            <div className="row">
              <span className="label bold">{Strings.address}:</span>
              <span className="underline full-width">
                {formatAddress(motherAddress)}
              </span>
            </div>
            <div className="row">
              <span className="label bold">{Strings.fatherAddress}:</span>
              <span className="underline full-width">{fatherAddress.name}</span>
            </div>
            <div className="row">
              <span className="label bold">{Strings.address}:</span>
              <span className="underline full-width">
                {formatAddress(fatherAddress)}
              </span>
            </div>
            <br />
            <NumberedContent number={2}>
              <div className="row">
                <span className="bold">{Strings.initalCaregiverAddress}:</span>
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
                  {Strings.successorCaregiverAddress}:
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
                <span>{Strings.serveJointlyAndSeveraly}</span>
              </div>
            </NumberedContent>
            <NumberedContent number={3}>
              <div className="row">
                <span className="bold">{Strings.parentalCustody}:</span>
              </div>
            </NumberedContent>
          </div>
        </div>
      </div>
    )
  }
}

export default HiddenPDF
