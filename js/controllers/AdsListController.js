import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";
import {adView} from "../views.js" ;





export default class  AdsListController extends BaseController{

    constructor(element){
        super(element);
        this.subscribe(this.events.SEARCH, query=>{
            this.loadAds(query);
        });
    }


    render(adsList){ //Método para renderizar el listado de anuncios
        this.element.innerHTML = ""; // Borramos primero cualquier anuncios que pueda verse en pantalla antes de renderizar los nuevos
        for (const ad of adsList){ //Bucle for para recorrer los anuncios previamente cargados por el dataService.getAds()


            const article = document.createElement("article"); // Creamos el elemento HTML article

    

            article.innerHTML = adView(ad); //Asignamos que su HTML será el definido en la vista de views.js
            

            const image = article.querySelector(".image");

            image.addEventListener("click", event=>{
               
                window.location.href = '/ficha-anuncio.html?id='+ ad.id;
                event.stopPropagation();
                
            });

            image.addEventListener("mouseover", event =>{
                article.classList.add("ad-mouse-over");
            })

            image.addEventListener("mouseout", event =>{
                article.classList.remove("ad-mouse-over");
            })

            const deleteButton = article.querySelector("button");
            if(deleteButton){
                deleteButton.addEventListener("click", async event =>{
                    const deleteConfirmed = confirm("¿Seguro que quieres borrar el anuncio?");
                    if(deleteConfirmed){
                        await dataService.deleteAd(ad);
                        article.remove(); //borramos inmediatamente el anuncio para que el usuario no lo vea
                        await this.loadAds(); //recargamos la lista de anuncios tras borrar
                    }
                    
                })
            }
            this.element.appendChild(article); //Al elemento que instanciamos desde index.js (en este caso el que lleva la etiqueta css de ads-list le añadimos el elemento article definido más arriba)
        }
    }
    
    async loadAds(query = null){ //Método para cargar los anuncios de forma asíncrona a través de mi servicio de DataService
         
    //Consigo los anuncios a través del método de mi dataService getAds(). Como es asíncrono y lo que me devuelve ese método es una promesa, debo usar await delante. Y al usar await aquí, debo usar async en la funcion
     this.publish(this.events.START_LOADING, {})
     try { // Si el servidor responde (ya sea una respuesta correcta o incorrecta)
        const adsList= await dataService.getAds(query);
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