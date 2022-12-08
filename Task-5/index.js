const express=require("express");
const app=express();
const port=8000;
const path=require("path");
const cors=require("cors");
const bodyParser=require('body-parser');
const emp=require("./routes/route.js");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());
app.use("/emp",emp);

app.listen(port,()=>{
  console.log(`listening to the port ${port}`);
})

// app.post('/emp',(req,res)=>{
//     const emp=req.body;
//     console.log(emp);
//     empData.push(emp);
//     res.send("Data added")
// })

// app.get('/emp/:id',(req,res)=>{
//     const id=req.params.id;
//     console.log(id)
//     for(let emp of empData){
//         if(emp.id==Number(id)){
//             res.json(emp);
//             return;
//         }
//     }
//     res.status(404).send('Data not found')
// })

// app.delete('/emp/:id',(req,res)=>{
//     const id=req.params.id;
//     let newempData = empData.filter(el=>el.id!=id);
//     empData = newempData;
//     res.send({
//       success:true,
//       message:"Delete",
//     })

   

    
    
   
// })

// app.get("/emp",(req,res)=>{
//     res.json(empData);
// })

// app.put('/emp/:id',(req,res)=>{
    
//     let emp=req.body;
//     for(let i=0;i<empData.length;i++){
//       if(empData[i].id==req.params.id){
//         empData[i].names=emp.names;
//         empData[i].job=emp.job;
//         empData[i].salary=emp.salary;
//         break;
//       }
//     }
//     res.send(empData)


    
    
// })





