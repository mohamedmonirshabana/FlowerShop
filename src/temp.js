// '/users/{uid}':{
//     patch:{
//         tags:['/users'],
//         summary:['update user Data'],
//         parameters:[
//             {
//                 name:'uid',
//                 in:'path',
//                 required:true,
//                 schema:{
//                     type:'string'
//                 }
//             }
//         ],
//         requestBody:{
//             content:{
//                 "multipart/form-data":{
//                     schema:{
//                         type:"object",
//                         properties:{
//                             username:{
//                                 type:"string",
//                                 require: true
//                             },
//                             email:{
//                                 type:"string",
//                                 require:true
//                             },
//                             profilepics:{
//                                 type:"file",
//                                 require: true
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         'responses': {
//             '200': {
//                 'description': 'user logged in successfully',
//             },
//             '400': {
//                 'description': 'bad request',
//             }
//         }
//     }
// },