/* eslint-env jest */

const { shallow } = require('enzyme')
const React = require('react')
const renderer = require('react-test-renderer')
import { Details } from '../../components/users/Details.js'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
configure({ adapter: new Adapter() })

describe('Details Component', () => {
    const profile = {
        name: 'Aaron',
        age: '42',
        email: 'fakeemail@gmail.com',
        owner: 1,
        is_staff: true,
        is_superuser: false,
        is_active: true,
    }
    const form_fields = { name: 'aaron', email: 'bla@bla.bla', age: 42, password: undefined }
    const component = shallow(<Details profile={profile} form_fields={form_fields} />)

    it('component exists', () => {
        expect(component.exists()).toBe(true)
    })
    it('Displays correct fields', () => {
        let email = component.find('.user_crud__details_email')
        expect(email.text()).toEqual('email: fakeemail@gmail.com')

        let age = component.find('.user_crud__details_age')
        expect(age.text()).toEqual('age: 42')
    })
    it('Does not display incorrect fields', () => {
        let is_staff = component.find('.user_crud__details_is_staff')
        expect(is_staff.exists()).toBe(false)

        let is_active = component.find('.user_crud__details_is_active')
        expect(is_active.exists()).toBe(false)
    })
})
