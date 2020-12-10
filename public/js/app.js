console.log('js file pring');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageTwo.textContent = 'java script'
weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    const sValue = search.value;
    fetch('http://localhost:3000/weather?address='+ sValue ).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent = data.error
        }else{console.log(data)
            messageOne.textContent = data.location.location
            messageTwo.textContent = data.weather.temperature
        }
         
    })
})


})