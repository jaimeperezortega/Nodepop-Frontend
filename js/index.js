
import {adView} from "./views.js" //Importo las vistas
import dataService from "./services/DataService.js" //Importo el servicio que me sirve como capa de abstracción para obtener datos de un backend. Lo importo con el nombre que quiera porque es un default
import AdsListController from "./controllers/AdsListController.js";
import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/ErrorController.js";



window.addEventListener("DOMContentLoaded", async event =>{


    const loader = document.querySelector(".lds-ring");
    const loaderController = new LoaderController(loader);


    //Selecciono el elemento del DOM al cual le voy a asignar el controlador de los anuncios
    const adsListElement = document.querySelector(".ads-list");
   //Asigno el controlador al elemento del DOm donde renderizo los anuncios
    const adsListController = new AdsListController(adsListElement);
    adsListController.loader = loaderController;
    adsListController.loadAds();
    
    const errorsElement = document.querySelector(".global-errors");
    const errorsController = new ErrorController(errorsElement);


     

})


