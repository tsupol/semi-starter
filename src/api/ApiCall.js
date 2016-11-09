import {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import api from './index';
import request from 'superagent';
import helper from '../../react-semi-theme/src/libs/helper';

/**
 * set multi-dimensional array by string
 */
const setter = (obj, propString, value) => {
    if (!propString)
        return obj;

    let prop, ref = obj, props = propString.split('.');
    for (let i = 0, iLen = props.length - 1; i <= iLen; i++) {
        prop = props[i];
        if(i == iLen) {
            return ref[prop] = value;
        } else {
            if(ref[prop] == undefined) {
                ref[prop] = {};
            }
            ref = ref[prop];
        }
    }
    return obj;
};

/**
 * AJAX with access_token
 */
export function ajax (method, url, data, options, access_token) {
    let {files, remove_fields} = options;
    remove_fields = remove_fields || [];
    url = api.baseUrl(url);
    if(!data) data = {};
    if (typeof method === "undefined") {
        method = 'post';
        data._method = 'POST';
    } else if(method === 'put') {
        method = 'post';
        data._method = 'PUT';
    }  else if(method === 'patch') {
        method = 'post';
        data._method = 'PATCH';
    } else if(method === 'delete') {
        method = 'post';
        data._method = 'DELETE';
    }
    //if(data) data = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        // $.ajax({method, url, data, dataType: 'json',
        //     headers: {
        //         'Access-Token': access_token,
        //         'Content-Type': 'application/json'
        //     },
        //     // custom
        //     tryCount : 0,
        //     retryLimit : 3
        // }).done(response=>{
        //     if(response.status == "error"){
        //         reject(response.data.error);
        //     }
        //     resolve(response);
        // }).fail((jqXHR, textStatus) => {
        //
        //     console.log('retry', jqXHR, this);
        //     // retry
        //     // if (textStatus == 'timeout' || jqXHR.status == 500) {
        //     //     this.tryCount++;
        //     //     if (this.tryCount <= this.retryLimit) {
        //     //         //try again
        //     //         $.ajax(this);
        //     //         return;
        //     //     }
        //     //     return;
        //     // } else {
        //     //     //handle error
        //     // }
        //     reject(jqXHR);
        // });
        /*
        $.ajax({method, url, data, dataType: 'json',
            headers: {
                'Access-Token': access_token,
                'Content-Type': 'application/json'
            },
            // custom
            tryCount : 0,
            retryLimit : 3,
            success : function(response) {
                if(response.status == "error"){
                    reject(response.data.error);
                }
                resolve(response);
            },
            error : function(xhr, textStatus, errorThrown ) {
                if (textStatus == 'timeout' || xhr.status == 500) {
                    console.log('retry: xhr', textStatus, xhr);
                    this.tryCount++;
                    if (this.tryCount <= this.retryLimit) {
                        //try again
                        $.ajax(this);
                    }
                } else {
                    reject(xhr);
                }
            }
        });
        */
        let req;
        if(files){
            req = request
                .post(url);
            for(let key in files){
                let $files = helper.get(data, files[key]);
                if($files != undefined){
                    let name = helper.notation.d2b(files[key]);
                    let root = helper.notation.root.d(files[key]);
                    remove_fields.push(root);
                    if(helper.object.className($files) == "File"){
                        req.attach(name, $files);
                    }else if(helper.object.className($files) == "Array"){
                        $files.forEach((file)=>{
                            if(helper.object.className(file) == "File"){
                                req.attach(`${name}[]`, file);
                            }
                        });
                    }
                }
            }
            for(let field in data){
                if(remove_fields.indexOf(field)==-1){
                    console.log('field', field, 'data', data[field]);
                    if(typeof data[field] == "string"){
                        req.field(field, data[field]);
                    }else if(helper.object.className(data[field]) == "Array"){
                        //let nested_object = data[field].filter((v)=>typeof v == "object");
                        //if(nested_object.length){
                            let nested_values = helper.form.setArrayValue(field, data[field]);
                            for(let i in nested_values){
                                if(typeof nested_values[i] == "string"){
                                    let field_name = helper.notation.d2b(nested_values[i]);
                                    let field_value = helper.get(data, nested_values[i]);
                                    req.field(field_name, field_value);
                                }else{
                                    for(let j in nested_values[i]){
                                        let field_name = helper.notation.d2b(nested_values[i][j]);
                                        let field_value = helper.get(data, nested_values[i][j]);
                                        req.field(field_name, field_value);
                                    }
                                }
                            }
                        //}else{
                        //    req.field(field, data[field]);
                        //}
                    }
                }
            }
        }else{
            req = request[method](url)
                .type('application/json')
                .send(data);
        }
        req
            .set('Access-Token', access_token)
            .end((err, res)=> {
                if (err) {
                    reject(err);
                } else {
                    resolve(res.body);
                }
            });
    });
}

/**
 * AJAX GET multiple URLs
 *
 */
export function getAll(urls, access_token) {
    return new Promise((_resolve, _reject) => {
        let promises = [];
        for (let get of urls) {
            let promise = new Promise((resolve, reject) => {
                ajax('get', get.url, null, access_token).then( response => {
                    resolve(response.data);
                    // note: should be array instead of object
                    // resolve(Object.assign({}, response.data));
                }).catch( error => {
                    reject(error);
                });
            });
            promises.push(promise);
        }
        Promise.all(promises).then(responses => { // all success
            let data = {};
            for (let i in responses) {
                setter(data, urls[i].name, responses[i]);
            }
            // callback
            // console.log('Promise data: ',data);
            _resolve(data);
        }, error => { // not all success
            _reject(error);
        });
    });
}

// For SemiForm only (Deprecated)
class ApiCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: false
        };
        this.post = this.post.bind(this);
        this.get = this.get.bind(this);
        this.getErrorCallback = this.getErrorCallback.bind(this);
    }
    
    componentDidMount() {
        // only call when user have access token
        if(!this.props.user.access_token) return;
        // call get immediately
        if(this.props.getUrls) {
            this.get(this.props.getUrls);
        }
    }

    get(urls) {
        // callback only success
        getAll(urls, this.props.user.access_token).then( response => {
            this.props.getCallback(response);
        }).catch( error => {
            this.getErrorCallback(error);
        });
    }

    post({url, method, data, submitCallback}) {
        ajax(method, url, data, response => {
            // console.log('success', response);
            if(submitCallback) submitCallback(response.data);
        }, error => {
            // console.log('api error:', error);
        }, this.props.user.access_token);
    }

    getErrorCallback(error) {
        // todo: something like reload or notify errors
        // see http://api.jquery.com/jQuery.ajax/#jqXHR
        // console.log('error', error);
    }

    render() {
        return (null);
    }
}

ApiCall.propTypes = {
    user: PropTypes.object,
    getUrls: PropTypes.array,
    getCallback: PropTypes.func,
    submit: PropTypes.object,
    submitForm: PropTypes.func
};

const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps,null,null,{ withRef: true })(ApiCall);
