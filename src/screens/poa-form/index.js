import * as React from 'react';

import { DownloadPDF } from '../../components'
import { MOTHER_ADDRESS, FATHER_ADDRESS, CAREGIVER_ADDRESS } from '../../pdf/pdf-document';
import './styles.css';


const NO_ERRORS = {
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
};

class PoAForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({});

  constructor(props) {
    super(props);
    this.state = {
      numberOfChildren: 1,
      childrenNames: [],
      submitted: false,
      [MOTHER_ADDRESS]: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: ''
      },
      [FATHER_ADDRESS]: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: ''
      },
      [CAREGIVER_ADDRESS]: {
        name: '',
        street_address: '',
        locality: '',
        region: '',
        postal_code: ''
      },
      parentalStatus: '',
      reason: '',
      errorCount: 0,
      errors: NO_ERRORS
    };
  }

  selectNumberofChilds = e => {
    this.setState({ numberOfChildren: e.target.dataset.number });
  };

  updateChildName = e => {
    const idx = e.target.dataset.number;
    const names = [...this.state.childrenNames];
    names[idx] = e.target.value;
    this.setState({ childrenNames: names });
  };

  updateAddress = e => {
    const inputName = e.target.name;
    const addressType = e.target.dataset.addressType;
    const value = e.target.value;
    this.setState({
      [inputName]: {
        ...this.state[inputName],
        [addressType]: value
      }
    });
  };

  updateParentalStatus = e => {
    const idx = e.target.value;
    this.setState({ parentalStatus: idx });
  };

  updateParentalStatusText = e => {
    const reason = e.target.value;
    this.setState({ reason });
  };

  validate = (callback = () => {}) => {
    this.setState(
      () => ({
        errors: {
          childrenNames: this.state.childrenNames.length === 0,
          parentalStatus: this.state.parentalStatus.length === 1,
          reason:
            this.state.parentalStatus === '5'
              ? this.state.reason.length === 0
              : false,
          [`${MOTHER_ADDRESS}_street_address`]:
            this.state[MOTHER_ADDRESS].street_address.length === 0,
          [`${MOTHER_ADDRESS}_locality`]:
            this.state[MOTHER_ADDRESS].locality.length === 0,
          [`${MOTHER_ADDRESS}_region`]:
            this.state[MOTHER_ADDRESS].region.length === 0,
          [`${MOTHER_ADDRESS}_postal_code`]:
            this.state[MOTHER_ADDRESS].postal_code.length === 0,
          [`${FATHER_ADDRESS}_street_address`]:
            this.state[FATHER_ADDRESS].street_address.length === 0,
          [`${FATHER_ADDRESS}_locality`]:
            this.state[FATHER_ADDRESS].locality.length === 0,
          [`${FATHER_ADDRESS}_region`]:
            this.state[FATHER_ADDRESS].region.length === 0,
          [`${FATHER_ADDRESS}_postal_code`]:
            this.state[FATHER_ADDRESS].postal_code.length === 0,
          [`${CAREGIVER_ADDRESS}_street_address`]:
            this.state[CAREGIVER_ADDRESS].street_address.length === 0,
          [`${CAREGIVER_ADDRESS}_locality`]:
            this.state[CAREGIVER_ADDRESS].locality.length === 0,
          [`${CAREGIVER_ADDRESS}_region`]:
            this.state[CAREGIVER_ADDRESS].region.length === 0,
          [`${CAREGIVER_ADDRESS}_postal_code`]:
            this.state[CAREGIVER_ADDRESS].postal_code.length === 0
        }
      }),
      callback()
    );
  };

  renderChildrenInputs = () => {
    const inputs = [...Array(parseInt(this.state.numberOfChildren, 10))].map(
      (_, i) => {
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
        );
      }
    );
    return inputs;
  };

  renderAddress = (name, errors) => {
    return (
      <div>
        {errors && this.state.errors[`${name}_street_address`] ? (
          <span className="error">Please add a street address.</span>
        ) : null}
        <input
          onChange={this.updateAddress}
          value={this.state[name].name}
          type="text"
          className="form-control"
          name={name}
          data-address-type={'name'}
          placeholder="Name"
          aria-describedby="sizing-addon1"
        />
        {errors && this.state.errors[`${name}_locality`] ? (
          <span className="error">Please add a name.</span>
        ) : null}
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
        {errors && this.state.errors[`${name}_locality`] ? (
          <span className="error">Please add a city.</span>
        ) : null}
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
        {errors && this.state.errors[`${name}_region`] ? (
          <span className="error">Please add at state.</span>
        ) : null}
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
        {errors && this.state.errors[`${name}_postal_code`] ? (
          <span className="error">Please add a zip code.</span>
        ) : null}
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
    );
  };

  generateForm = () => {
    const { errors, childrenNames, ...inputInfo } = this.state;
    const errArray = Object.keys(errors).filter(errKey => {
      if (errors[errKey]) {
        return true;
      }
      return false;
    });

    if (errArray.length > 0) {
      this.setState(() => ({ errorCount: errArray.length }));
    } else {
      console.log('submitted')
      this.setState({ submitted: true })
    }
  };

  _submit = () => {
    this.setState(
      () => ({
        errors: NO_ERRORS
      }),
      this.validate(this.generateForm)
    );
  };

  renderForm() {
    const pluralizeChild =
      this.state.numberOfChildren > 1 ? 'Children' : 'Child';
    const errors = Object.keys(this.state.errors).reduce((acc, curr) => {
      if (this.state.errors[curr]) {
        acc = true;
      }
      return acc;
    }, false);
    return (
      <div className="container">
        <h1>POWER OF ATTORNEY FOR CARE OF A MINOR CHILD</h1>
        <p>
          Use of this form is authorized by T.C.A. § 34-6-301 et seq. Completion
          of this form, along with the proper signatures, is sufficient to
          authorize enrollment of a minor in school and to authorize medical
          treatment. However, a school district may require additional
          documentation/information as permitted by this section of Tennessee
          law before enrolling a child in school or any extracurricular
          activities.
        </p>
        <p>
          <strong>Part I:</strong> To be filled out and/or initialed by
          parent(s)/legal guardian(s)
        </p>
        <form method="post" action="javascript(void);" autoComplete="off">
          <div className="btn-group">
            <button className="btn dropdown-toggle" data-toggle="dropdown">{`${
              this.state.numberOfChildren
            } ${pluralizeChild}`}</button>
            <button className="btn dropdown-toggle" data-toggle="dropdown">
              <span className="caret" />
            </button>
            <ul
              className="dropdown-menu"
              role="menu"
              aria-labelledby="dropdownMenu"
            >
              {[...Array(20)].map((_, i) => {
                const number = i + 1;
                return (
                  <li key={number}>
                    <a
                      data-number={number}
                      onClick={this.selectNumberofChilds}
                    >
                      {number}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="row">
            <p>1. Minor Child's Name</p>
            {errors && this.state.errors.childrenNames ? (
              <span className="error">Please add at least on child.</span>
            ) : null}
            {this.renderChildrenInputs()}
          </div>
          <div className="row">
            <p>2. Mother/Legal Guardian’s Name & Address</p>{' '}
            {this.renderAddress(MOTHER_ADDRESS, errors)}
          </div>
          <div className="row">
            <p>3. Father/Legal Guardian’s Name & Address</p>{' '}
            {this.renderAddress(FATHER_ADDRESS, errors)}
          </div>
          <div className="row">
            <p>4. Caregiver’s Name & Address</p>{' '}
            {this.renderAddress(CAREGIVER_ADDRESS, errors)}
          </div>
          <div>
            <p> 5. Parental Status</p>
            {errors && this.state.errors.parental_status ? (
              <span className="error">Please add a parental status.</span>
            ) : null}
            {errors && this.state.errors.reason ? (
              <span className="error">Please add a reason.</span>
            ) : null}
            <div className="input-group">
              <div className="row">
                <span className="">
                  <input
                    type="radio"
                    onChange={this.updateParentalStatus}
                    value={0}
                    name="parental_status"
                    aria-label="parental_status"
                  />Both parents are living,have legal custody of the minor
                  child and have signed this document;
                </span>
              </div>
              <div className="row">
                <span className="">
                  <input
                    type="radio"
                    onChange={this.updateParentalStatus}
                    value={1}
                    name="parental_status"
                    aria-label="parental_status"
                  />One parent is deceased;
                </span>
              </div>
              <div className="row">
                <span className="">
                  <input
                    type="radio"
                    onChange={this.updateParentalStatus}
                    value={2}
                    name="parental_status"
                    aria-label="parental_status"
                  />
                  One parent has legal custody of the minor child and both
                  parents have signed this document and consent to the
                  appointment of the caregiver;
                </span>
              </div>
              <div className="row">
                <span className="">
                  <input
                    type="radio"
                    onChange={this.updateParentalStatus}
                    value={3}
                    name="parental_status"
                    aria-label="parental_status"
                  />{' '}
                  One parent has legal custody of the minor child, and has sent
                  by Certified Mail, Return Receipt requested, to the other
                  parent at last known address, a copy of this document and a
                  notice of the provisions in § 34-6-305;
                </span>
              </div>
              <div className="row">
                <span className="">
                  <input
                    type="radio"
                    onChange={this.updateParentalStatus}
                    value={4}
                    name="parental_status"
                    aria-label="parental_status"
                  />
                  or the non-custodial parent has not consented to the
                  appointment and consent cannot be obtained because
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
          <div className="row">
            {this.state.errorCount > 0 ? (
              <span className="error">{`The form has ${
                this.state.errorCount
              } error(s).`}</span>
            ) : null}
          </div>
          <button
            type="button"
            onClick={this._submit}
            className="btn btn-default"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  render () {
    console.log(this.state)
    if (this.state.submitted) {
      return <DownloadPDF data={this.state} />
    }
    return this.renderForm()
  }
}

export default PoAForm;
