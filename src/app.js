const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geoCode = require('./utils/geoCode.js')

const app = express();
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// console.log(publicDirectory)
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectory));


app.get('/', (req, res)=>{     
    res.render('index',
                        { title: 'LSR Company',
                         name: 'Siva'  })
                        })

app.get('/help', (req, res)=>{     
    res.render('help',
                        { title: 'LSR Company',
                            message: 'this is message from me'  })
                        })

app.get('/about', (req, res)=>{     
    res.render('about',
                        { title: 'LSR Company',
                            message: 'this is message from me'  })
                        })
                
app.get('/contact', (req, res)=>{     
    res.render('about',
                       { title: 'LSR Company',
                         message: 'this is message from me'  })
})
// app.get('/help',(req, res)=>{
//     res.send('Express Help!')
// });

// app.get('/about',(req, res)=>{
//     res.send('About LSR Company')
// })

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Enter Valid address'
        })
    }

    getGeoCode(req.query.address,(error, location)=>{
        if(error){
            return res.send({error:error})
        }

        getCurrentWeather(location,(error, weather)=>{
            if(error){
                return res.send({error:error});
            }

           return res.send({
                weather: weather,
                location
            })

        })

        // res.send({
        //             latitude: location.latitude,
        //             longitude: location.longitude
        //         })
    })

 
})


// the below handles 404 page
app.get('/help/*',(req, res)=>{
    res.render('404page',{
        message:'Help artical not found'
    })
})
app.get('*',(req, res)=>{
    res.render('404page')
})


app.listen('3000',()=>{
    console.log('server is up!')
});
