import * as React from 'react';

import {
  Box,
  Button,
  Carousel,
  Form,
  FormField,
  Heading,
  Notification,
  NumberInput,
  Paragraph,
  RadioButton,
  Section,
  Select,
  TextInput
} from 'grommet';

import { Disclaimer, AsyncDownloadPDF } from '../../components';
import { MOTHER_ADDRESS, FATHER_ADDRESS, CAREGIVER_ADDRESS } from '../../pdf/pdf-document';
import Stepper from 'react-stepper-horizontal';
import { translate } from 'react-i18next';
import { STATE_OPTIONS } from '../../strings'
import './styles.css';


const NO_ERRORS = {
  step0: {
    childrenNames: false,
  },
  [MOTHER_ADDRESS]: {
    mother_street_address: false,
    mother_locality: false,
    mother_region: false,
    mother_postal_code: false,
  },
  [FATHER_ADDRESS]: {
    father_street_address: false,
    father_locality: false,
    father_region: false,
    father_postal_code: false,
  },
  [CAREGIVER_ADDRESS]: {
    caregiver_street_address: false,
    caregiver_locality: false,
    caregiver_region: false,
    caregiver_postal_code: false
  },
  step4: {
    parentalStatus: false,
    reason: false,
  }
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
    const value = e.option ? e.option.value : e.target.value;
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
    const step0Errors = { childrenNames: this.state.childrenNames.length !== this.state.numberOfChildren }
    const step1Errors = {
      [`${MOTHER_ADDRESS}_street_address`]:
        this.state[MOTHER_ADDRESS].street_address.length === 0,
      [`${MOTHER_ADDRESS}_locality`]:
        this.state[MOTHER_ADDRESS].locality.length === 0,
      [`${MOTHER_ADDRESS}_region`]:
        this.state[MOTHER_ADDRESS].region.length === 0,
      [`${MOTHER_ADDRESS}_postal_code`]:
        this.state[MOTHER_ADDRESS].postal_code.length === 0,
    }
    const step2Errors = {
      [`${FATHER_ADDRESS}_street_address`]:
        this.state[FATHER_ADDRESS].street_address.length === 0,
      [`${FATHER_ADDRESS}_locality`]:
        this.state[FATHER_ADDRESS].locality.length === 0,
      [`${FATHER_ADDRESS}_region`]:
        this.state[FATHER_ADDRESS].region.length === 0,
      [`${FATHER_ADDRESS}_postal_code`]:
        this.state[FATHER_ADDRESS].postal_code.length === 0,
    }
    const step3Errors = {
      [`${CAREGIVER_ADDRESS}_street_address`]:
        this.state[CAREGIVER_ADDRESS].street_address.length === 0,
      [`${CAREGIVER_ADDRESS}_locality`]:
        this.state[CAREGIVER_ADDRESS].locality.length === 0,
      [`${CAREGIVER_ADDRESS}_region`]:
        this.state[CAREGIVER_ADDRESS].region.length === 0,
      [`${CAREGIVER_ADDRESS}_postal_code`]:
        this.state[CAREGIVER_ADDRESS].postal_code.length === 0
    }
    const step4Errors = {
      parentalStatus: this.state.parentalStatus.length === 1,
      reason:
        this.state.parentalStatus === '5'
          ? this.state.reason.length === 0
          : false,
    }

    this.setState(
      (prevState) => ({
        errors: {
          step0: prevState.step > -1  ? step0Errors : NO_ERRORS.step0,
          [MOTHER_ADDRESS]: prevState.step > 0  ? step1Errors : NO_ERRORS[MOTHER_ADDRESS],
          [FATHER_ADDRESS]: prevState.step > 1 ? step2Errors : NO_ERRORS[FATHER_ADDRESS],
          [CAREGIVER_ADDRESS]: prevState.step > 2 ? step3Errors : NO_ERRORS[CAREGIVER_ADDRESS],
          step4: prevState.step > 3 ? step4Errors : NO_ERRORS.step4,

        }
      }),
      callback
    );
  };

  reduceErrors = () => {  
  const flatErrorObject = Object.keys(this.state.errors).reduce((acc, curr) => { 
    return {...acc, ...this.state.errors[curr]}
  }
  ,{})
  const errors =  Object.keys(flatErrorObject).reduce((acc, curr) => {
      if (flatErrorObject[curr]) {
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
    this.setState({ acceptedModal: true })
  };

  generateForm = () => {
    const errArray = this.reduceErrors()

    if (errArray.length > 0) {
      this.setState(() => ({ errorCount: errArray.length }));
    } else {
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
      this.setState((state) => ({ step: --state.step }));
  }

  _next = () => {
    if (this.state.step < 4) {
      this.validate(() => {
        const errors = this.reduceErrors()
        if (!errors) {
          this.setState(state => ({ step: state.step + 1 }))
        }
      })
    } else {
      this._submit()
    }
  }

  renderChildrenInputs = () => {
    const { t } = this.props;
    const inputs = [...Array(this.state.numberOfChildren)].map(
      (_, i) => {
        return (
          <FormField
            key={i}
            label={t('childsFullName')}
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
    const { t } = this.props;
    return (
      <Paragraph>
        {errors && this.state.errors[name][`${name}_street_address`] ? (
          <span className="error">{t('pleaseAddName')}</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class-long'
          value={this.state[name].name}
          name={name}
          data-address-type={'name'}
          placeHolder={t('name')}
          margin='small'
        />
        {errors && this.state.errors[name][`${name}_locality`] ? (
          <span className="error">{t('streetAddress')}</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class-long'
          value={this.state[name].street_address}
          name={name}
          data-address-type={'street_address'}
          placeHolder={t('streetAddress')}
        />
        {errors && this.state.errors[name][`${name}_locality`] ? (
          <span className="error">{t('pleaseAddCity')}</span>
        ) : null}
        {errors && this.state.errors[name][`${name}_region`] ? (
          <span className="error">{t('pleaseAddState')}</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class'
          value={this.state[name].locality}
          name={name}
          data-address-type={'locality'}
          placeHolder={t('city')}
        />
        <Select
          onChange={this.updateAddress}
          className='input-class'
          value={this.state[name].region}
          name={name}
          data-address-type={'region'}
          placeHolder={t('state')}
          options={STATE_OPTIONS}
        />
        {errors && this.state.errors[name][`${name}_postal_code`] ? (
          <span className="error">{t('pleaseAddZip')}</span>
        ) : null}
        <TextInput
          onDOMChange={this.updateAddress}
          className='input-class'
          value={this.state[name].postal_code}
          name={name}
          data-address-type={'postal_code'}
          placeHolder={t('zip')}
        />
      </Paragraph>
    );
  };

  renderStepOne() {
    const { t } = this.props;
    const errors = this.reduceErrors()
    return (
      <div>
        <FormField label={t('numberOfChildren')}>
          <NumberInput
            min={1}
            onChange={this.onNumberOfChildrenChange}
            value={this.state.numberOfChildren}
          />
        </FormField>

        <FieldHeader>{t('minorName')}</FieldHeader>
        {
          errors && this.state.errors.step0.childrenNames ?
            (<span className="error">{t('pleaseAddChildName')}</span>) :
            null
        }
        {this.renderChildrenInputs()}
      </div>
    )
  }

  renderStepTwo() {
    const { t } = this.props;
    return (
      <div>
        <FieldHeader>{t('motherName')}</FieldHeader>
        {this.renderAddress(MOTHER_ADDRESS)}
      </div>
    )
  }

  renderStepThree() {
    const { t } = this.props;
    return (<div>
      <FieldHeader>{t('fatherName')}</FieldHeader>
      {this.renderAddress(FATHER_ADDRESS)}
    </div>
    )
  }

  renderStepFour() {
    const { t } = this.props;
    return (
      <div>
        <FieldHeader>{t('caregiverName')}</FieldHeader>
        {this.renderAddress(CAREGIVER_ADDRESS)}
      </div>

    )
  }

  renderStepFive() {
    const { t } = this.props;
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
        <FieldHeader>{t('parentalStatus')}</FieldHeader>
        {
          errors && this.state.errors.parental_status ?
            (<span className="error">{t('pleaseAddParentalStatus')}</span>) :
            null
        }
        {
          errors && this.state.errors.reason ?
            (<span className="error">{t('pleaseAddReason')}</span>) :
            null
        }
        <FormField>
          {
            [
              ['parents-living', t('bothParents')],
              ['parent-deceased', t('parentDeceased')],
              ['legal-custody-signed', t('legalCustodySigned')],
              ['legal-custody-sent', t('legalCustodySent')],
              ['legal-custody-no-consent', t('legalCustodyNoConsent')]
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
              label={t('reasonNotReached')}
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
      default:
        return this.renderStepOne()
    }
  }

  render() {
    if (this.state.submitted) {
      return <AsyncDownloadPDF data={this.state} />;
    }

    // Hide the disclaimer if `acceptedModal` is true
    const disclaimer = (
      !this.state.acceptedModal ?
        <Disclaimer onClose={this.acceptModal} /> :
        null
    );
    const { t } = this.props;
    return (
      <Section>
        {disclaimer}
        <Heading tag='h1'>{t('powerOfAttorney')}</Heading>
        <div>

        <Stepper 
          steps={ 
            [
              {
                title: t('childInformation'),
                onClick: (e) => {
                  e.preventDefault();
                  this.renderStepOne();
                  this.setState((state) => ({ step: 0 }));
                }
              },
              {
                title: t('guardianInformation'),
                onClick: (e) => {
                e.preventDefault();
                this.renderStepTwo();
                this.setState((state) => ({ step: 1 }));
              }
            },
            {
              title: t('caregiversInformation'),
              onClick: (e) => {
                e.preventDefault();
                this.renderStepThree();
                this.setState((state) => ({ step: 2 }));
              }
            },
            {
              title: t('parentalstatus'),
              onClick: (e) => {
                e.preventDefault();
                this.renderStepFour();
                this.setState((state) => ({ step: 3 }));
              }
            },
          ] 
        } 
        activeColor="#679ba1"
        completeColor="#679ba1"
        activeBorderColor="#679ba1"
        activeStep={ this.state.step }
        />
        </div>

        <Paragraph className="align-center">
          <strong>{t('partI')}</strong>{t('thisFormIsToBeFilled')}
        </Paragraph>

        <Form autoComplete="off" className="align-center">
          <Carousel
            activeIndex={this.state.step}
            autoplay={false}
            // persistentNav={false} // Hiding the nav with css because setting this prop causes an infinite update
            infinite={false}
          >
            {this.renderStepOne()}
            {this.renderStepTwo()}
            {this.renderStepThree()}
            {this.renderStepFour()}
            {this.renderStepFive()}

          </Carousel>
          {
            this.state.errorCount > 0 ?
              (<Notification
                message={t('formWithErrors', {errorCount: this.state.errorCount})}
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
              label={t('back')}
              onClick={this._back}
              primary={true}
              style={this.state.step === 0 ? { backgroundColor: 'grey', borderColor: 'grey' } : {}}
            />
            <Button
              label={this.state.step === 4 ? t('submit') : t('next')}
              onClick={this._next}
              primary={true}
            />
          </Box>
        </Form>
      </Section>
    )
  }
}

export default translate()(PoAForm);
