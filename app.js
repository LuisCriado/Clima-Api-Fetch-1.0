window.addEventListener("load",() => {

    let longitude;
    let latitud;

    let ubicaccion = document.getElementById("ubicaccion");
    let temperaturaValor =  document.getElementById("temperatura-valor");
    let temperaturaDescripcion =  document.getElementById("temperatura-descripcion");
    let vientoVelocidad =  document.getElementById("viento-velocidad");
    let iconoAnimado =document.getElementById("icono-animado");
    let ciudad = document.getElementById("ciudad");
    let boton = document.getElementById("boton");

   

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
           
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            //ubucaion actual
            //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d967a4c52a1e50d5115e5dd32bece1c3
            //`;

            //ubicacion por ciudad
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Argentina&lang=es&units=metric&appid=d967a4c52a1e50d5115e5dd32bece1c3`

            fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data.main.temp);
                let temp = Math.round(data.main.temp);
                temperaturaValor.textContent = `${temp} °C`;
                console.log(data.weather[0].description);
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase();

                
                ubicaccion.textContent = data.name;

                let velocidad = data.wind.speed;

                vientoVelocidad.textContent = `${velocidad} km/h`;
                //iconos estaticos
              /*  let iconCode = data.weather[0].icon;
                const urlIcon=` http://openweathermap.org/img/wn/${iconCode}.png`

                console.log(urlIcon);*/


                //iconos animados

                switch (data.weather[0].main) {
                    case 'Clear':
                        iconoAnimado.src = 'animated/day.svg'
                        
                        break;
                    case 'Clouds':
                        iconoAnimado.src = 'animated/cloudy.svg'

                        break;
                    case 'Rain':
                        iconoAnimado.src = 'animated/rain.svg'
                        break;
                    case 'Snow':
                        iconoAnimado.src = 'animated/snow.svg'
                        break;
                    case 'Thunderstorm':
                        iconoAnimado.src = 'animated/thunder.svg'
                        break;
                    case 'Drizzle':
                        iconoAnimado.src = 'animated/drizzle.svg'
                        break;

                
                    default:
                        break;
                }

                

                
            })
            .catch(error => {
                console.log(error);
            })

        })
    }
})

