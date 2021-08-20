const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv/config');


//Objects Of Animals
const animals = [
    {
        name: 'Cheetah',
        skill: 'Fastest Animal',
        color: 'Yellow',
        tag: ['fast', 'cheetah', 'cheetos', 'fastest animal']
    },
    {
     name: 'Lion',
     skill: 'King of Jungle',
     color: 'Red',
     tag: ['king', 'raja', 'Raja', 'King', 'beardful', 'beard', 'Lion', 'lion']
    },
    {
     name: 'Tiger',
     skill: 'Best Hunter',
     color: 'Orange',
     tag: ['hunter', 'tiger', 'Tiger', 'india', 'Indian', 'India Animal']
    }
];
const witouttaganimals = [
    {
        name: 'Cheetah',
        skill: 'Fastest Animal',
        color: 'Yellow',
    },
    {
     name: 'Lion',
     skill: 'King of Jungle',
     color: 'Red',
    },
    {
     name: 'Tiger',
     skill: 'Best Hunter',
     color: 'Orange',
    }
];


app.use

//To Send and parse JSON Objects    
app.use(express.json());


app.use(cors({origin: 'https://basic-rest-api-client.netlify.app'}));

app.get('/', (req, res) =>{
    return res.send('The Frontend App is Running On https://basic-rest-api-client.netlify.app/')
})

//All Animals List 
app.get('/animals/', (req,res) =>{
    return res.send(witouttaganimals);


});

//Find Animal With tags and returns the animal object
app.get('/animals/:name', (req,res) =>{
   const {name} = req.params;
   console.log(name);

   let animal;
   
 //For Loop is to find each tags for @name in objects
   for(let i = 0; i < animals.length; i++){

       const obj = animals[i];
       console.log(obj.tag)
       if(obj.tag.includes(name)){
        animal = obj;
       }
   }
   if(animal){
   
   res.send(animal);

   return;
   }
   return res.send('undefined');
});

app.listen(process.env.PORT, () =>{
    console.log(`Server is Running On ${process.env.PORT}`)
})