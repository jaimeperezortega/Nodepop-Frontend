

const BASE_URL = "http://localhost:8000"


export default{

    post: async function (url, postData)  {
        const config = {
            method: "POST",
            headers:{"Content-Type": "application/json"}, //Informo al servidor que los datos que le estoy enviando son en formato JSON
            body: JSON.stringify(postData)// convierto el objeto de ususarios a un JSON
        };
        
        const response = await fetch(url, config);
        const data = await response.json(); // recibo respuesta del servidor ya sea OK o sea un error. Por ejemplo que ese usuario ya existe
        if (response.ok){
        
            return data
        } else {
           
            throw new Error(data.message || JSON.stringify(data)); // Si el objeto data contiene un atributo message va a devolverlo, si data.message no existe devolverá undefined y por ello le pedimos que en ese caso devuelva
        }
    },


    getAds: async function (){
        
      //Aquí solo capturamos el error  cuando el servidor sí responde. Si el servidor no responde, capturaremos ese error desde fuera (en index.js cuando llamamos a este método de nuestro DAta Servie)
      const url = `${BASE_URL}/api/ads`;      
      const response = await fetch(url);
            if(response.ok){ //Si la respuesta del servidor es correcta (tipo 200)
                const data = await response.json();
                return data
            } else{ //Si la respuesta del servidor es incorrecta (tipo 400)
                throw new Error(`HTTP Error: ${response.status}`)
            }
    },


    registerUser: async function (user){
        const url = `${BASE_URL}/auth/register`;
        return await this.post(url, user);
    },

    login: async function (user){
      
        const url = `${BASE_URL}/auth/login`;
        return await this.post(url,user);
    }

}
       
