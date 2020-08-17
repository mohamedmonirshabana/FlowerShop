const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.1',
        info: {
            title: 'FlowerShop API',
            version: '1.0.0',
            description: '',
        },
        "components": {
            "securitySchemes": {
                "bearerAuth": {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "Bearer"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ],
        servers: [{
            url: 'http://localhost:3000/'
        }],

        paths: {
            '/otp/send': {
                post: {
                    tags: ['/otp'],
                    summary: ['Add phone to generate verifyCode'],
                    description: 'this for user want ot Register on out App.',
                    operationId: 'get userId if admin',
                    requestBody: {
                        content:{
                            "application/json":{
                                schema: {
                                    type:"object",
                                    properties:{
                                        phone:{
                                            type:"string",
                                            require: true
                                        }
                                    }
                                }
                            }
                        },
                },
                    'responses': {
                        '200': {
                            'description': 'user logged in successfully',
                        },
                        '400': {
                            'description': 'bad request',
                        }
                    },
                },
            },
            '/otp/verifyed':{
                post: {
                    tags:['/otp'],
                    summary:['Add phone and veryfyCode'],
                    requestBody: {
                        content:{
                            "application/json":{
                                schema: {
                                    type:"object",
                                    properties:{
                                        phone:{
                                            type:"string",
                                            require: true
                                        },
                                        verify:{
                                            type: "string",
                                            require: true
                                        },
                                }
                            }
                        },
                    },
                },
                'responses': {
                    '200': {
                        'description': 'user logged in successfully',
                    },
                    '400': {
                        'description': 'bad request',
                    }
                },

            }
            },
            '/users/signup':{
                post:{
                    tags:['/users'],
                    summary: ['Add  a user Account '],
                    requestBody:{
                        content:{
                            "multipart/form-data":{
                                schema:{
                                    type:"object",
                                    properties: {
                                        profile:{
                                            type:"file",
                                            require: true
                                        },
                                        username:{
                                            type:"string",
                                            requie:true
                                        },
                                        email:{
                                            type:"string",
                                            require: true
                                        },
                                        phone:{
                                            type: "string",
                                            require: true
                                        },
                                        password:{
                                            type: "string",
                                            require: true
                                        }
                                    },
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'user logged in successfully',
                        },
                        '400': {
                            'description': 'bad request',
                        }
                    },
                }
            },
            '/users/singin':{
                post:{
                    tags:['/users'],
                    summary:['Login a user '],
                    requestBody:{
                        content:{
                            "application/json":{
                                schema:{
                                    type:"object",
                                    properties:{
                                        username:{
                                            type:"string",
                                            require: true
                                        },
                                        password:{
                                            type:"string",
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'user logged in successfully',
                        },
                        '400': {
                            'description': 'bad request',
                        }
                    }
                }
            },
            '/users/{uid}':{
                patch:{
                    tags:['/users'],
                    summary:['update user Data'],
                    parameters:[
                        {
                            name:'uid',
                            in:'path',
                            required:true,
                            schema:{
                                type:'string'
                            }
                        }
                    ],
                    requestBody:{
                        content:{
                            "multipart/form-data":{
                                schema:{
                                    type:"object",
                                    properties:{
                                        username:{
                                            type:"string",
                                            require: true
                                        },
                                        email:{
                                            type:"string",
                                            require:true
                                        },
                                        profilepics:{
                                            type:"file",
                                            require: true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses': {
                        '200': {
                            'description': 'user logged in successfully',
                        },
                        '400': {
                            'description': 'bad request',
                        }
                    }
                }
            },
            '/users/password/{uid}':{
                post:{
                    tags:['/users'],
                    summary:['update user Password'],
                    parameters:[ 
                        {
                            name: 'uid',
                            in: 'path',
                            required: true,
                            schema:{
                                type: 'string'
                            }
                        }
                     ],
                    requestBody:{
                        content:{
                            'application/json':{
                                schema:{
                                    type:'object',
                                    properties:{
                                        currentpassword:{
                                            type:'string',
                                            require: true
                                        },
                                        newPassword:{
                                            type:"string",
                                            require:true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses':{
                        '200':{
                            'description':'your password Change',
                        },
                        '400':{
                            'descript':'bad request',
                        }
                    }
                }
            },
            '/flower/upload':{
                post:{
                    tags:['/flower'],
                    summary:['upload Flower image'],
                    requestBody:{
                        content:{
                            'multipart/form-data':{
                                schema:{
                                    type:"object",
                                    properties:{
                                        flower:{
                                            type:"file",
                                            require: true
                                        },
                                        flowerName:{
                                            type:"string",
                                            require:true
                                        },
                                        price:{
                                            type:"string",
                                            require:true
                                        },
                                        desc:{
                                            type:"string",
                                            require:true
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'responses':{
                        '200':{
                            'description':'your upload ',
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            },
            '/clients/addclient':{
                post:{
                    tags:['/clients'],
                    summary:['add client in DB'],
                    requestBody:{
                        content:{
                            'application/json':{
                                schema:{

                                }
                            }
                        }
                    },
                    'responses':{
                        '200':{
                            'description':'Client add in DB'
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            },
            '/clients/:lat/:lng':{
                get:{
                    tags:['/clients'],
                    summary:['find near provider '],
                    parameters:[
                        {
                            name:'lat',
                            in:'path',
                            required:true,
                            schema:{
                                type:'string'
                            }
                        },
                        {
                            name:'lng',
                            in: 'path',
                            required:true,
                            schema:{
                                type:'string'
                            }
                        }
                    ],
                    requestBody:{
                        content:{
                            'application/json':{
                                schema:{

                                }
                            }
                        }
                    },
                    'response':{
                        '200':{
                            'description':'find all near '
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            },
            '/clients/findbyName':{
                get:{
                    tags:['/clients'],
                    summary:['find  provider by Name '],
                    requestBody:{
                        content:{
                            'application/json':{
                                schema:{

                                }
                            }
                        }
                    },
                    'response':{
                        '200':{
                            'description':'find all near '
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            },
            '/providers/addprovider':{
                post:{
                    tags:['/providers'],
                    summary:['add provider '],
                    requestBody:{
                        content:{
                            'multipart/form-data':{
                                schema:{
                                    type:'object',
                                    properties:{
                                        IDImages:{
                                            type:"file",
                                            require:true
                                        },
                                        logoID:{
                                            type:"file",
                                            require:true
                                        },
                                        lat:{
                                            type:"string",
                                            requie:true
                                        },
                                        lng:{
                                            type:"string",
                                            require:true
                                        }
                                    },
                                }
                            }
                        }
                    },
                    'response':{
                        '200':{
                            'description':'provider add '
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            },
            '/admins/addadmin':{
                get:{
                    tags:['/admins'],
                    summary:['add admins '],
                    requestBody:{
                        content:{
                            'application/json':{
                                schema:{
                                    type:'object',
                                    properties:{

                                    }
                                }
                            }
                        }
                    },
                    'response':{
                        '200':{
                            'description':'provider add '
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            },
            '/admins/verifyproviders':{
                patch:{
                    tags:['/admins'],
                    summary:['verify provider  '],
                    requestBody:{
                        content:{
                            'application/json':{
                                schema:{
                                    providers:{
                                        type:"string",
                                        require: true
                                    }
                                }
                            }
                        }
                    },
                    'response':{
                        '200':{
                            'description':'provider verifyed '
                        },
                        '400':{
                            'description':'bad request'
                        }
                    }
                }
            }
        },
    },
    apis: [],
};


const specs = swaggerJsDoc(options);
module.exports = (app) => {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
};
