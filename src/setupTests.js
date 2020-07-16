import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'

Enzyme.configure({adapter: new Adapter()})

jest.mock('react-i18next', () => ({
  __esModule: true,
  I18nextProvider: Component => Component.children,
  // this mock makes sure any components using the translate HoC receive the t function as a prop
  translate: () => Component => {
    Component.defaultProps = {...Component.defaultProps, t: () => ''}
    return Component
  }
}))
