
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");
const seamoreBtn=document.querySelector(".see-more");
const cityRef = document.getElementById("city");
const temp=document.querySelector("#temp")
const icon=document.querySelector(".icon");
const extrainfo=document.querySelectorAll(".condition-item");
const span=document.querySelectorAll(".value");
const weather_main=document.querySelector("p");
const weeklyforecastContainer = document.querySelector('.weekly-forecast');
const hourlyForecastContainer=document.querySelector('.forecast-grid');

// Search functionality
const searchInput = document.querySelector('.search-bar input');
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        // Handle search (in a real app, this would trigger an API call)
        console.log('Searching for:', searchInput.value);
    }
});

// Navigation item click handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
    });
});

//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h5 class="msg">Please Enter a City Name</h5>`;
  }
  //If input field is NOT empty
  else {
    key = "425132f5fc1489f979296736beebf81c";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    let url2=`https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=metric`;
    
    //Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {

        /*console.log("data=",data);
        console.log(data.weather[0].icon);
        console.log(data.weather[0].main);
        console.log(data.name);
        console.log(data.main.temp);
        console.log(data.wind.speed);
        console.log(data.main.feels_like);
        console.log(data.main.humidity);
        console.log(data.main.pressure)*/
         



        weather_main.innerHTML=`${data.weather[0].main}`;
        result.innerText=`${data.name}`;
        temp.innerText=`${Math.round(data.main.temp)}°C`;
        icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"></img>`;
        span[0].innerText=`${data.main.feels_like}`;
        span[1].innerText=`${data.wind.speed}km/h`;
        span[2].innerText=`${data.main.pressure}`;
        span[3].innerText=`${data.main.humidity}`;

      })


      // Fetching Forecast Url
      fetch(url2)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data2) => {

        console.log("data2=",data2);
        data2.list.forEach(i => {
            console.log(i.dt_txt,i.main.temp,i.weather[0].icon)

        //Today-Hourly-Forecast
          hourlyForecastContainer.innerHTML= ''; // Clear previous forecast
            data2.list.forEach((forecast, index) => {
              /*console.log(index);*/
                if (index<=8&&index!==0) { 
                    const hourlyforecastDiv =document.createElement('div');
                    hourlyforecastDiv.className="hourlyforecastDiv"
                    const specificDate=new Date(forecast.dt_txt).getUTCHours();
                    console.log(specificDate);
                    hourlyforecastDiv.innerHTML = `
                        <h4>${specificDate}:00</h4>
                        <img src="https://openweathermap.org/img/w/${forecast.weather[0].icon}.png"></img>
                        <p>${Math.round(forecast.main.temp)}°C</p>
                    `;
                    hourlyForecastContainer.appendChild(hourlyforecastDiv);
                }
            });
         //5-day Forecast
           weeklyforecastContainer.innerHTML= ''; // Clear previous forecast
            data2.list.forEach((forecast, index) => {
              /*console.log(index);*/
                if (index % 8==0) { // Get forecast for every 8th entry (24 hours apart)
                    const forecastDiv =document.createElement('div');
                    forecastDiv.className="forecastDiv"
                    forecastDiv.innerHTML = `
                        <h4>${new Date(forecast.dt_txt).toLocaleDateString()}</h4>
                        <p>${Math.round(forecast.main.temp)}°C</p>
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"></img>
                    `;
                    weeklyforecastContainer.appendChild(forecastDiv);
                }
            });
            
        });     
      })
      //If city name is NOT valid
      .catch((err) => {
        console.error(err);
        result.innerHTML = `<h5 class="msg">City Not Found</h5>`;
        
      });
  }
};



window.addEventListener("load",getWeather);
searchBtn.addEventListener("click",getWeather);










































