/* eslint-env jest */

const { shallow } = require('enzyme')
const React = require('react')
const renderer = require('react-test-renderer')
import { Delete } from '../../components/users/Delete.js'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
configure({ adapter: new Adapter() })

describe('Delete Component', () => {
    let clicked = false
    function click_handler() { clicked = true }
    const component = shallow(<Delete delete_item={click_handler.bind(this)} />)

    it('component exists', () => {
        expect(component.exists()).toBe(true)
    })
    it('executes prop function upon click', () => {
        expect(clicked).toBe(false)
        component.find('.user_crud__delete_btn').simulate('click')
        expect(clicked).toBe(true)
    })
})
