

const BASE_URL = "http://localhost:8000";
const TOKEN_KEY = "token";

//En los servicios no usar arrow functions al definir los métodos

export default{

    post: async function (url, postData)  {
        const config = {
            method: "POST",
            headers:{'Content-Type': 'application/json'}, //Informo al servidor que los datos que le estoy enviando son en formato JSON
            body: JSON.stringify(postData)// convierto el objeto de ususarios a un JSON
        };
       
        
        const token = await this.getToken();
       
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
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
                //Si quisiera modelizar los datos que recibo desde el backend para que tengan otra estructura, puedo hacer un return data.map para devolver la estructura de datos que me interese. En el backend los datos pueden tener otras propiedades, nombres, etc
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
    },

    saveToken: async function(token){
        localStorage.setItem(TOKEN_KEY, token);
    },

    getToken: async function(){
        return localStorage.getItem(TOKEN_KEY);
    },

    isUserLogged: async function (){
        const token = await this.getToken();
        return token !== null;// Si el token no es nulo, el usuario está autenticado, pero si es nulo no está autenticado. Es una expresión booleana que devuelve true o false
    },

    saveAd: async function(ad){
        const url = `${BASE_URL}/api/ads`;
        console.log(ad);
        return await this.post(url, ad);
        
    }

};


       
