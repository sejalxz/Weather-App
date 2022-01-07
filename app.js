window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let tempicon=document.getElementById("temp-icon");
    let temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span')
     

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e349241ce2b34065282c0e1a64ac9f62`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data =>{

                    console.log(data);
                    const{feels_like}=data.main;
                    const{id,main,icon}=data.weather[0];
                    const timezone = data.timezone;

                    //SET DOM Elements from the API
                    temperatureDegree.textContent= (feels_like-273).toFixed(2);
                    temperatureDescription.textContent=main;

                    //SET TIMEZONE 
                    locationTimezone.textContent= Intl.DateTimeFormat().resolvedOptions().timeZone;

                    //SET SVG
                    
                    if(id<300 && id>200)
                    {
                        tempicon.src="../Weather App/weather_icons/thunderstorm.svg"
                    }
                    else  if(id<400 && id>300)
                    {
                        tempicon.src="../Weather App/weather_icons/cloud-solid.svg"
                    }
                    else if(id<600&& id>500)
                    {
                        tempicon.src="../Weather App/weather_icons/rain.svg"
                    }
                    else  if(id<700 && id>600)
                    {
                        tempicon.src="../Weather App/weather_icons/snow.svg"
                    }
                    else  if(id<800 && id>700)
                    {
                        tempicon.src="../Weather App/weather_icons/clouds.svg"
                    }
                    else if(id==800)
                    {
                        tempicon.src="../Weather App/weather_icons/clouds-and-sun.svg"
                    }

                    //Change Temperature to Celsius/Fahrenheit
                    temperatureSection.addEventListener('click' , ()=>{
                        if(temperatureSpan.textContent===" F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent= (feels_like-273).toFixed(2);
                        }
                        else{
                            temperatureSpan.textContent = " F";
                            temperatureDegree.textContent= 
                            ((feels_like- 273.15) * 9/5+ 32).toFixed(2);
                        }
                    });

                });   

        });
  
    }

});



