const http=require('http');
const qs=require('querystring');
const url=require('url');
const { query } = require('express');
let users = [
    {
      "names": "arun",
      "job": "engineer",
      "salary": "8000",
      "id": 1
    },
    {
      "names": "vivan",
      "job": "writer",
      "salary": "9000",
      "id": 2
    },
    {
      "names": "twinni",
      "job": "artist",
      "salary": "10000",
      "id": 3
    },
    {
      "names": "rohan",
      "job": "painter",
      "salary": "7889",
      "id": 7
    },
    {
      "names": "arun",
      "job": "engineer",
      "salary": "8000",
      "id": 8
    }
  ]
  const host = '0.0.0.0'
  const port = 3030

  const server= http.createServer((req,res)=>{
    console.log(req.type);
    const{pathname,query}=url.parse(req.url);
    if(req.method==='GET'){
        if(req.url=='/users'){
            res.setHeader('Content-Type', 'application/json;charset=utf-8');
            res.end(JSON.stringify(users));
        }else{
          
          const {id}=qs.parse(query);
          console.log(id);
      
          return getById(req,res,id);
        }
        
      }
      
      else if(req.method==='POST'){
        console.log("here")
        return postRequest(req,res);
      }
      
      
      if(pathname==='/user/delete'){
        const{pathname,query}=url.parse(req.url);
        const {id}=qs.parse(query);
        console.log("hello");
        return deleteRequest(req,res,id);
      }
      else if(pathname==='/user/update'){
        const{pathname,query}=url.parse(req.url);
        const {id}=qs.parse(query);
        console.log(id);
        return putRequest(req,res,id);

      }
  })


  //get data by id
  function getById(req,res,id){
    let emp=users.findIndex(e=>Number(e.id)==Number(id))
    let obj={
      names:users[emp].names,
      job:users[emp].job,
      salary:users[emp].salary,
    }
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(obj))
  }

  //POST method

  function postRequest(req,res){
    var pos=0;
    req.on('data',(chunk)=>{
      chunk=JSON.parse(chunk.toString());
      pos=chunk;
    })
    req.on('end',()=>{
      users.push(pos);
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      res.end(JSON.stringify(users));
    })

  }


  //DELETE method

  function deleteRequest(req,res,id){
    console.log(id,"here")
   
    users = users.filter(user => Number(user.id) !=Number(id));
    console.log(users)
    // res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(users))
}
  

  //PUT method

   function putRequest(req,res,id){
    var pos=0;
    req.on('data',(chunk)=>{
      chunk=JSON.parse(chunk.toString());
      pos=chunk;
    })
    req.on('end',()=>{
      for(let i=0;i<users.length;i++){
        if(users[i].id==id){
        users[i].names=pos.names;
        users[i].job=pos.job;
        users[i].salary=pos.salary;
        break;
        }
      }
      
    })
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    res.end(JSON.stringify(users))

   }




  server.listen(port, () => {
    console.log(`Server listening on port ${port}`)
  });