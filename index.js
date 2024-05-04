
// const x = fetch("https://api.openweathermap.org/data/2.5/weather?q=bengaluru&appid=6d8de3aa2e1837072e5c5d24ea62ff54&units=metric");

const textBox = document.querySelector('#searchBox');
const searchBtn = document.querySelector('.search');
const maxInfo = document.querySelector('#max-temp');
const avgInfo = document.querySelector('#avg-temp');
const minInfo = document.querySelector('#min-temp');
const humidInfo = document.querySelector('#humidInfo');
const windInfo = document.querySelector('#windInfo');
const mainDiv = document.querySelector('.main');
const weatherDiv = document.querySelector('.imgDiv');
const weatherText = document.querySelector('#weatherDetail');

const card = document.querySelector('.card');
const searchCard = document.querySelector('.searchCard');
const mainCard = document.querySelector('.mainCard');
const h2 = document.querySelectorAll('h2');
const bottomCard = document.querySelector('.bottomCard');
const weatherDetail = document.querySelector('#weatherDetail');
const tempDetails = document.querySelectorAll('.temp-details');
const tempContainer = document.querySelector('.tempContainer');
const botInfo = document.querySelectorAll('.botInfo');
const mainHead = document.querySelector('#mainHead');
   

searchBtn.addEventListener('click',function(){

    const x = textBox.value;
    // console.log(x);
    const apiPromise = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${x}&appid=6d8de3aa2e1837072e5c5d24ea62ff54&units=metric`);
    

    apiPromise
    .then(function(apiObj){
       return apiObj.json();
    })
    .then(function(promise){
        const processedData = promise;
        // console.log(processedData);
        minInfo.innerHTML = `${processedData.main.temp_min}&degc`;
        avgInfo.innerHTML = `${Math.round(processedData.main.temp)}&degc`;
        maxInfo.innerHTML = `${processedData.main.temp_max}&degc`;
        windInfo.innerHTML =`${Math.round(processedData.wind.speed)}km/h`;
        humidInfo.innerHTML = `${processedData.main.humidity}%`;


        const sunriseTimestamp = processedData.sys.sunrise * 1000; 
        const sunsetTimestamp = processedData.sys.sunset * 1000;
        const sunriseTime = new Date(sunriseTimestamp);
        const sunsetTime = new Date(sunsetTimestamp);
        const currentTime = new Date();
        
        
        const currWeather = processedData.weather[0].main;
        // console.log(currWeather);
        weatherText.innerHTML = processedData.weather[0].main;
        
        // Compare current time with sunrise and sunset
        if (currentTime > sunriseTime && currentTime < sunsetTime) {
            // console.log("It's day.");
            mainDiv.style.backgroundImage = "url(general-assets/sky.jpg)";
            weatherDiv.style.backgroundImage = `url(day-assets/${currWeather}.png)`;
            dayMode();





        } else {
            // console.log("It's night.");
            mainDiv.style.backgroundImage = "url(general-assets/night.jpg)";
            weatherDiv.style.backgroundImage=`url(night-assets/night-${currWeather}.png)`;
            nightMode();
        }

      
       
    })
   
    
    function nightMode(){
        card.style.background = "linear-gradient(135deg, #03274b,#000000)";
        card.style.boxShadow = "-5px 5px 10px rgb(0, 0, 0)";
        searchCard.style.borderTop = "2px solid #392ed9";
        searchBtn.style.background= "linear-gradient(135deg, #3f28ee,#5751c7)";
        textBox.style.background= "linear-gradient(135deg, #05092e,#121d3d)";
        textBox.style.borderColor = "#255acd";
        
        mainCard.style.borderTop = "2px solid #3431d5";
        tempDetails.forEach(function(item){
            item.style.color = "white";
        })
        bottomCard.style.borderTop = "2px solid #3431d5";
        weatherDetail.style.color = "rgb(65,65,208)";
        tempDetails.forEach(function(item){
            item.style.color = "white";
        })

        tempContainer.style.borderTop = "2px solid #3431d5";
        tempContainer.style.background = "linear-gradient(135deg, #03274b,#000000)";

        botInfo.forEach(function(item){
            item.style.color = "white";
        })
        mainHead.style.color = "rgb(65,65,208)";
    }
    

    function dayMode(){
        card.style.background = "linear-gradient(135deg,#9CECFB,#65C7F7,#00378e)";
        card.style.boxShadow ="-5px 5px 10px #01173e";
        searchCard.style.borderTop = "2px solid #ffffff";
        mainCard.style.borderTop = "2px solid white";
        h2.forEach(function(item){
            item.style.color = "#001933";
        })
        bottomCard.style.borderTop = "2px solid white";
        tempContainer.style.borderTop = "2px solid white";
        tempContainer.style.background = "linear-gradient(135deg,#9CECFB,#65C7F7,#00378e)";
        tempDetails.forEach(function(item){
                    item.style.color = "#001933";
                });
        weatherDetail.style.color = "#040432";
        textBox.style.background = "linear-gradient(135deg, #70cbff,#0091ff)";
        textBox.style.borderColor = "#1a98ff";
    }
        
})

