import React from 'react';
export default function($this){
    let thumbnail = require('../assets/img/upload-thumbnail.png');
    let example = require('../assets/img/upload-example.png');
    let images = {
        face: [
            require('../assets/img/face1.jpg'),
            require('../assets/img/face2.jpg'),
            require('../assets/img/face3.jpg'),
            require('../assets/img/face4.jpg'),
            require('../assets/img/face5.jpg'),
            require('../assets/img/face6.jpg')
        ]
    };
    return {
        values: {
            first_name: '',
            last_name: '',
            nick_name: '',
            facebook: '',
            instagram: '',
            email: '',
            youtube: '',
            website: '',
            lineID: '',
            whatappID: '',
            phone: '',
            mobile: '',
            job: '',
            interested_in: [],
            interested_in_liposuction_check: [],
            interested_in_other_check: [],
            interested_in_liposuction: '',
            interested_in_other: '',
            medical_histories: [],
            congenital_disease: '',
            current_drug: '',
            drug_symptom: '',
            files: []
        },
        components: [
            [
                {type: 'custom', element: <h3>Personal Information</h3>}
            ],
            [
                {
                    type: 'text', name: 'first_name', label: 'First Name'
                },
                {
                    type: 'text', name: 'last_name', label: 'Last Name'
                },
                {
                    type: 'text', name: 'nick_name', label: 'Nick Name'
                }
            ],
            [
                {
                    type: 'text', name: 'facebook', label: 'Facebook'
                },
                {
                    type: 'text', name: 'instagram', label: 'Instagram'
                },
                {
                    type: 'text', name: 'email', label: 'E-Mail'
                }
            ],
            [
                {
                    type: 'text', name: 'youtube', label: 'Youtube Channel'
                },
                {
                    type: 'text', name: 'website', label: 'Website'
                },
                {
                    type: 'text', name: 'lineID', label: 'Line ID'
                },
                {
                    type: 'text', name: 'whatappID', label: 'WhatApp ID'
                }
            ],
            [
                {
                    type: 'text', name: 'phone', label: 'Phone'
                },
                {
                    type: 'text', name: 'mobile', label: 'Mobile'
                }
            ],
            [
                {
                    type: 'text', name: 'job', label: 'Job', grid: {
                    md: '50%'
                }
                }
            ],
            [
                {
                    type: 'custom', element: <div style={{height: 72}}></div>
                }
            ],
            [
                {
                    type: 'custom', element: <label>Interested in</label>, grid: {
                    md: '30%'
                }
                },
                {
                    type: 'checkbox', name: 'interested_in', showClearButton: false, options: [
                    {id: 'eye', name: 'Eye'},
                    {id: 'nose', name: 'Nose'},
                    {id: 'breast', name: 'Breast'},
                    {id: 'lip', name: 'Lip'},
                    {id: 'hair', name: 'Hair'},
                    {id: 'bags_under_the_eyes', name: 'Bags under the eyes'},
                ], grid: {
                    md: '70%'
                }
                }
            ],
            [
                {
                    type: 'custom', element: <div>&nbsp;</div>, grid: {
                    md: '30%'
                }
                },
                {
                    type: 'checkbox', name: 'interested_in_liposuction_check', showClearButton: false, options: [
                    {id: 'liposuction', name: 'Iiposuction'},
                ], grid: {
                    md: '70%'
                }, onCheck: (v)=>{$this.setState({interested_in_liposuction: v.length>0})}
                }
            ],
            {
                settings: {
                    hide: !$this.state.interested_in_liposuction
                },
                items: [
                    {
                        type: 'custom', element: <div>&nbsp;</div>, grid: {
                        md: '30%'
                    }
                    },
                    {
                        type: 'text', name: 'interested_in_liposuction', grid: {
                        md: '70%'
                    }
                    }
                ]
            },
            [
                {
                    type: 'custom', element: <div>&nbsp;</div>, grid: {
                    md: '30%'
                }
                },
                {
                    type: 'checkbox', name: 'interested_in_other_check', showClearButton: false, options: [
                    {id: 'other', name: 'Other'}
                ], grid: {
                    md: '70%'
                }, onCheck: (v)=>{$this.setState({interested_in_other: v.length>0})}
                }
            ],
            {
                settings: {
                    hide: !$this.state.interested_in_other
                },
                items: [
                    {
                        type: 'custom', element: <div>&nbsp;</div>, grid: {
                        md: '30%'
                    }
                    },
                    {
                        type: 'text', name: 'interested_in_other', multiLine: true, grid: {
                        md: '70%'
                    }
                    }
                ]
            },
            [
                {
                    type: 'custom', element: <div style={{height: 72}}></div>
                }
            ],
            [
                {type: 'custom', element: <div><h3>Medical Information</h3><h4>Medical histories</h4></div>}
            ],
            ...Array.from(Array(5), (v, k) => ([
                {
                    type: 'custom', element: <div  style={{height: '72px', textAlign: 'right'}}><label style={{position: 'relative', top: '50%'}}>{k+1}</label></div>
                },
                {
                    type: 'text', multiLine: true, label: 'What', name: `medical_histories[${k}][what]`
                },
                {
                    type: 'text', multiLine: true, label: 'Where', name: `medical_histories[${k}][where]`
                },
                {
                    type: 'text', multiLine: true, label: 'Doctor', name: `medical_histories[${k}][doctor]`
                },
                {
                    type: 'text', multiLine: true, label: 'Duration', name: `medical_histories[${k}][duration]`
                }
            ])),
            [
                {
                    type: 'text', multiLine: true, label: 'Congenital Disease', name: 'congenital_disease'
                },
                {
                    type: 'text', multiLine: true, label: 'Current Drug', name: 'current_drug'
                },
                {
                    type: 'text', multiLine: true, label: 'Drug Symptom', name: 'drug_symptom'
                }
            ],
            [
                {
                    type: 'text', multiLine: true, label: 'Need', name: 'need', grid: {
                    md: '50%'
                }
                }
            ],
            [
                {
                    type: 'text', multiLine: true, label: 'Note', name: 'note', grid: {
                    md: '50%'
                }
                }
            ],
            [
                {
                    type: 'custom', element: <div style={{height: 72}}></div>
                }
            ],
            [
                ...Array.from(Array(6), (v, k) => (
                {
                    type: 'uploadbox', name: `files[face][${k}]`, thumbnail, example: images.face[k]
                }
                ))
            ],
            [
                ...Array.from(Array(6), (v, k) => (
                {
                    type: 'uploadbox', name: `files[body][${k}]`, thumbnail, example
                }
                ))
            ],
            [
                ...Array.from(Array(6), (v, k) => (
                {
                    type: 'uploadbox', name: `files[normal][${k}]`, thumbnail, example
                }
                ))
            ],
            [
                {type: 'custom', element: <div><h3><u>Terms of Service</u></h3><p>กรุณาอ่านเงื่อนไขต่างๆในการใช้บริการโดย ละเอียด เพราะหากท่านกดดำเนินการลงทะเบียน จะถือว่าท่านยอมรับเงื่อนไขของการใช้บริการของคลินิก</p></div>}
            ],
            [
                {
                    type: 'custom',
                    element: <ol>
                        <li>ข้าพเจ้าขอยืนยันว่าภาพถ่ายที่ข้าพเจ้าส่งเป็นภาพถ่ายของข้าพเจ้าจริง ในกรณีที่ตรวจพบในภายหลังว่าภาพถ่ายที่ข้าพเจ้าส่งไม่ใช่ภาพของตัวข้าพเจ้า หรือเป็นภาพที่เกิดจากการดัดแปลง ตกแต่ง ต่อเติม ไม่ว่าจะโดยตั้งใจหรือไม่ตั้งใจก็ตาม ข้าพเจ้ายินดีรับผิดแต่เพียงผู้เดียว</li>
                        <li>ข้าพเจ้า ยินยอมให้ทางคลินิกใช้ภาพที่ข้าพเจ้าส่งด้วยวิธีการส่งภาพทางจดหมาย อิเล็กทรอนิกส์(E-Mail) การพิมพ์(Print) หรือด้วยวิธีใดๆตามที่คลินิกจะเห็นสมควรเพื่อให้แพทย์พิจารณา</li>
                        <li>การส่งภาพถ่ายข้างต้นเป็นเพียงการส่งเพื่อการปรึกษาแพทย์ในเบื้องต้นเท่า นั้น ข้าพเจ้าเข้าใจว่าจะต้องมีการเข้ามาที่คลินิกเพื่อทำการตรวจ และปรึกษาแพทย์อีกครั้งหนึ่ง</li>
                        <li>ความเห็นของแพทย์เป็นเพียงการวินิจฉัยเบื้องต้นตามภาพถ่ายที่ท่านส่งมาให้ ซึ่งอาจมีการเปลี่ยนแปลงได้เมื่อท่านเข้ามาพบแพทย์</li>
                    </ol>
                }
            ],
            [
                {
                    type: 'custom', element: <div style={{height: 36}}></div>
                }
            ],
            [
                {
                    type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '43.5%'}
                },
                {
                    type: 'checkbox', name: 'agreement', options: [{id: 'accepted', name: 'Accepted'}], required: true, showClearButton: false
                }
            ]
        ]
    };
}