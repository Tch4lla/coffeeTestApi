const express = require('express') //let's us use express modules
const app = express() //lets us use all the things that express comes with
const PORT = 8000

//to make sure that folks can access this api on their local machine, we need to prevent them from running into cors errors 
const cors = require('cors')

//api should use cors
app.use(cors())

//the object from which our API will be pulled 
const coffee = {
    'arabica':{
        'origin':'Ethiopia',
        'taste':'smooth and complex',
        'bitterness':'low'
    },
    'robusta':{
        'origin':'sub-saharan Africa',
        'taste':'strong smell, somewhat flat',
        'bitterness':'medium'
    },
    'liberica':{
        'origin':'Liberia',
        'taste':'floral aroma and bold, smokey flavor',
        'bitterness':'known for it\'s inconsistency'
    },
    'excelsa':{
        'origin':'Southeast Asia',
        'taste':'roast traits like tart notes and fruity flavor',
        'bitterness':'low'
    },
    'unknown':{
        'origin':'unknown',
        'taste':'unknown',
        'bitterness':'unknown'
    }
}
//when someone first visits the site, we want to serve them some html
app.get('/', (request,response)=>{
    response.sendFile(__dirname + '/index.html') //after you hear request, send file from current directory 
})

//If they make a request to our API route, this code will run
app.get('/api', (request,response)=> {
    response.json(coffee)
})

app.get('/api/:name', (request,response)=> {
    const coffeeBean = request.params.name.toLowerCase() //getting the users' desired coffee bean
    //checks to see if the users inputed bean is inside the coffee object
    if(coffee[coffeeBean]){
        response.json(coffee[coffeeBean])
    }else{
        response.json(coffee['unknown'])
    } 
})


//this is how we let the server choose which port to use if we are hosting on a different server somewhere that is not the local host 
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is running on port ${PORT}!`)
})