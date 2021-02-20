

const url = "http://localhost:8000/api/ads"


export default{
    getAds: async function (){
        
      //Aquí solo capturamos el error  cuando el servidor sí responde. Si el servidor no responde, capturaremos ese error desde fuera (en index.js cuando llamamos a este método de nuestro DAta Servie)
            const response = await fetch(url);
            if(response.ok){ //Si la respuesta del servidor es correcta (tipo 200)
                const data = await response.json();
                return data
            } else{ //Si la respuesta del servidor es incorrecta (tipo 400)
                throw new Error(`HTTP Error: ${response.status}`)
            }
    }

}
       
