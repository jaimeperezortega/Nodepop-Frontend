import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";
import {adView} from "../views.js" ;




export default class  AdsListController extends BaseController{


    render(adsList){ //Método para renderizar el listado de anuncios
        for (const ad of adsList){ //Bucle for para recorrer los anuncios previamente cargados por el dataService.getAds()
            const article = document.createElement("article"); // Creamos el elemento HTML article
            article.innerHTML = adView(ad); //Asignamos que su HTML será el definido en la vista de views.js
            const deleteButton = article.querySelector("button");
            if(deleteButton){
                deleteButton.addEventListener("click", async event =>{
                    const deleteConfirmed = confirm("¿Seguro que quieres borrar el anuncio?");
                    if(deleteConfirmed){
                        await dataService.deleteAd(ad);
                    }
                    
                })
            }
            this.element.appendChild(article); //Al elemento que instanciamos desde index.js (en este caso el que lleva la etiqueta css de ads-list le añadimos el elemento article definido más arriba)
        }
    }
    
    async loadAds(){ //Método para cargar los anuncios de forma asíncrona a través de mi servicio de DataService
         
    //Consigo los anuncios a través del método de mi dataService getAds(). Como es asíncrono y lo que me devuelve ese método es una promesa, debo usar await delante. Y al usar await aquí, debo usar async en la funcion
     this.publish(this.events.START_LOADING, {})
     try { // Si el servidor responde (ya sea una respuesta correcta o incorrecta)
        const adsList= await dataService.getAds();
        this.render(adsList);
        

     } catch (error) { //Si el servidor no responde por un problema de conexión cazamos aquí el error
        console.error(error);
        this.publish(this.events.ERROR, error)
         
     } finally{
         //Esto se ejecuta siempre, vaya bien o vaya mal
         this.publish(this.events.FINISH_LOADING, {})
     }
    }
}