import * as React from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Notification,
  NumberInput,
  Paragraph,
  RadioButton,
  Section,
  TextInput
} from 'grommet';

import { Disclaimer, DownloadPDF } from '../../components';
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

const FieldHeader = (props) => (<div {...props} />);

class PoAForm extends React.Component {
  static navigationOptions = ({ navigation }) => ({});

  constructor(props) {
    super(props);
    this.state = {
      acceptedModal: false,
      step: 0,
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

  updateParentalStatus = (event) => {
    this.setState({ parentalStatus: event.target.value });
  };

  updateParentalStatusText = e => {
    const reason = e.target.value;
    this.setState({ reason });
  };

  validate = (callback = () => { }) => {
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

  reduceErrors = () => {
    const errors = Object.keys(this.state.errors).reduce((acc, curr) => {
      if (this.state.errors[curr]) {
        acc = true;
      }
      return acc;
    }, false);
    return errors
  }

  onNumberOfChildrenChange = (event) => {
    this.setState({ numberOfChildren: parseInt(event.target.value, 10) });
  };

  acceptModal = () => {
    this.setState({acceptedModal: true})
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
      //
      //TODO This logic need to be fix
      //
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

  _back = () => {
    if (this.state.step > 0)
      this.setState((state) => ({ step: --state.step }))
  }

  _next = () => {
    if (this.state.step < 4)
      this.setState((state) => ({ step: ++state.step }))
  }

  renderChildrenInputs = () => {
    const inputs = [...Array(this.state.numberOfChildren)].map(
      (_, i) => {
        return (
          <FormField
            key={i}
            label={`Child ${i + 1}${'\''}s full name`}
          >
            <TextInput
              data-number={i}
              onDOMChange={this.updateChildName}
              value={this.state.childrenNames[i]}
            />
          </FormField>
        );
      }
    );
    return inputs;
  };

  renderAddress = (name) => {
    const errors = this.reduceErrors()
    return (
      <Paragraph>
        {errors && this.state.errors[`${name}_street_address`] ? (
          <span className="error">Please add a street address.</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class-long'
          value={this.state[name].name}
          name={name}
          data-address-type={'name'}
          placeHolder="Name"
          margin='small'
        />
        {errors && this.state.errors[`${name}_locality`] ? (
          <span className="error">Please add a name.</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class-long'
          value={this.state[name].street_address}
          name={name}
          data-address-type={'street_address'}
          placeHolder="Street Address"
        />
        {errors && this.state.errors[`${name}_locality`] ? (
          <span className="error">Please add a city.</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class'
          value={this.state[name].locality}
          name={name}
          data-address-type={'locality'}
          placeHolder="City"
        />
        {errors && this.state.errors[`${name}_region`] ? (
          <span className="error">Please add at state.</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class'
          value={this.state[name].region}
          name={name}
          data-address-type={'region'}
          placeHolder="State"
        />
        {errors && this.state.errors[`${name}_postal_code`] ? (
          <span className="error">Please add a zip code.</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class'
          value={this.state[name].postal_code}
          name={name}
          data-address-type={'postal_code'}
          placeHolder="Zip Code"
        />
      </Paragraph>
    );
  };

  renderStepOne() {
    const errors = this.reduceErrors()
    return (
      <div>
        <FormField label="Number of children">
          <NumberInput
            min={1}
            onChange={this.onNumberOfChildrenChange}
            value={this.state.numberOfChildren}
          />
        </FormField>

        <FieldHeader>1. Minor Child{'\''}s Name</FieldHeader>
        {
          errors && this.state.errors.childrenNames ?
            (<span className="error">Please add the name of each child.</span>) :
            null
        }
        {this.renderChildrenInputs()}
      </div>
    )
  }

  renderStepTwo() {
    return (
      <div>
        <FieldHeader>2. Mother/Legal Guardian’s Name & Address</FieldHeader>
        {this.renderAddress(MOTHER_ADDRESS)}
      </div>
    )
  }

  renderStepThree() {
    return (<div>
      <FieldHeader>3. Father/Legal Guardian’s Name & Address</FieldHeader>
      {this.renderAddress(FATHER_ADDRESS)}
    </div>
    )
  }

  renderStepFour() {
    return (
      <div>
        <FieldHeader>4. Caregiver’s Name & Address</FieldHeader>
        {this.renderAddress(CAREGIVER_ADDRESS)}
      </div>

    )
  }

  renderStepFive() {
    const ParentRadioButton = (props) => (
      <RadioButton
        checked={props.value === this.state.parentalStatus}
        id={`parental-status-${props.value}`}
        name='parental_status'
        onChange={this.updateParentalStatus}
        {...props}
      />
    )
    const errors = this.reduceErrors()
    return (
      <div>
        <FieldHeader>5. Parental Status</FieldHeader>
        {
          errors && this.state.errors.parental_status ?
            (<span className="error">Please add a parental status.</span>) :
            null
        }
        {
          errors && this.state.errors.reason ?
            (<span className="error">Please add a reason.</span>) :
            null
        }
        <FormField>
          {
            [
              ['parents-living', 'Both parents are living, have legal custody of the minor child and have signed this document'],
              ['parent-deceased', 'One parent is deceased'],
              ['legal-custody-signed', 'One parent has legal custody of the minor child and both parents have signed this document and consent to the appointment of the caregiver'],
              ['legal-custody-sent', 'One parent has legal custody of the minor child, and has sent by Certified Mail, Return Receipt requested, to the other parent at last known address, a copy of this document and a notice of the provisions in § 34-6-305;'],
              ['legal-custody-no-consent', 'The non-custodial parent has not consented to the appointment and consent cannot be obtained.']
            ].map(
              ([value, label]) => (<ParentRadioButton label={label} key={value} value={value} />)
            )
          }
        </FormField>
        {
          // Conditionally render a reason they could not be reached when 4
          // is selected.
          this.state.parentalStatus === 'legal-custody-no-consent' ?
            <FormField
              label='Reason non-custodial parent could not be reached:'
            >
              <TextInput
                name='parent-status-reason'
                onInput={this.updateParentalStatusText}
                value={this.state.reason}
              />
            </FormField> :
            null
        }
      </div>
    )
  }

  renderForm() {
    switch (this.state.step) {
      case 0:
        return this.renderStepOne()
      case 1:
        return this.renderStepTwo()
      case 2:
        return this.renderStepThree()
      case 3:
        return this.renderStepFour()
      case 4:
        return this.renderStepFive()
    }
  }

  render() {
    const errors = this.reduceErrors()
    if (this.state.submitted) {
      return <DownloadPDF data={this.state} />;
    }

    // Hide the disclaimer if `acceptedModal` is true
    const disclaimer = (
      !this.state.acceptedModal ?
      <Disclaimer onClose={this.acceptModal}/> :
      null
    );

    return (
      <Section>
        {disclaimer}
        <Heading tag='h1'>POWER OF ATTORNEY FOR CARE OF A MINOR CHILD</Heading>
        <Paragraph>
          Use of this form is authorized by T.C.A. § 34-6-301 et seq. Completion
          of this form, along with the proper signatures, is sufficient to
          authorize enrollment of a minor in school and to authorize medical
          treatment. However, a school district may require additional
          documentation/information as permitted by this section of Tennessee
          law before enrolling a child in school or any extracurricular
          activities.
    </Paragraph>
        <Paragraph>
          <strong>Part I:</strong> To be filled out and/or initialed by
          parent(s)/legal guardian(s)
    </Paragraph>


        <Form autoComplete="off">
          {this.renderForm()}
          {
            this.state.errorCount > 0 ?
              (<Notification
                message={`The form has ${this.state.errorCount} error(s)`}
                status='critical'
              />) :
              null
          }
          <Box
            direction='row'
            justify='between'
            basis='medium'
            className='button-box'
          >
            <Button
              label="Back"
              onClick={this._back}
              primary={true}
              style={this.state.step === 0 ? {backgroundColor: 'grey', borderColor: 'grey'}: {}}
            />
            <Button
              label={this.state.step === 4 ? "Submit" : "Next"}
              onClick={this._next}
              primary={true}
            />
          </Box>
        </Form>
      </Section>
    )
  }
}

export default PoAForm;
