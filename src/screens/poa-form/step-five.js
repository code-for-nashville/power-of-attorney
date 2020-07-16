// @flow

import * as React from 'react'
import {Header} from 'grommet'
import {translate} from 'react-i18next'
import {AUTHORITY_GIVEN_CONDITIONS, HARDSHIPS} from '../../pdf/pdf-document'
import {RadioBox, MultiSelectBox} from '../../components'

const StepFive = ({
  errorCondition,
  choiceCondition,
  valueCondition,
  onChangeCondition,
  errorHardship,
  choiceHardship,
  valueHardship,
  onChangeHardship,
  onChangeFreeAnswer,
  describeHardship,
  t
}) => (
  <div>
    <Header>{t('condition')}</Header>
    <RadioBox
      choice={choiceCondition}
      onChange={onChangeCondition}
      error={errorCondition}
      options={Object.values(AUTHORITY_GIVEN_CONDITIONS)}
      value={valueCondition}
    />
    <Header>{t('hardships')}</Header>
    <MultiSelectBox
      choice={choiceHardship}
      onChange={onChangeHardship}
      onChangeFreeAnswer={onChangeFreeAnswer}
      error={errorHardship}
      options={Object.values(HARDSHIPS)}
      value={valueHardship}
      freeTextKey={HARDSHIPS.describe}
      freeTextLabel={t('pleaseDescribe')}
      freeTextValue={describeHardship}
    />
  </div>
)

// 4. Temporary caregiving authority regarding the minor child/children is being given to the caregiver

export default translate()(StepFive)
