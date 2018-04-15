import * as React from 'react'
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import './main.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const MOTHER_ADDRESS = 'motherAddress'
const FATHER_ADDRESS = 'fatherAddress'
const CAREGIVER_ADDRESS = 'caregiverAddress'


class PoAForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({

  })

  constructor(props: Form) {
    super(props)
    this.state = {
      numberOfChildren: 1,
      childrenNames: [],
      [MOTHER_ADDRESS]: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: '',
      },
      [FATHER_ADDRESS]: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: '',
      },
      [CAREGIVER_ADDRESS]: {
        street_address: '',
        locality: '',
        region: '',
        postal_code: '',
      },
      parentalStatus: '',
      reason: null,
      errors: {
        childrenNames: false,
        parentalStatus: false,
        reason: false,
        mother_street_address: false,
        mother_locality: false,
        mother_region: false,
        mother_postal_code: false,
        father_street_address: false,
        father_locality: false,
        father_region: false,
        father_postal_code: false,
        caregiver_street_address: false,
        caregiver_locality: false,
        caregiver_region: false,
        caregiver_postal_code: false
      },

    }
  }

  selectNumberofChilds = (e) => {
    this.setState({ numberOfChildren: e.target.dataset.number })
  }

  updateChildName = (e) => {
    const idx = e.target.dataset.number
    const names = [...this.state.childrenNames]
    names[idx] = e.target.value
    this.setState({ childrenNames: names })
  }

  updateAddress = (e) => {
    const inputName = e.target.name
    const addressType = e.target.dataset.addressType
    const value = e.target.value
    this.setState({
      [inputName]: {
        ...this.state[inputName],
        [addressType]: value,
      }
    })

  }

  updateParentalStatus = (e) => {
    const idx = e.target.value
    this.setState({ parentalStatus: idx })
  }

  updateParentalStatusText = (e) => {
    const reason = e.target.value
    this.setState({ reason })
  }

  validate = () => {
    this.setState(() => ({
      errors: {
        childrenNames: this.state.childrenNames.length === 0,
        parentalStatus: this.state.reason === '5' ? this.state.parentalStatus.length === 0 : false,
        reason: this.state.reason,
        [`${MOTHER_ADDRESS}_street_address`]: this.state[MOTHER_ADDRESS].street_address.length === 0,
        [`${MOTHER_ADDRESS}_locality`]: this.state[MOTHER_ADDRESS].locality.length === 0,
        [`${MOTHER_ADDRESS}_region`]: this.state[MOTHER_ADDRESS].region.length === 0,
        [`${MOTHER_ADDRESS}_postal_code`]: this.state[MOTHER_ADDRESS].postal_code.length === 0,
        [`${FATHER_ADDRESS}_street_address`]: this.state[FATHER_ADDRESS].street_address.length === 0,
        [`${FATHER_ADDRESS}_locality`]: this.state[FATHER_ADDRESS].locality.length === 0,
        [`${FATHER_ADDRESS}_region`]: this.state[FATHER_ADDRESS].region.length === 0,
        [`${MOTHER_ADDRESS}_postal_code`]: this.state[FATHER_ADDRESS].postal_code.length === 0,
        [`${CAREGIVER_ADDRESS}_street_address`]: this.state[CAREGIVER_ADDRESS].street_address.length === 0,
        [`${CAREGIVER_ADDRESS}_locality`]: this.state[CAREGIVER_ADDRESS].locality.length === 0,
        [`${CAREGIVER_ADDRESS}_region`]: this.state[CAREGIVER_ADDRESS].region.length === 0,
        [`${CAREGIVER_ADDRESS}_postal_code`]: this.state[CAREGIVER_ADDRESS].postal_code.length === 0,
      }
    }))
  }

  renderChildrenInputs = () => {
    const inputs = [...Array(parseInt(this.state.numberOfChildren))].map((_, i) => {
      return (
        <div key={i}>
          <input
            type="text"
            className="form-control"
            data-number={i}
            aria-describedby="basic-addon1"
            onChange={this.updateChildName}
            value={this.state.childrenNames[i]}
            placeholder={`${i + 1} Child's name`}
          />
        </div>
      )
    })
    return inputs
  }

  renderAddress = (name, errors) => {
    return (
      <div>
        {errors && this.state.errors[`${name}_street_address`] ? <span class='error'>Please add a street address.</span> : null}
        <input
          onChange={this.updateAddress}
          value={this.state[name].street_address}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'street_address'}
          placeholder="Street Address"
          aria-describedby="sizing-addon1"
        />
        {errors && this.state.errors[`${name}_locality`] ? <span class='error'>Please add a city.</span> : null}
        <input
          onChange={this.updateAddress}
          value={this.state[name].locality}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'locality'}
          placeholder="City"
          aria-describedby="sizing-addon1"
        />
        {errors && this.state.errors[`${name}_region`] ? <span class='error'>Please add at state.</span> : null}
        <input
          onChange={this.updateAddress}
          value={this.state[name].region}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'region'}
          placeholder="State"
          aria-describedby="sizing-addon1"
        />
        {errors && this.state.errors[`${name}_postal_code`] ? <span class='error'>Please add a zip code.</span> : null}
        <input
          onChange={this.updateAddress}
          value={this.state[name].postal_code}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'postal_code'}
          placeholder="Zip Code"
          aria-describedby="sizing-addon1"
        />
      </div>
    )
  }

  generateFrom = () => {
    let inputInfo = this.state;
    let hello = 'Juan Job '
        inputInfo.childrenNames.map((form, i) => {
          console.log('Hellllllooooo @@@@@', i);
          return; 
        });

        // this.state = {
        //   numberOfChildren: 1,
        //   childrenNames: [],
        //   [MOTHER_ADDRESS]: {
        //     street_address: '',
        //     locality: '',
        //     region: '',
        //     postal_code: '',
        //   },
        //   [FATHER_ADDRESS]: {
        //     street_address: '',
        //     locality: '',
        //     region: '',
        //     postal_code: '',
        //   },
        //   [CAREGIVER_ADDRESS]: {
        //     street_address: '',
        //     locality: '',
        //     region: '',
        //     postal_code: '',
        //   },
        // }
    let docDefinition = {
      content:[		{
        text: 'POWER OF ATTORNEY FOR CARE OF A MINOR CHILD\n\n',
        style: 'header',
        alignment: 'center',
        bold: true,
        decoration: 'underline',
      },
      {
        text:[
          'Use of this form is authorized by T.C.A. § 34-6-301 et seq.  Completion of this form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and to authorize medical treatment.  However, a school district may require additional documentation/information as permitted by this section of Tennessee law before enrolling a child in school or any extracurricular activities.',
          {
            text:'Please print clearly\n\n',
            italics: true
          }
        ]
      },
      {
        text: [
          {
            text: 'Part I:',
            bold: true
          },  'To be filled out and/or initialed by parent(s)/legal guardian(s).\n\n'
        ]
      },
      // {
      //   text: [
      //     '1.Minor Child’s Name ', {text:`   ${inputInfo.childrenNames[0]}  \n\n\n\n`, decoration: 'underline'}
      //   ]
      // },
      // {
      //   text: [
      //     '2.Mother/Legal Guardian’s Name & Address:\n\n',
      //     `  ${inputInfo.MOTHER_ADDRESS.name}  \n\n`,
      //     `  ${inputInfo.MOTHER_ADDRESS.street_address} ${inputInfo.MOTHER_ADDRESS.street_address}  \n\n`,
      //     `  ${inputInfo.MOTHER_ADDRESS.locality}, ${inputInfo.MOTHER_ADDRESS.region}, ${inputInfo.MOTHER_ADDRESS.postal_code}  \n\n`
      //   ]
      // },
      {
        text: [
            '3.Father/Legal Guardian’s Name & Address:\n\n',
            {
              text: `  ${inputInfo.FATHER_ADDRESS.name}  \n\n`,
              decoration: 'underline'
            },
            // `  ${inputInfo.FATHER_ADDRESS.street_address} ${inputInfo.FATHER_ADDRESS.street_address}_____________\n\n`,
            // `  ${inputInfo.FATHER_ADDRESS.locality}, ${inputInfo.FATHER_ADDRESS.region}, ${inputInfo.FATHER_ADDRESS.postal_code}  \n\n`
        ]
      },
      {
        text: [
          '4.Caregiver’s Name & Address:\n\n',
          `______________________________\n\n`,
          `______________________________\n\n`,
          `______________________________\n\n`
        ]
      },
      {
        text: [
          '5.(____)Both parents are living,have legal custody of the minor child and have signed this document\n',
          {text: 'OR\n\n', bold: true},
          '(____)One parent is deceased;\n',
          {text: 'OR\n\n', bold: true},
          '(____)One parent has legal custody of the minor child and both parents have signed this document and consent to the appointment of the caregiver;\n',
          {text: 'OR\n\n', bold: true},
          '(____) One parent has legal custody of the minor child, and has sent by Certified Mail, Return Receipt requested, to the other parent at last known address, a copy of this document and a notice of the provisions in § 34-6-305; or the non-custodial parent has not consented to the appointment and consent cannot be obtained because ______________________________.\n\n'

        ]
      },
      {
        text: [
          '6.Temporary care-giving authority regarding the minor child is being given to the caregiver because of the following type of hardship', {text:'(check at least one):\n\n', bold: true}, '(____) the serious illness or incarceration of a parent or legal guardian'
        ]
      },
    ]
    };
    pdfMake.createPdf(docDefinition).open()
  }

  render() {
    let docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    const pluralizeChild = this.state.numberOfChildren > 1 ? 'Children' : 'Child'
    const errors = Object.keys(this.state.errors).reduce((acc, curr) => {
      if (this.state.errors[curr]) {
        acc = true
      }
      return acc
    }, false)
    return (
      <div class='container'>
        <h1>POWER OF ATTORNEY FOR CARE OF A MINOR CHILD</h1>
        <p>Use  of  this  form  is  authorized  by  T.C.A.  §  34-6-301  et  seq.    Completion  of  this  form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and  to  authorize  medical  treatment.    However,  a  school  district  may  require  additional documentation/information as permitted by this section of Tennessee law before enrolling a child in school or any extracurricular activities.</p>
        <p><strong>Part I:</strong>  To be filled out and/or initialed by parent(s)/legal guardian(s)</p>

        <div>
          <h1>
            PDF FROM
          </h1>
          <button onClick={() => pdfMake.createPdf(docDefinition).open()}>
            Click
          </button>
        </div>

        <div className="btn-group">
          <button className="btn dropdown-toggle" data-toggle="dropdown">{`${this.state.numberOfChildren} ${pluralizeChild}`}</button>
          <button className="btn dropdown-toggle" data-toggle="dropdown">
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
            {[...Array(20)].map((_, i) => {
              const number = i + 1
              return (<li key={number}><a href="#" data-number={number} onClick={this.selectNumberofChilds}>{number}</a></li>)
            })}
          </ul>
        </div>
        <div className="row">
          <p>1. Minor Child's Name</p>
          {errors && this.state.errors.childrenNames ? <span class='error'>Please add at least on child.</span> : null}
          {this.renderChildrenInputs()}
        </div>
        <div className="row">
          <p>2. Mother/Legal Guardian’s Name & Address</p> {this.renderAddress(MOTHER_ADDRESS, errors)}
        </div>
        <div className="row">
          <p>3. Father/Legal Guardian’s Name & Address</p> {this.renderAddress(FATHER_ADDRESS, errors)}
        </div>
        <div className="row">
          <p>4. Caregiver’s Name & Address</p> {this.renderAddress(CAREGIVER_ADDRESS, errors)}
        </div>
        <div>
          <p> 5. Parental Status</p>
          {errors && this.state.errors.parental_status ? <span class='error'>Please add a parental status.</span> : null}
          {errors && this.state.errors.reason ? <span class='error'>Please add a reason.</span> : null}
          <div clasName="input-group">
            <div clasName='row'>
              <span clasName="input-group-addon">
                <input type="radio" onChange={this.updateParentalStatus} value={0} name='parental_status' aria-label='parental_status' />Both  parents  are  living,have  legal  custody  of  the  minor  child  and  have signed this document;
                </span>
            </div>
            <div clasName='row'>
              <span clasName="input-group-addon">
                <input type="radio" onChange={this.updateParentalStatus} value={1} name='parental_status' aria-label='parental_status' />One parent is deceased;
              </span>
            </div>
            <div clasName='row'>
              <span clasName="input-group-addon">
                <input type="radio" onChange={this.updateParentalStatus} value={2} name='parental_status' aria-label='parental_status' />
                One  parent  has  legal  custody  of  the  minor  child  and  both  parents  have signed this document and consent to the appointment of the caregiver;
              </span>
            </div>
            <div clasName='row'>
              <span clasName="input-group-addon">
                <input type="radio" onChange={this.updateParentalStatus} value={3} name='parental_status' aria-label='parental_status' /> One parent has legal custody of the minor child, and has sent by Certified Mail, Return Receipt requested, to the other parent at last known address, a  copy  of  this  document  and  a  notice  of  the  provisions  in  §  34-6-305;
          </span>
            </div>
            <div clasName='row'>
              <span clasName="input-group-addon">
                <input type="radio" onChange={this.updateParentalStatus} value={4} name='parental_status' aria-label='parental_status' />
                or the non-custodial parent has not consented to the appointment and consent cannot be obtained because
                <input
                  onChange={this.updateParentalStatusText}
                  value={this.state.reason}
                  type="text"
                  className="form-control"
                  name={'parent_status_reason'}
                  aria-describedby="sizing-addon1"
                />
              </span>
            </div>
          </div>
        </div>
        <button type="button" onClick={this.generateFrom}class="btn btn-default">Submit</button>
      </div>
    )
  }
}


export default PoAForm
