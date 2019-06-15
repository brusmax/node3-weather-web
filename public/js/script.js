console.log('script loaded!');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                return messageOne.textContent = data.error
            }
            const forecast = data.forecast.currently
            messageOne.innerHTML = '<b>Summary</b>: ' + forecast.summary + '<br><b>Probability rain:</b>  ' + forecast.precipProbability + '<br><b>Temperature:</b>  ' + forecast.temperature + '<br><b>Humidity:</b>  ' + (forecast.humidity * 100) + '%' + '<br><b>Wind Gust:</b>  ' + forecast.windGust + 'Km/h'
        })
    })
} )