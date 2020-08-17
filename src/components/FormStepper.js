import React from 'react'
import {useState} from 'react'
import {Form, Box, Button, Heading, Paragraph} from 'grommet'
import {
  useLocation,
  useHistory,
  useRouteMatch,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import {withTranslation} from 'react-i18next'
import Disclaimer from './disclaimer'
import Stepper from 'react-stepper-horizontal'
import {POA_CORAL_BLUE} from '../styles/grommet/theme'

const FormStep = ({
  stepPath,
  title,
  render,
  mapFormStateToFields,
  mapFieldsToFormState
}) => {}

const InnerFormStep = ({
  initialState,
  onComplete,
  onBack,
  t,
  component,
  mapFormStateToFields,
  mapFieldsToFormState
}) => {
  const [fields, setFields] = useState(mapFormStateToFields(initialState))
  return (
    <Box direction="row" justify="center" alignContent="center">
      <Box width="large" align="center" alignContent="center">
        <Form
          value={fields}
          onChange={setFields}
          validate="blur"
          onSubmit={({value: fields}) =>
            onComplete(mapFieldsToFormState(fields))
          }
        >
          <Box pad={{vertical: 'medium'}}>
            {React.createElement(component, {fields})}
          </Box>
          <Box
            alignSelf="center"
            direction="row"
            justify="between"
            basis="medium"
            className="button-box"
          >
            {onBack ? (
              <Button
                label={t('back')}
                onClick={onBack}
                primary={false}
                className="button hidden-large"
              />
            ) : null}
            <Button
              label={t('next')}
              primary={true}
              type="submit"
              className="button"
            />
          </Box>
        </Form>
      </Box>
    </Box>
  )
}

const createStepRoute = (
  basePath,
  initialState,
  t,
  onComplete,
  onBack,
  formStepChild
) => {
  const {
    stepPath,
    component,
    mapFormStateToFields,
    mapFieldsToFormState
  } = formStepChild.props
  return (
    <Route key={stepPath} path={`${basePath}/${stepPath}`}>
      <InnerFormStep
        initialState={initialState}
        onComplete={onComplete}
        onBack={onBack}
        t={t}
        component={component}
        mapFormStateToFields={mapFormStateToFields}
        mapFieldsToFormState={mapFieldsToFormState}
      />
    </Route>
  )
}

const getCurrentStep = (baseUrl, pathname, stepPaths) => {
  for (const [stepNumber, stepPath] of stepPaths.entries()) {
    if (pathname.startsWith(`${baseUrl}/${stepPath}`)) {
      return {currentStepPath: stepPath, currentStepNumber: stepNumber}
    }
  }
  return {}
}

const getAdjacentStepUrls = (baseUrl, currentStepPath, stepPaths) => {
  let previousStepPath = undefined
  for (const [stepNumber, stepPath] of stepPaths.entries()) {
    let nextStepPath =
      stepNumber + 1 >= stepPaths.length ? undefined : stepPaths[stepNumber + 1]
    if (stepPath === currentStepPath) {
      return {
        previousStepUrl: previousStepPath
          ? `${baseUrl}/${previousStepPath}`
          : undefined,
        nextStepUrl: nextStepPath ? `${baseUrl}/${nextStepPath}` : undefined
      }
    }
    previousStepPath = stepPath
  }
  return {}
}

const FormStepper = ({initialFormState, onFormComplete, t, children}) => {
  const {url, path} = useRouteMatch()
  const [formState, setFormState] = useState(initialFormState)
  const history = useHistory()
  const {pathname} = useLocation()
  const stepPaths = React.Children.map(children, child => child.props.stepPath)
  const {currentStepPath, currentStepNumber} = getCurrentStep(
    url,
    pathname,
    stepPaths
  )
  const {previousStepUrl, nextStepUrl} = getAdjacentStepUrls(
    url,
    currentStepPath,
    stepPaths
  )
  const onComplete = nextStepUrl
    ? formStateUpdates => {
        setFormState(formState => ({...formState, ...formStateUpdates}))
        history.push(nextStepUrl)
      }
    : formStateUpdates => {
        setFormState(formState => ({...formState, ...formStateUpdates}))
        const finalFormState = {...formState, ...formStateUpdates}
        onFormComplete(finalFormState)
      }
  const onBack = previousStepUrl
    ? () => history.push(previousStepUrl)
    : undefined
  const stepperBarSteps = React.Children.map(children, child => ({
    title: child.props.title,
    onClick: () => history.push(`${url}/${child.props.stepPath}`)
  }))
  return (
    <Box tag="section" basis="auto">
      <Disclaimer />
      <Heading tag="h1">{t('powerOfAttorney')}</Heading>
      <div>
        <div className="stepper">
          <Stepper
            steps={stepperBarSteps}
            activeColor={POA_CORAL_BLUE}
            completeColor={POA_CORAL_BLUE}
            activeBorderColor={POA_CORAL_BLUE}
            activeStep={currentStepNumber}
          />
        </div>
      </div>
      <Paragraph className="align-center">
        <strong>{t('partI')} </strong>
        {t('thisFormIsToBeFilled')}
      </Paragraph>
      <Box direction="row" justify="center">
        <Box width="large">
          <Switch>
            {React.Children.map(children, child =>
              createStepRoute(path, formState, t, onComplete, onBack, child)
            )}
            {/* If no more specific route matches, redirect to the first step */}
            <Redirect to={`${url}/${stepPaths[0]}`} />
          </Switch>
        </Box>
      </Box>
    </Box>
  )
}

export {FormStep}
export default withTranslation()(FormStepper)
