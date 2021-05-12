# nodejs-api-fejlesztes

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/).
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).

## Generate a .gitignore file
- [toptal](https://www.toptal.com/developers/gitignore)
- [api](https://www.toptal.com/developers/gitignore/api/visualstudiocode,node)

## Test api
### Create
```javascript
fetch('http://localhost:3000/person', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({first_name: 'Jack', last_name: 'London', email: 'jl@gmail.com'})
}).then( r => r.json() )
.then( d => console.log(d) );
```