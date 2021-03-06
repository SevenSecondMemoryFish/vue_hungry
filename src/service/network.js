
import axios from  'axios'
import {baseUrl}  from "../config/env";

axios.interceptors.response.use(response=>{
  console.log("response",response);
  if (response.data.status != 0){
    return Promise.resolve(response);
  } else {
    return Promise.reject(response.data.message);
  }
},err=>{

});

axios.defaults.baseURL=baseUrl;
axios.defaults.headers = {

};
axios.defaults.timeout = 15000;

export  default {
  get(url,parm){
    return new  Promise((resolve, reject) => {
      axios.get(url,{params:parm}).then(response=>{
        resolve(response.data)
      }).catch(err=>{
        reject(err);
      })
    })
  },
  post(url,parm){
    return new Promise((resolve, reject) => {
      axios.post(url,parm).then(response=>{
        resolve(response.data);
      }).catch(err=>{
        reject(err);
      })
    })
  }
}
