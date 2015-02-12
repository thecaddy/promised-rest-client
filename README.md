# Promised Rest Client

A simple rest client I, @thecaddy, use to hit apis that return json

### API


```
var data = require('promised-rest-client')(myUrl);

//Overloaded Method uses
data.get(obj)
data.get(url, obj)

//Remaining CRUD
data.update(...)  //PUT 
data.insert(...)  //POST 
data.post(...)    //POST
data.delete(...)  //DELETE
```

The object takes several parameters:

```
var obj = {
  url: 'path/to/my/thing',
  qs: {
    myquery: 'string equals this'
  },
  body: {
    mybody: {
      hasmore: 'things',
      awesome: true
    }
  }
}

```

### Usage

All queries return a promise.

##### Example:


```
var data = require('promised-rest-client')('http://woohoo.com/')

//Submits a get request to 'http://woohoo.com/bam/pow/shoot?count=true'
data.get({
  url: 'bam/pow/shoot',
  qs:{
    count: true
  }
}).then(function(resp){
//Submits a get request to 'http://woohoo.com/bam/pow/shoot'
//with body json { count: false }
  return data.update('bam/pow/bang', {
    body: {
      count: false
    }
  })
}).then(function(resp){
  console.log(resp)
}).catch(function(err){
  console.error(err)
})

```
