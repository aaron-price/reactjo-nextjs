import Link from 'next/link'
import Layout from '../components/MyLayout.js'
import "isomorphic-fetch"
import React, { Component } from 'react'
import { profile_list } from '../services/profile_requests.js'
// import { login_request } from '../functions/user_auth.js'
// import { get_cookie, set_cookie } from '../functions/cookies.js'
// import { view_profile } from '../functions/view_profile.js'

class Index extends Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: '',
			all_profiles: [],
			err: false
		}
		this.update_profile = this.update_profile.bind(this)
	}

	get_all_profiles() {
		let profiles_promise = profile_list()
		profiles_promise.then((profiles) => {
			this.setState({all_profiles: profiles})
		})
	}

	update_profile(e) {
		e.preventDefault()
		const id = Number(e.target.id.value)
		const username = e.target.username.value
		const email = e.target.email.value
		const password = e.target.password.value
		const body = {
			'id': id,
			'name': username,
			'email': email,
			'password': password
		}

		fetch(`http://localhost:8000/api/profile/${id}/`, {
				method: "put",
				mode: "cors",
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				},
				name: username,
				email: email,
				password: password,
				body: JSON.stringify(body)
		})
		.catch(err => console.log(err))
	}

	render() {
		return (
			<div>
				<h1>hi.</h1>
				ALL PROFILES
				{this.state.all_profiles.map((p, key) => {
					return (
						<ul key={key}>
							<li>id {p.id}</li>
							<li>name {p.name}</li>
							<li>email {p.email}</li>
						</ul>
					)
				})}
				<div>
					<button onClick={() => this.get_all_profiles()}>get all profiles</button>
					<form onSubmit={(data) => this.update_profile(data)}>
						<br/>
						<label>id </label>
						<input name='id' type='text' placeholder={this.state.profile.id}></input>

						<br/><br/>
						<label>username </label>
						<input name='username' type='text' placeholder={this.state.profile.name}></input>

						<br/><br/>
						<label>email </label>
						<input name='email' type='email' placeholder={this.state.profile.email}></input>

						<br/><br/>
						<label>password </label>
						<input name='password' type='password'></input>

						<br/>
						<input type="submit" value="Submit" />
					</form>
				</div>
			</div>
		)
	}
}


export default Index
