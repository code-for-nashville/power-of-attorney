import * as React from 'react';

import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
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
  childrenNames: false,
  [`${MOTHER_ADDRESS}_street_address`]: false,
  [`${MOTHER_ADDRESS}_locality`]: false,
  [`${MOTHER_ADDRESS}_region`]: false,
  [`${MOTHER_ADDRESS}_postal_code`]: false,
  [`${FATHER_ADDRESS}_street_address`]: false,
  [`${FATHER_ADDRESS}_locality`]: false,
  [`${FATHER_ADDRESS}_region`]: false,
  [`${FATHER_ADDRESS}_postal_code`]: false,
  [`${CAREGIVER_ADDRESS}_street_address`]: false,
  [`${CAREGIVER_ADDRESS}_locality`]: false,
  [`${CAREGIVER_ADDRESS}_region`]: false,
  [`${CAREGIVER_ADDRESS}_postal_code`]: false,
  parentalStatus: false,
  reason: false
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
    const errors = {
      childrenNames: this.state.childrenNames.length !== this.state.numberOfChildren,
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
        this.state[CAREGIVER_ADDRESS].postal_code.length === 0,
      parentalStatus: this.state.parentalStatus.length === 1,
      reason: this.state.parentalStatus === '5'
          ? this.state.reason.length === 0
          : false,
    }

    this.setState(
      () => ({ errors: errors }),
      callback
    );
  };

  hasErrors = () => {
    for (let hasError of Object.values(this.state.errors)) {
      if (hasError) return true
    }
    return false
  }

  onNumberOfChildrenChange = (event) => {
    const num = parseInt(event.target.value, 10)
    this.setState(s => {
      return { numberOfChildren: num, childrenNames: s.childrenNames.slice(0, num)}
    });
  };

  acceptModal = () => {
    this.setState({ acceptedModal: true })
  };

  _submit = () => {
    if (!this.hasErrors()) {
      this.setState({ submitted: true })
    }
  };

  submit = () => {
    this.validate(this._submit)
  };

  _back = () => {
    if (this.state.step > 0)
      this.setState((state) => ({ step: --state.step }));
  }

  _next = () => {
    if (this.state.step < 4) {
      this.validate(() => {
        debugger
        if (!this.hasErrors()) {
          this.setState(state => ({ step: state.step + 1 }))
        }
      })
    } else {
      this.submit()
    }
  }

  renderChildrenInputs = () => {
    const { t } = this.props;
    const inputs = [...Array(this.state.numberOfChildren)].map(
      (_, i) => {
        return (
          <Box pad={{vertical: 'small'}}>
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
          </Box>
        );
      }
    );
    return inputs;
  };

  renderAddress = (name) => {
    const { t } = this.props;
    return (
      <Box>
        <FormField
          label={t('name')}
          error={this.state.errors[`${name}_street_address`] ? t('pleaseAddName') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className='input-class-long'
            value={this.state[name].name}
            name={name}
            data-address-type={'name'}
            margin='small'
          />
        </FormField>
        <FormField
          label={t('streetAddress')}
          error={this.state.errors[`${name}_locality`] ? t('streetAddress') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className='input-class-long'
            value={this.state[name].street_address}
            name={name}
            data-address-type={'street_address'}
          />
        </FormField>
        <FormField
          label={t('city')}
          error={this.state.errors[`${name}_locality`] ? t('city') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className='input-class'
            value={this.state[name].locality}
            name={name}
            data-address-type={'locality'}
          />
        </FormField>
        <FormField
          error={this.state.errors[`${name}_region`] ? t('pleaseAddState') : null}
          label={t('state')}
        >
          <Select
            onChange={this.updateAddress}
            className='input-class'
            value={this.state[name].region}
            name={name}
            data-address-type={'region'}
            options={STATE_OPTIONS}
            placeHolder={t('chooseOne')}
          />
        </FormField>
        <FormField
          label={t('zip')}
          error={this.state.errors[`${name}_postal_code`] ? t('pleaseAddZip') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className='input-class'
            value={this.state[name].postal_code}
            name={name}
            data-address-type={'postal_code'}
          />
        </FormField>
      </Box>
    );
  };

  renderStepOne() {
    const { t } = this.props;
    return (
    <Box>
        <FormField label={t('numberOfChildren')}>
          <NumberInput
            min={1}
            onChange={this.onNumberOfChildrenChange}
            value={this.state.numberOfChildren}
          />
        </FormField>

        <Paragraph>
          <FieldHeader>{t('minorName')}</FieldHeader>
          {
            this.state.errors.childrenNames ?
              (<span className="error">{t('pleaseAddChildName')}</span>) :
              null
          }
        </Paragraph>
        {this.renderChildrenInputs()}
      </Box>
    )
  }

  renderStepTwo() {
    const { t } = this.props;
    return (
      <div>
        <FieldHeader>{t('motherName')}</FieldHeader>
        <Paragraph>
          {this.renderAddress(MOTHER_ADDRESS)}
        </Paragraph>
      </div>
    )
  }

  renderStepThree() {
    const { t } = this.props;
    return (<div>
      <FieldHeader>{t('fatherName')}</FieldHeader>
      <Paragraph>
        {this.renderAddress(FATHER_ADDRESS)}
      </Paragraph>
    </div>
    )
  }

  renderStepFour() {
    const { t } = this.props;
    return (
      <div>
        <FieldHeader>{t('caregiverName')}</FieldHeader>
        <Paragraph>
          {this.renderAddress(CAREGIVER_ADDRESS)}
        </Paragraph>
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

    return (
      <div>
        <FieldHeader>{t('parentalStatus')}</FieldHeader>
        {
          this.state.errors.parental_status ?
            (<span className="error">{t('pleaseAddParentalStatus')}</span>) :
            null
        }
        {
          this.state.errors.reason ?
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
                onClick: () => {
                  this.setState((state) => ({ step: 0 }));
                }
              },
              {
                title: t('guardianInformation'),
                onClick: () => {
                this.setState((state) => ({ step: 1 }));
              }
            },
            {
              title: t('caregiversInformation'),
              onClick: () => {
                this.setState((state) => ({ step: 2 }));
              }
            },
            {
              title: t('parentalstatus'),
              onClick: () => {
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
          <Box
            pad={{vertical: 'medium'}}
          >
            {this.renderForm()}
          </Box>
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
