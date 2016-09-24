import React, {Component} from 'react';
import {AUTH_URL, REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, TOKEN_URL} from '../config';
import axios from 'axios';
import querystring from 'querystring';
import FileList from './fileList';
import UserInformation from './userInformation';

export default class MainPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tokenData: "",
			userInfo: "",
			files: [],
			activeData: ""
		};

		this.getToken = this.getToken.bind(this);
		this.getUserInfo = this.getUserInfo.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.getFiles = this.getFiles.bind(this);
	}

	getToken() {
		axios({
			method: 'post',
			url: TOKEN_URL,
			data: querystring.stringify({
				code: this.props.location.query.code,
				grant_type: "authorization_code",
				redirect_uri: REDIRECT_URI,
				client_id: CLIENT_ID,
				client_secret: CLIENT_SECRET
			})
		})
			.then(response => {
				this.setState({tokenData: response.data});
			})
			.catch(error => {
				console.log(error);
			});
	}

	getUserInfo() {
		if (!this.state.userInfo) {
			axios({
				method: 'post',
				url: "https://api.dropboxapi.com/2/users/get_account",
				headers: {
					"Authorization": "Bearer " + this.state.tokenData.access_token,
					"Content-Type": "application/json"
				},
				data: JSON.stringify({
					account_id: this.state.tokenData.account_id
				})
			})
				.then(response => {
					console.log(response);
					this.setState({
						userInfo: response.data,
						activeData: "userInfo"
					});
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			this.setState({ activeData: "userInfo" });
		}

	}

	uploadImage() {
		const file = document.querySelector('input[type=file]').files[0];
		if (file) {
			axios({
				method: 'post',
				url: "https://content.dropboxapi.com/2/files/upload",
				headers: {
					"Authorization": "Bearer " + this.state.tokenData.access_token,
					"Content-Type": "application/octet-stream",
					"Dropbox-API-Arg": JSON.stringify({
						"path": "/Images/" + file.name,
						"mode": "add",
						"autorename": true,
						"mute": false
					})
				},
				data: file
			})
				.then(response => {
					console.log(response);
					this.setState({fileUploaded: true});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	getFiles() {
		axios({
			method: 'post',
			url: 'https://api.dropboxapi.com/2/files/list_folder',
			headers: {
				"Authorization": "Bearer " + this.state.tokenData.access_token,
				"Content-Type": "application/json"
			},
			data: JSON.stringify({
				path: "/Images/"
			})
		}).then(response => {
			this.setState({
				files: response.data.entries,
				activeData: "files"
			});
			console.log(response);
		}).catch(error => {
			console.log(error);
		});
	}

	renderGetToken() {
		return this.props.location.query.code && !this.state.tokenData ?
			<button className="btn btn-primary" style={{marginBottom: "20px"}} onClick={this.getToken}>Get token</button> : null;
	}

	renderAuthenticate() {
		return this.props.location.query.code ? null : <a href={AUTH_URL}>
			<button className="btn btn-primary" style={{marginBottom: "20px"}}>Authenticate</button>
		</a>;
	}

	renderActions() {
		const disabled = this.state.tokenData ? "" : "disabled";
		const columnClassName = "col-md-8 col-md-offset-4 centeredColumns";
		const buttonClassName = "btn btn-primary actionButton " + disabled;
		return (
			<div>
				<div className="row">
					<div className={columnClassName}>
						<button className={buttonClassName} onClick={this.getUserInfo}>Get user information</button>
					</div>
				</div>
				<div className="row">
					<div className={columnClassName}>
						<button className={buttonClassName} onClick={this.getFiles}>List files</button>
					</div>
				</div>
				<div className="row">
					<div className={columnClassName}>
						<button className={buttonClassName} onClick={this.uploadImage}>Upload file</button>
						<input className={"btn btn-primary fileInput actionButton " + disabled} type='file'/>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="container" style={{textAlign: "center", paddingTop: "5%"}}>
				{ this.renderAuthenticate() }
				{ this.renderGetToken() }
				{ this.renderActions() }
				{ this.state.fileUploaded ? <p>File uploaded</p> : null }
				{ this.state.activeData === "userInfo" ? <UserInformation userInfo={this.state.userInfo} /> : null }
				{ this.state.activeData === "files" ? <FileList files={this.state.files} /> : null }
			</div>
		);
	}
}