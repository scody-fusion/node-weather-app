console.log('hello from client side js');

const baseUrl = '/weather?address=';

// const fetchWeatherResults = (location) => {
    // const requestUrl = `${baseUrl}${location}`;
//     console.log(`requestUrl ${requestUrl}`)
//     fetch(requestUrl)
//     .then((res) => {
//         res.json()
//         .then((data) => {
//             if(data.error) {
//                 return console.log(data.error);
//             }
    
//             console.log(data.location, data.forecastData);
//             return data;
//         })
//     })
// };


const weatherForm = document.querySelector('#weather-form')
const addressInput = document.querySelector('#address-input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = addressInput.value;
    const requestUrl = `${baseUrl}${location}`;
    
    messageOne.textContent = 'Loading';
    messageTwo.textContent = '';

    fetch(requestUrl)
    .then(res => res.json())
    .then((data) => {
        if (data.error) {
            console.log(data.error);
            return messageOne.textContent = data.error
        }


        console.log(data.location, data.forecastData);
        messageOne.textContent = data.location;
        return messageTwo.textContent = data.forecastData;
    })
    .then((data) => {
        // inject weather results
    })
})