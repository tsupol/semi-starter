import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { red500 } from 'material-ui/styles/colors';

class UploadBox extends Component {
    constructor(props, context) {
        super(props, context);
    }
    state = {
        openModal: false,
        files: []
    };

    onDrop = (files)=> {
        let {action, name} = this.props;
        if(action){
            this.onDropAjax(action, files, name);
        }else{
            this.setState({files});
        }
    };

    onDropAjax = (action, files, name)=> {
        this.clearFilesAjax(action, this.state.files, true, this.state.openModal).then(()=>{
            let data = {};
            data[name] = files;
            this.context.ajax.call("post", action, data, [name]).then((res)=>{
                files = res.files.map((file)=>{
                    let pair = files.filter((f)=>f.name==file.name)[0];
                    return Object.assign(pair, {path: file.path});
                });
                this.setState({files});
            });
            // todo: change to context.ajax
            // let req = request.post(api.baseUrl(action));
            // files.forEach((file)=>{
            //     req.attach(name || 'files', file);
            // });
            // req.end((err, res)=>{
            //     files = res.body.files.map((file)=>{
            //         let pair = files.filter((f)=>f.name==file.name)[0];
            //         return Object.assign(pair, {path: file.path});
            //     });
            //     this.setState({files});
            // });
        });
    };

    previewWithModal = () => {
        this.setState({openModal: true});
    };

    handleClosePreview = ()=> {
        this.setState({openModal: false});
    };

    clearFiles = (index, e)=> {
        let {files, openModal} = this.state;
        let {action} = this.props;
        e.preventDefault();
        e.stopPropagation();
        if(action){
            this.clearFilesAjax(action, files, index, openModal);
        }else{
            if(index === true){
                files = [];
            }else{
                files.splice(index, 1);
            }
            if(!files.length){
                openModal = false;
            }
            this.setState({files, openModal});
        }
        return false;
    };

    clearFilesAjax = (action, files, index, openModal)=> {
        return new Promise((resolve, reject)=>{
            let paths = [];
            let newFiles = files.slice(0);
            if(index === true){
                paths = files.map((file)=>file.path);
                newFiles = [];
            }else{
                paths.push(files[index]);
                newFiles.splice(index, 1);
                if(!newFiles.length){
                    openModal = false;
                }
            }
            this.context.ajax.call("delete", action, {files: paths}).then(()=>{
                resolve();
                this.setState({files: newFiles, openModal});
            }, (err)=>{
                reject(err);
            });
            // if(index === true){
            //     let paths = files.map((file)=>file.path);
            //     // todo: change to context.ajax
            //     let req = request.post(api.baseUrl(action));
            //     req.send({_method: 'delete', files: paths});
            //     req.end((err, res)=>{
            //         if(err){
            //             reject(err);
            //         }else{
            //             resolve();
            //             this.setState({files: []});
            //         }
            //     });
            // }else{
            //     let file = files[index];
            //     // todo: change to context.ajax
            //     let req = request.post(api.baseUrl(action));
            //     req.send({_method: 'delete', files: [file.path]});
            //     req.end((err, res)=>{
            //         if(err){
            //             reject(err);
            //         }else{
            //             files.splice(index, 1);
            //             if(!files.length){
            //                 openModal = false;
            //             }
            //             resolve();
            //             this.setState({files, openModal});
            //         }
            //     });
            // }
        });
    };

    render() {
        let {files} = this.state;
        let {
            style,
            example,
            fullWidth,
            thumbnail,
            calculatedWidth,
            floatingLabelText,
            hintText,
            validations,
            validationErrors,
            showClearButton,
            ...rest
        } = this.props;
        let dropZoneStyle = Object.assign({
            width: fullWidth ? '100%' : '200px',
            height: '200px',
            borderWidth: '2px',
            borderColor: 'rgb(102, 102, 102)',
            borderStyle: 'dashed',
            borderRadius: '5px',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            cursor: 'pointer'
        }, style);
        let exampleStyle = Object.assign({}, dropZoneStyle, {
            borderColor: 'rgba(102, 102, 102, 0.1)',
            cursor: 'default',
            borderStyle: 'solid',
            marginBottom: '24px'
        });
        if(typeof example == "string"){
            exampleStyle['backgroundImage'] = `url(${example})`;
        }
        if(typeof thumbnail == "string"){
            dropZoneStyle['backgroundImage'] = `url(${thumbnail})`;
        }
        if(files.length){
            dropZoneStyle['backgroundImage'] = `url(${files[0].preview})`;
        }
        let dropZoneProps = Object.assign({
            multiple: false,
            name: 'files'
        }, rest);
        return (
            <div>
                { typeof example == "string" ? (
                    <div style={exampleStyle}></div>
                ) : null }
                <Dropzone onDrop={this.onDrop} {...dropZoneProps} style={dropZoneStyle}></Dropzone>
                { files.length ? (
                    <div>
                        <IconButton onClick={this.clearFiles.bind(null, true)}>
                            <ActionDelete />
                        </IconButton>
                        { dropZoneProps.multiple && files.length>1 ? (
                            <Badge
                                badgeContent={files.length}
                                primary={true}
                                style={{cursor: 'pointer'}}
                                badgeStyle={{top: 12, right: 12, fontSize: 8, width: 16, height: 16}}
                                onClick={this.previewWithModal}
                            >
                                <ActionVisibility />
                            </Badge>
                        ) : null }
                    </div>
                ) : null }
                <Dialog
                    title="Preview"
                    actions={[
                        <FlatButton
                            label="Close"
                            primary={true}
                            onTouchTap={this.handleClosePreview}
                        />
                    ]}
                    modal={false}
                    open={this.state.openModal}
                    autoScrollBodyContent={true}
                    onRequestClose={this.handleClosePreview}
                >
                    <div style={{margin: '24px 0'}}>
                    { files.map((file, i)=>{
                        let previewBoxStyle = Object.assign({}, dropZoneStyle, {
                            backgroundImage: `url(${file.preview})`
                        });
                        return (
                            <div key={i} style={{marginBottom: '24px'}}>
                                <div style={previewBoxStyle}></div>
                                <IconButton onClick={this.clearFiles.bind(null, i)}>
                                    <ActionDelete />
                                </IconButton>
                                {files.length!=i+1 ? (
                                    <Divider />
                                ): null }
                            </div>
                        );
                    }) }
                    </div>
                </Dialog>
            </div>
        );
    }
}

UploadBox.propTypes = {};
UploadBox.contextTypes = {
    ajax: PropTypes.object
};
export default UploadBox;