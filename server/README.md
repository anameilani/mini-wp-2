# Mini-WP/SayWords

## Geting Started
- npm install
- Run `nodemon app.js or npm run dev` to start the server.
- Run `parcel index.html` to start the client
- baseUrl: http://localhost:3000

## Feature
- Register
- Login
- Login With Google
- View All Articles
- Create Article
- Edit Own Article
- Delete Own Article

## Routes
### User Route
#### Register

    URL: ${baseUrl}/users/register
    Method: POST
    Headers: none
    params: none
    body: {name: String, email: String, password: String}
    Success Response: 
        Code 201:
            {
                "_id":"5d10a8fb6776a53e8f8f12ed",
                "name":"Ana",
                "email":"ana@mail.com",
                "password":"$2b$10$iZWscBJjoGT8keRIOthySuwOIFMgIpHChImQtG5ZqdaJ/.MxnD8Fi",
                "__v":0
            }
    Error Response:
        Code 500:
        Content: {message: 'Internal Server Error'}

#### Login

    URL: ${baseUrl}/users/login
    Method: POST
    Headers: none
    params: none
    body: {email: String, password: String}
    Success Response: 
        Code 200:
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjRhZjYwNmJkNTkzMTkwYzM1Y2ZiYSIsImVtYWlsIjoiYW5hQG1haWwuY29tIiwibmFtZSI6ImFuYSIsImlhdCI6MTU2MzA4Nzg3NiwiZXhwIjoxNTYzMDkxNDc2fQ.6scundMCsMz94JwAE0qdRRWN55UDTwf3KQ12v5OZdJg",
                "name": "ana",
                "userId": "5d24af606bd593190c35cfba"
            }
    Error Response:
        Code 404:
        Content: {message: 'Wrong Email/Password'}

#### Login With Google

    URL: ${baseUrl}/users/loginGoogle
    Method: POST
    Headers: none
    params: none
    body: none
    Success Response: 
        Code 200:
            {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMjRhZjYwNmJkNTkzMTkwYzM1Y2ZiYSIsImVtYWlsIjoiYW5hQG1haWwuY29tIiwibmFtZSI6ImFuYSIsImlhdCI6MTU2MzA4Nzg3NiwiZXhwIjoxNTYzMDkxNDc2fQ.6scundMCsMz94JwAE0qdRRWN55UDTwf3KQ12v5OZdJg",
                "name": "ana meilani",
                "userId": "5d24af606bd593190c35cfba"
            }
    Error Response:
        Code 500:
        Content: {message: 'Internal Server Error'}


### Article Route
#### Create New Article with Specific Status

    URL: ${baseUrl}/articles/:status
    Method: POST
    Headers: token
    params: draft
    body: form data {title: string, thumbnail: file, content: string, tags: string}
    Success Response: 
        Code 200:
            {
                "tags": [
                    "phone",
                    "HP",
                    "Iphone",
                    "IphoneX"
                ],
                "_id": "5d3349fb2232bd3a3ce0071e",
                "title": "Penjualan IphoneX",
                "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563642362487iphonex.jpeg",
                "content": "penjualan iphone X dipasaran terlihat sangat laris. Hal ini dikarenakan phone X dilengkapi dengan teknologi mutakhir.",
                "author": "5d2de87a3dc8fe1c5d6e7516",
                "status": "draft",
                "createdAt": "2019-07-20T17:06:03.629Z",
                "updatedAt": "2019-07-20T17:06:03.629Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get All User Articles with Status Published

    URL: ${baseUrl}/articles
    Method: GET
    Headers: token
    params: draft
    body: none
    Success Response: 
        Code 200:
            [
                {
                    "tags": [
                        "nyamuk",
                        "penyakit",
                        "DBD",
                        "wabah"
                    ],
                    "_id": "5d3293f53c4dc109434dfafc",
                    "title": "Nyamuk DBD",
                    "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563595762849dbd.jpeg",
                    "content": "<b>Saat ini </b>banyak sekali nyamuk saat malam hari hal ini karena mungkin musim kemarau<br>",
                    "author": {
                        "_id": "5d2de87a3dc8fe1c5d6e7516",
                        "name": "ana",
                        "email": "ana@mail.com",
                        "password": "$2b$10$wQ0nEy0wWpHvL5oevt8Hr.13g4E1rPfpXNseLzmDSN5iTEjBhZkaO",
                        "__v": 0
                    },
                    "status": "published",
                    "createdAt": "2019-07-20T04:09:25.020Z",
                    "updatedAt": "2019-07-20T16:02:59.341Z",
                    "__v": 0
                },
                {
                    "tags": [
                        "hari raya",
                        "waisak",
                        "budha"
                    ],
                    "_id": "5d33163470ce320ef2655b59",
                    "title": "Hari Waisak",
                    "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563629107548waisak.jpg",
                    "content": "selamat hari raya waisak<br>",
                    "author": {
                        "_id": "5d2eb7fc9f54800aabf62de4",
                        "name": "ana meilani",
                        "email": "meilani.ana@gmail.com",
                        "password": "$2b$10$GAmieBm4uSBB8G4ybXj36.mYw4SB4yP58hcXmA8AO9gQJ2uqMTBk6",
                        "__v": 0
                    },
                    "status": "published",
                    "createdAt": "2019-07-20T13:25:08.694Z",
                    "updatedAt": "2019-07-20T16:36:37.708Z",
                    "__v": 0
                },
            ]
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get Own Articles With Specific Status

    URL: ${baseUrl}/articles/status/:status
    Method: GET
    Headers: token
    params: draft
    body: none
    Success Response: 
        Code 200:
            [
                {
                    "tags": [
                        "nyamuk",
                        "penyakit",
                        "DBD",
                        "wabah"
                    ],
                    "_id": "5d3293f53c4dc109434dfafc",
                    "title": "Nyamuk DBD",
                    "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563595762849dbd.jpeg",
                    "content": "<b>Saat ini </b>banyak sekali nyamuk saat malam hari hal ini karena mungkin musim kemarau<br>",
                    "author": {
                        "_id": "5d2de87a3dc8fe1c5d6e7516",
                        "name": "ana",
                        "email": "ana@mail.com",
                        "password": "$2b$10$wQ0nEy0wWpHvL5oevt8Hr.13g4E1rPfpXNseLzmDSN5iTEjBhZkaO",
                        "__v": 0
                    },
                    "status": "draft",
                    "createdAt": "2019-07-20T04:09:25.020Z",
                    "updatedAt": "2019-07-20T16:02:59.341Z",
                    "__v": 0
                },
                ...
            ]
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Get One Article

    URL: ${baseUrl}/articles/:id
    Method: GET
    Headers: token
    params: 5d3299b53c4dc109434dfafe
    body: none
    Success Response: 
        Code 200:
            {
                "tags": [
                    "hari raya",
                    "idul fitri",
                    "ied mubarak"
                ],
                "_id": "5d3299b53c4dc109434dfafe",
                "title": "Hari Raya Idul Fitri",
                "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563597236044lebaran1.jpg",
                "content": "selamat hari raya idul fitri<br>",
                "author": "5d2de87a3dc8fe1c5d6e7516",
                "status": "published",
                "createdAt": "2019-07-20T04:33:57.362Z",
                "updatedAt": "2019-07-20T08:12:28.251Z",
                "__v": 0
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 404:
        Content: {message: 'Not Found!}
        Code 500:
        Content: {message: 'Internal server error'}

#### Search Published Articles by Tag

    URL: ${baseUrl}/articles/search/by/tag
    Method: GET
    Headers: token
    params: ?key=hari raya
    body: none
    Success Response: 
        Code 200:
            [
                {
                    "tags": [
                        "hari raya",
                        "waisak",
                        "budha"
                    ],
                    "_id": "5d33163470ce320ef2655b59",
                    "title": "Hari Waisak",
                    "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563629107548waisak.jpg",
                    "content": "selamat hari raya waisak<br>",
                    "author": {
                        "_id": "5d2eb7fc9f54800aabf62de4",
                        "name": "ana meilani",
                        "email": "meilani.ana@gmail.com",
                        "password": "$2b$10$GAmieBm4uSBB8G4ybXj36.mYw4SB4yP58hcXmA8AO9gQJ2uqMTBk6",
                        "__v": 0
                    },
                    "status": "published",
                    "createdAt": "2019-07-20T13:25:08.694Z",
                    "updatedAt": "2019-07-20T16:36:37.708Z",
                    "__v": 0
                },
                {
                    "tags": [
                        "hari raya",
                        "idul fitri",
                        "ied mubarak"
                    ],
                    "_id": "5d3299b53c4dc109434dfafe",
                    "title": "Hari Raya Idul Fitri",
                    "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563597236044lebaran1.jpg",
                    "content": "selamat hari raya idul fitri<br>",
                    "author": {
                        "_id": "5d2de87a3dc8fe1c5d6e7516",
                        "name": "ana",
                        "email": "ana@mail.com",
                        "password": "$2b$10$wQ0nEy0wWpHvL5oevt8Hr.13g4E1rPfpXNseLzmDSN5iTEjBhZkaO",
                        "__v": 0
                    },
                    "status": "published",
                    "createdAt": "2019-07-20T04:33:57.362Z",
                    "updatedAt": "2019-07-20T08:12:28.251Z",
                    "__v": 0
                },
                ....
            ]
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Update All Field Article

    URL: ${baseUrl}/articles/:id/:status
    Method: PUT
    Headers: token
    params: /5d3349fb2232bd3a3ce0071e/draft
    body: none
    Success Response: 
        Code 200:
            {
                "tags": [
                    "phone",
                    "HP",
                    "Iphone",
                    "IphoneX",
                    "apple"
                ],
                "_id": "5d3349fb2232bd3a3ce0071e",
                "title": "Penjualan IphoneX di Pasaran",
                "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563642362487iphonex.jpeg",
                "content": "penjualan iphone X dipasaran terlihat sangat laris. Hal ini dikarenakan phone X dilengkapi dengan teknologi mutakhir.",
                "author": "5d2de87a3dc8fe1c5d6e7516",
                "status": "draft",
                "createdAt": "2019-07-20T17:06:03.629Z",
                "updatedAt": "2019-07-20T17:10:41.494Z",
                "__v": 1
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Update Specific Field Article

    URL: ${baseUrl}/articles/:id
    Method: PUT
    Headers: token
    params: /5d3349fb2232bd3a3ce0071e
    body: none
    Success Response: 
        Note: Response still old value but have been updated in database.
        Code 200:
            {
                "tags": [
                    "phone",
                    "HP",
                    "Iphone",
                    "IphoneX",
                    "apple"
                ],
                "_id": "5d3349fb2232bd3a3ce0071e",
                "title": "Penjualan IphoneX di Pasaran",
                "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563642362487iphonex.jpeg",
                "content": "penjualan iphone X dipasaran terlihat sangat laris. Hal ini dikarenakan phone X dilengkapi dengan teknologi mutakhir.",
                "author": "5d2de87a3dc8fe1c5d6e7516",
                "status": "draft",
                "createdAt": "2019-07-20T17:06:03.629Z",
                "updatedAt": "2019-07-20T17:14:35.922Z",
                "__v": 1
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}

#### Delete Article

    URL: ${baseUrl}/articles/:id
    Method: DELETE
    Headers: token
    params: /5d3349fb2232bd3a3ce0071e
    body: none
    Success Response: 
        Code 200:
            {
                "tags": [
                    "phone",
                    "HP",
                    "Iphone",
                    "IphoneX",
                    "apple"
                ],
                "_id": "5d3349fb2232bd3a3ce0071e",
                "title": "Penjualan IphoneX di Pasaran",
                "thumbnail": "https://storage.googleapis.com/hacktiv-image/1563642362487iphonex.jpeg",
                "content": "penjualan iphone X dipasaran terlihat sangat laris. Hal ini dikarenakan phone X dilengkapi dengan teknologi mutakhir.",
                "author": "5d2de87a3dc8fe1c5d6e7516",
                "status": "draft",
                "createdAt": "2019-07-20T17:06:03.629Z",
                "updatedAt": "2019-07-20T17:14:35.922Z",
                "__v": 1
            }
    Error Response:
        Code 401:
        Content: {message: 'Please provide token!'}
        Code 500:
        Content: {message: 'Internal server error'}