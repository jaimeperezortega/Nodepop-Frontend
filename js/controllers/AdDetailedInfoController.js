


import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js";
import {adDetailedInfo} from "../views.js" ;





export default class  AdDetailedInfoController extends BaseController{


    render(ad){ 
       
        
    const article = document.createElement("article"); 
    article.innerHTML = adDetailedInfo(ad); 
           
    this.element.appendChild(article); 
        
    }
    
    async loadAd(){ 
         
    
     this.publish(this.events.START_LOADING, {})
     try { // Si el servidor responde (ya sea una respuesta correcta o incorrecta)
        const adInfo= await dataService.getSingleAd();
        this.render(adInfo);
        

     } catch (error) { //Si el servidor no responde por un problema de conexión cazamos aquí el error
        console.error(error);
        this.publish(this.events.ERROR, error)
         
     } finally{
         //Esto se ejecuta siempre, vaya bien o vaya mal
         this.publish(this.events.FINISH_LOADING, {})
     }
    }
}