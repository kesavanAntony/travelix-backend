import express from "express";
import mysql from "mysql";
import cors from "cors";
import http from "http";



const app = express();

const server = http.createServer(app);

app.use(cors({
    Credential : true,
    origin : "*"
}))

app.use(express.json({limit:"50mb"}));

// const connection = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "Kesavan@5",
//     database : "travelix",
//     port : "3306"

// })
const connection = mysql.createConnection({
    host : "db4free.net",
    user : "kesavan",
    password : "Kesavan@5",
    database : "travelixapp",
    port : 3306

})

connection.connect((error)=>{
if(error){
    throw (error);
}
else{
    console.log("mysql has been connected successfully");
}
})
//http://localhost:4000/add/destination;
app.post("/add/destination",(request,response)=>{
const form = request.body;
const sqlQuery = `insert into destinationList (destinationName,destinationCount,destinationImage)values('${form.destinationName}','${form.destinationCount}','${form.destinationImage}')` ;


connection.query(sqlQuery,(error,result)=>{
if (error){
    response.status(500).send(error);
}
else{
    response.status(200).send({
        message:"destination has been created successfully"
        
    })
}
})

});

//http://localhost:4000/list/destination;
app.get("/list/destination",(request,response)=>{

const destinationName = request.query.destinationName;

let sqlQuery = "";

if(destinationName==undefined){
    sqlQuery=`select * from destinationList`;
}
else{
    sqlQuery =`select * from destinationList where destinationName='${destinationName}'`;
}



connection.query(sqlQuery,(error,result)=>{
    if(error){
        response.status(500).send(error)
    }
    
    else(
response.status(200).send(result)
    )
})
    }
)
//http://localhost:4000/delete/destination/1;
app.delete("/delete/destination/:id",(request,response)=>{
    const uniqueId = request.params.id;
    const sqlQuery =`delete from destinationList where id =${uniqueId}`;

    connection.query(sqlQuery,(error,result)=>{
        if(error){
            response.status(500).send(error)
        }
        else{
            response.status(200).send({
                message:"destination has been deleted"
            })
        }

    })

})

//http://localhost:4000/add/hotel;
app.post("/add/hotel",(request,response)=>{
    const form = request.body;
    const sqlQuery = `insert into hotelList (hotelName,hotelLocation,hotelPrice,hotelImage)values('${form.hotelName}','${form.hotelLocation}','${form.hotelPrice}','${form.hotelImage}')` ;

    
    connection.query(sqlQuery,(error,result)=>{
    if (error){
        response.status(500).send(error);
    }
    else{
        response.status(200).send({
            message:"hotel has been created"
            
        })
    }
    })
    
    });
    //http://localhost:4000/list/hotel?hotelLocation=;
app.get("/list/hotel",(request,response)=>{

    const hotelLocation = request.query.hotelLocation;
    
    let sqlQuery = "";
    
    if(hotelLocation==undefined){
        sqlQuery=`select * from hotelList`;
    }
    else{
        sqlQuery =`select * from hotelList where hotelLocation='${hotelLocation}'`;
    }
connection.query(sqlQuery,(error,result)=>{
        if(error){
            response.status(500).send(error)
        }
        
        else(
    response.status(200).send(result)
        )
    })
        }
    )

    //http://localhost:4000/delete/hotel/1;
app.delete("/delete/hotel/:id",(request,response)=>{
    const uniqueId = request.params.id;
    const sqlQuery =`delete from hotelList where id =${uniqueId}`;

    connection.query(sqlQuery,(error,result)=>{
        if(error){
            response.status(500).send(error)
        }
        else{
            response.status(200).send({
                message:"hotel has been deleted"
            })
        }

    })

})

    

const port = process.env.PORT || 4000;
server.listen(port,()=>{
    console.log ("Node js running on port",port);
})
