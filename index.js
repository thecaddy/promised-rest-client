'use strict';

var _ = require('lodash')
var request = require('request')

function getUrl(api, obj){
  var url = api + obj.url;
  return url;
}

function submit(options){
  return new Promise(function(resolve, reject) {
    // do a thing, possibly async, then…
    request(options, function(err, resp, body){
      if(err) reject(err);
      else {
        if(resp.statusCode === 200){
          try{
            resolve(JSON.parse(resp.body));
          }catch(e){
            reject(new Error(resp.statusCode + ': ' + resp.body));
          }
        }else if(resp.statusCode === 204){
          resolve(resp.body);
        }else{
          reject(new Error(resp.statusCode + ': ' + resp.body));
        }
      }
    })
  })
}

//overloaded methods
//get(obj)
//get(url, obj)

function getReqObj(url, obj){
  if(typeof url === 'object') return url;
  else {
    obj = {}
    obj.url = url
    return obj
  }
}


module.exports = function(api){
  var obj;
  return {
    get: function(url, obj){
      obj = getReqObj(url, obj);

      var options ={
        url: getUrl(api.url, obj),
        method: 'GET',
        headers: {}
      }

      if(obj.qs && !_.isEmpty(obj.qs)){
        options.qs = obj.qs
      }
      if(api.sign){
        options = api.sign.set(api, options)
      }

      return submit(options);
    },
    update: function(url, obj){
      obj = getReqObj(url, obj)

      var options ={
        url: getUrl(api.url,obj),
        method: 'PUT',
        headers: {}
      }
      if(obj.qs && !_.isEmpty(obj.qs)){
        options.qs = obj.qs
      }
      if(obj.body && !_.isEmpty(obj.body)){
        options.form = obj.body
      }
      if(api.sign){
        options = api.sign.set(api, options)
      }

      return submit(options);
    },
    insert: function(url, obj){
      obj = getReqObj(url, obj)

      var options ={
        url: getUrl(api.url,obj),
        method: 'POST',
        headers: {}
      }
      if(obj.qs && !_.isEmpty(obj.qs)){
        options.qs = obj.qs
      }
      if(obj.body && !_.isEmpty(obj.body)){
        options.form = obj.body
      }
      if(api.sign){
        options = api.sign.set(api, options)
      }
      return submit(options);
    },
    delete: function(url, obj){
      obj = getReqObj(url, obj)

      var options ={
        url: getUrl(api.url,obj),
        method: 'DELETE',
        headers: {}
      }
      if(obj.qs && !_.isEmpty(obj.qs)){
        options.qs = obj.qs
      }
      if(obj.body && !_.isEmpty(obj.body)){
        options.form = obj.body
      }
      if(api.sign){
        options = api.sign.set(api, options)
      }
      return submit(options);
    },
    post: function(url, obj){
      return this.insert(url, obj)
    }
  }
}
