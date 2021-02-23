

const BASE_URL = "http://localhost:8000";
const TOKEN_KEY = "token";

//En los servicios no usar arrow functions al definir los métodos

export default{

    post: async function(url, postData, json=true){
        return await this.request("POST", url, postData, json);
    },

    delete: async function(url){
        return await this.request("DELETE", url, {});
    },

    put: async function(url, putData, json =true){
        return await this.request("PUT", url, putData, json);
    },

    request: async function (method, url, postData, json=true)  {
        const config = {
            method: method,
            headers:{}, 
            body: null
        };
        if(json){
            config.headers['Content-Type'] = 'application/json' //Informo al servidor que los datos que le estoy enviando son en formato JSON
            config.body = JSON.stringify(postData)// convierto el objeto de ususarios a un JSON
        }else {
            config.body = postData; //En caso de que no sea json le vamos a pasar el body tal y como ns llega
        }
       
        
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
        const currentUser = await this.getUser();
        
      //Aquí solo capturamos el error  cuando el servidor sí responde. Si el servidor no responde, capturaremos ese error desde fuera (en index.js cuando llamamos a este método de nuestro DAta Servie)
      const url = `${BASE_URL}/api/ads?_sort=id&_order=desc`; //Para ordenar los anuncios de forma descendente (los más nuevos primero) . Para ello, el backend me tiene que permitir ordenarlo de esta forma     
      const response = await fetch(url);
            if(response.ok){ //Si la respuesta del servidor es correcta (tipo 200)
                const data = await response.json();
                
                return data.map(ad=>{
                    const user = ad.user || {};
                    return{
                        id: ad.id,
                        name: ad.name.replace(/(<([^>]+)>)/gi, ""),
                        onSale: ad.onSale,
                        price: ad.price.replace(/(<([^>]+)>)/gi, ""),
                        adText: ad.adText.replace(/(<([^>]+)>)/gi, ""),
                        updatedAt: ad.updatedAt,
                        image: ad.image || null,
                        canBeDeleted: currentUser ? currentUser.userId === ad.userId : false //Operador ternario --> Si currentuser es nulo, canbeDeleted es false. Si currentUser es verdadero se cumple lo que hay después de la interrogación (currentUser.userId === ad.user). Los anuncios van a ser borrables solo si currentUserId coincide con el userId del anuncio en cuestión
                    }
                    
                    

                })
                //Modelizamos los datos que recibo desde el backend para que tengan otra estructura, puedo hacer un return data.map para devolver la estructura de datos que me interese. En el backend los datos pueden tener otras propiedades, nombres, etc. Aemás le meto una expresión regular en los campos de texto parw evitar inyecciones de código malicioso
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
        if (ad.image){
            const imageURL = await this.uploadImage(ad.image);
            ad.image = imageURL;
        }
        return await this.post(url, ad);
        
    },

    uploadImage: async function(image){
        const form = new FormData();
        form.append("file", image);
        const url = `${BASE_URL}/upload`;
        const response = await this.post(url, form, false); //Avisamos a nuestro método post que lo que le enviamos no es en formato json
        return response.path || null;
    },
    
    getUser: async function(){
        
        try {
            const token = await this.getToken();
            const tokenParts = token.split(".");
            if(tokenParts.length !==3){
                return null // En este caso no es un token correcto así que devuelvo null
            }
            
            
                const payload = tokenParts[1]; //cogemos el payload, codificado en base 64
            const jsonStr = atob(payload); //decodificamos en base 64
            const {userId, username} = JSON.parse(jsonStr); //parseamos el JSON del token descodificado

            //Esto es object destructuring. De todo el objeto que nos devuelve la decodificación y el parseado del token, nosotros queremos quedarnos con solo dos de sus 4 propiedades (userId y userName)
            return {userId, username}; //Aquí estamos devolviendo un objeto cuyas propiedades se llaman igual que su valor, por eso se simplifica pero sería lo mismo que:
            //{userId:userId, username:username}
            
        } catch (error) {
            return null;
        }
       
    },

   
    deleteAd: async function(ad) {
        const url = `${BASE_URL}/api/ads/${ad.id}`;
        return await this.delete(url);
    }

};


       
