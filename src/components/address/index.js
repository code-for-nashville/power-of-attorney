//@flow

import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {Box, FormField, TextInput} from 'grommet'

import {STATE_OPTIONS} from '../../strings'

type AddressKeysType =
  | 'name'
  | 'street_address'
  | 'locality'
  | 'region'
  | 'postal_code'

type AddressComponentPropType = {
  t: string => string,
  onChange: (inputName: string, value: string) => void,
  errors: {[AddressKeysType]: ?boolean},
  address: {[AddressKeysType]: ?boolean},
  name: string
}

type AddressComponentStateType = {}

export class AddressComponent extends Component<
  AddressComponentPropType,
  AddressComponentStateType
> {
  constructor(props: AddressComponentPropType) {
    super(props)
    this.state = {}
  }

  updateAddress = (
    e: SyntheticInputEvent<HTMLInputElement> & {option: {value: string}}
  ) => {
    const addressType = e.target.dataset.addressType
    let value = e.option ? e.option.value : e.target.value
    console.log({value, addressType})
    if (addressType === 'postal_code') {
      value = value.slice(0, 5)
    }
    this.props.onChange(addressType, value)
  }

  render() {
    const {address, errors, name, t} = this.props
    console.log({address})
    return (
      <Box margin={{vertical: 'medium'}}>
        <FormField
          label={t('name')}
          error={errors.name ? t('pleaseAddName') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class-long"
            value={address.name}
            name={name}
            data-address-type={'name'}
            margin="small"
          />
        </FormField>
        <FormField
          label={t('streetAddress')}
          error={errors.street_address ? t('streetAddress') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class-long"
            value={address.street_address}
            name={name}
            data-address-type={'street_address'}
          />
        </FormField>
        <FormField label={t('city')} error={errors.locality ? t('city') : null}>
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class"
            value={address.locality}
            name={name}
            data-address-type={'locality'}
          />
        </FormField>
        <FormField
          error={errors.region ? t('pleaseAddState') : null}
          label={t('state')}
        >
          <select
            onChange={this.updateAddress}
            className="input-class"
            value={address.region}
            name={name}
            data-address-type={'region'}
          >
            {STATE_OPTIONS.map(state => (
              <option value={state.value}>{state.label}</option>
            ))}
          </select>
        </FormField>
        <FormField
          label={t('zip')}
          error={errors.postal_code ? t('pleaseAddZip') : null}
        >
          <TextInput
            onDOMChange={this.updateAddress}
            className="input-class"
            value={address.postal_code}
            name={name}
            data-address-type={'postal_code'}
          />
        </FormField>
      </Box>
    )
  }
}

export default translate()(AddressComponent)
