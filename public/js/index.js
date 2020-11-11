/* 
const proxy = "https://cors-anywhere.herokuapp.com/";

const api = await fetch(`https://api.darksky.net/forecast/9cfa1529a93c2eed955adbf5a3bd272c/`);
        

        */
  
  let lat, long;      
  const button = document.getElementById('button');
 /* currLocation();
function currLocation() {  */
    
        if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(async location =>{
            lat = location.coords.latitude;
            long = location.coords.longitude;

          try {
            document.getElementById('lat').textContent = lat.toFixed(2);
            document.getElementById('long').textContent = long.toFixed(2);
  
            //Api data parsed
            const api_url = await fetch(`/api/${lat},${long}`);
            const apiResponse = await api_url.json();
            console.log(apiResponse)
            const weather = apiResponse.weather.currently;

            const{summary, temperature} = weather;
            document.getElementById('sum').textContent = summary;
            document.getElementById('temp').textContent = temperature.toFixed();

            const sendData = {lat, long, weather};
        const options = {
        method: 'POST',
        body: JSON.stringify(sendData),
        headers: {
      'Content-Type': 'application/json'
      }
    }

    const serverData = await fetch('/clientData', options);
    const dataSent = await serverData.json();

    console.log(dataSent)
          } catch (error) {
       console.error(error);
    }

        });
    }

    

/*  }  */

/* button.addEventListener('click', async ()=>{
    

});
 */
