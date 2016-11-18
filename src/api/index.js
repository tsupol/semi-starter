import jwt from 'jsonwebtoken';
require('es6-promise').polyfill();
require('isomorphic-fetch');

function baseUrl(endpoint) {
	let endpointStr = endpoint ? (endpoint.substr(0, 1) == '/' ? endpoint : '/' + endpoint) : '';
	let host = window.location.host;

	/*
	 * Usually when developing localhost, server path will be in sub-directory unlike production version
	 */
	let devProjectName = 'semi-starter';
	// let devProjectName = 'onlineconsult';

	// development
	if (process.env.NODE_ENV == 'development') {
		if (host.indexOf('192.168.1.9') >= 0) { // put your ip address here if you want to share project in local network
			return `http://192.168.1.9/${devProjectName}/public/api${endpointStr}`;
		}
		return `http://localhost/${devProjectName}/public/api${endpointStr}`;
	}

	// localhost build
	if (host.indexOf('localhost') >= 0) {
		return `http://localhost/${devProjectName}/public/api${endpointStr}`;
	}

	// production build
	return `/${devProjectName}/api${endpointStr}`;
}

/**
 * Note: just leave it here even if you not using access token
 */
const appKey = 'base64:GLqxLeosxabv4rH6FYsDISUT3yrqdWD3jZGbKiJsqhA=';

function payload(payload) {
	return jwt.sign({
		payload
	}, appKey);
	// return jwt.sign(data, appKey);
}
function verify(encode) {
	return jwt.verify(encode, appKey);
}

function sign(decode) {
	return jwt.sign(decode, appKey);
}

const api = {
	sign,
	verify,
	baseUrl,
	payload
};

export default api;