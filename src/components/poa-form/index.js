import * as React from 'react'
import styles from './styles'
import { address } from 'ip';

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
        street_address: '',
        locality: '',
        region: '',
        postal_code: '',
      },
      [FATHER_ADDRESS]: {
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
    }
  }

  selectNumberofChilds = (e) => {
    this.setState({ numberOfChildren: e.target.dataset.number })
  }

  updateChildName = (e) => {
    const idx = e.target.dataset.number
    this.state.childrenNames[idx] = e.target.value
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
    console.dir(e.target)
  }

  updateParentalStatusText = (e) => {
    const reason = e.target.value
    this.setState({ reason })
  }

  renderChildrenInputs = () => {
    const inputs = [...Array(parseInt(this.state.numberOfChildren))].map((_, i) => {
      return (
        <div key={i} className="row">
          <input
            type="text"
            className="form-control"
            data-number={i}
            aria-describedby="basic-addon1"
            onChange={this.updateChildName}
            value={this.state.childrenNames[i]}
          />
        </div>
      )
    })
    return inputs
  }

  renderAddress = (name) => {
    return (
      <div>
        <input
          onChange={this.updateAddress}
          value={this.state[name].street_address}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'street_address'}
          placeholder="street_address"
          aria-describedby="sizing-addon1"
        />
        <input
          onChange={this.updateAddress}
          value={this.state[name].locality}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'locality'}
          placeholder="locality"
          aria-describedby="sizing-addon1"
        />
        <input
          onChange={this.updateAddress}
          value={this.state[name].region}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'region'}
          placeholder="region"
          aria-describedby="sizing-addon1"
        />
        <input
          onChange={this.updateAddress}
          value={this.state[name].postal_code}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'postal_code'}
          placeholder="postal_code"
          aria-describedby="sizing-addon1"
        />
      </div>
    )
  }

  render() {
    console.log(this.state)
    const pluralizeChild = this.state.numberOfChildren > 1 ? 'Children' : 'Child'
    return (
      <div>
        <h1>POWER OF ATTORNEY FOR CARE OF A MINOR CHILD</h1>
        <p>Use  of  this  form  is  authorized  by  T.C.A.  §  34-6-301  et  seq.    Completion  of  this  form, along with the proper signatures, is sufficient to authorize enrollment of a minor in school and  to  authorize  medical  treatment.    However,  a  school  district  may  require  additional documentation/information as permitted by this section of Tennessee law before enrolling a child in school or any extracurricular activities.</p>
        <p><strong>Part I:</strong>  To be filled out and/or initialed by parent(s)/legal guardian(s)</p>
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
          {this.renderChildrenInputs()}
        </div>
        <div className="row">
          <p>2. Mother/Legal Guardian’s Name & Address</p> {this.renderAddress(MOTHER_ADDRESS)}
        </div>
        <div className="row">
          <p>3. Father/Legal Guardian’s Name & Address</p> {this.renderAddress(FATHER_ADDRESS)}
        </div>
        <div className="row">
          <p>4. Caregiver’s Name & Address</p> {this.renderAddress(CAREGIVER_ADDRESS)}
        </div>
        <div>
          <p> 5.</p>
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
      </div>
    )
  }
}


export default PoAForm
