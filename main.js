window.addEventListener("load", () => {
    let lat;
    let long;
    let location = document.querySelector(".location h1");
    let img_location = document.querySelector(".location img");
    let degree_temp = document.querySelector(".degree_temp h2");
    let description_temp = document.querySelector(".description_temp h3");
    let tepmerature = document.querySelector(".tepmerature");
    const temperature_span = document.querySelector(".tepmerature span");

   

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;//store lattiude
            long = position.coords.longitude;//store longttiude

            //let proxy = "https://cors-anywhere.herokuapp.com/"
            //let api = `${proxy}https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=2b62abbc0d8c4da28a49f47fa4a7213e&include=minutely`
            let api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9e4eea12c7c91d9ccc88ec6e9b2e0a76`
            /* fetch the data api then respnose to it then make you wnat in another function */
            fetch(api2)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    const { temp } = data.main//select data.main.temp istead of write this you can write temp
                    const temperature = temp - 273.15//convert to celcies

                    degree_temp.textContent = temperature.toFixed(1);//approciate weather
                    description_temp.textContent = data.weather[0].description;//weather description
                    //location.textContent = data.sys.country//weather country
                    img_location.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)//edit img attribute according to weather code

                    code(data.sys.country)
                    Cel_to_Fern(temperature);
                   // var mydata = JSON.parse(countries);
                    //console.log(mydata[0].name);
                    

                })
        })
    }

    var jsonFile;
    function code(count){
    fetch("countries.json")
        .then(res => res.json())
        .then(data => {
            jsonFile = JSON.parse(JSON.stringify(data)); 
            console.log(jsonFile.length);
                                
            for (var i = 0; i < jsonFile.length; i++){
                // look for the entry with a matching `code` value
                if (jsonFile[i].code == count){
                    location.textContent = jsonFile[i].name;
                }
            }

        })
    }
    function Cel_to_Fern(temperature) {
        let farnh = (9 / 5 * (temperature)) + 32

        tepmerature.addEventListener("click", () => {
            if (temperature_span.textContent === "C") {
                degree_temp.textContent = Math.floor(farnh)//approciate weather
                temperature_span.textContent = "F";
            } else {
                degree_temp.textContent = temperature.toFixed(1);//approciate weather
                temperature_span.textContent = "C";
            }
        })
    }
});
