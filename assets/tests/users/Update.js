/* eslint-env jest */

const { shallow, mount } = require('enzyme')
const React = require('react')
const renderer = require('react-test-renderer')
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
const muiTheme = getMuiTheme({ userAgent: false })
import { Update } from '../../components/users/Update.js'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
configure({ adapter: new Adapter() })

describe('Update Component', () => {
    const all_fields = ['name', 'email', 'password', 'age']
    const errors = { name: '', email: '', password: '' }
    const current_user = {
        id: '1',
        name: 'aaron',
        is_staff: false,
        is_superuser: false,
        is_active: true
    }
    const profile = {
        id: 1,
        name: 'aaron',
        email: 'bla@bla.bla',
        age: 42,
        owner: 1,
        is_staff: false,
        is_superuser: false,
        is_active: true
    }
    let show_form = true
    const show_hide_form = () => {}
    const update_form = () => {}
    const submit_form = () => {}


    let component = mount(
        <MuiThemeProvider muiTheme={muiTheme}>
            <Update
                all_fields={all_fields}
                errors={errors}
                current_user={current_user}
                profile={profile}
                show_form={show_form}
                show_hide_form={show_hide_form}
                update_form={update_form}
                submit_form={submit_form} />
        </MuiThemeProvider>
    )

    it('exists', () => {
        expect(component.exists()).toBe(true)
    })

    it('renders the correct input fields when open', () => {
        expect(component.find('.user_crud__update_name').exists()).toBe(true)
        expect(component.find('.user_crud__update_email').exists()).toBe(true)
        expect(component.find('.user_crud__update_age').exists()).toBe(true)
        expect(component.find('.user_crud__update_password').exists()).toBe(true)
    })

    it('renders nothing when closed', () => {
        show_form = false
        component = mount(
            <MuiThemeProvider muiTheme={muiTheme}>
                <Update
                    all_fields={all_fields}
                    errors={errors}
                    current_user={current_user}
                    profile={profile}
                    show_form={show_form}
                    show_hide_form={show_hide_form}
                    update_form={update_form}
                    submit_form={submit_form} />
            </MuiThemeProvider>
        )

        expect(component.find('.user_crud__update_name').exists()).toBe(false)
        expect(component.find('.user_crud__update_email').exists()).toBe(false)
        expect(component.find('.user_crud__update_age').exists()).toBe(false)
        expect(component.find('.user_crud__update_password').exists()).toBe(false)
    })

})
