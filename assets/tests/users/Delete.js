/* eslint-env jest */

const { shallow } = require('enzyme')
const React = require('react')
const renderer = require('react-test-renderer')
import { Delete } from '../../components/users/Delete.js'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'
configure({ adapter: new Adapter() })

describe('Delete Component', () => {
    it('component exists', () => {
        const component = shallow(<Delete />)
        expect(component.exists()).toBe(true)
    })
})
