console.log('script loaded!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error
            }
            console.log(data)
            messageOne.textContent = data.forecast.text
        })
    })
} )