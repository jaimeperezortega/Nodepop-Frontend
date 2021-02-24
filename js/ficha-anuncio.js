import {adView} from "./views.js" //Importo las vistas
import dataService from "./services/DataService.js" //Importo el servicio que me sirve como capa de abstracción para obtener datos de un backend. Lo importo con el nombre que quiera porque es un default

import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/ErrorController.js";
import AdDetailedInfoController from "./controllers/AdDetailedInfoController.js"




window.addEventListener("DOMContentLoaded", async event =>{


    const loader = document.querySelector(".lds-ring");
    const loaderController = new LoaderController(loader);

    
    const errorsElement = document.querySelector(".global-errors");
    const errorsController = new ErrorController(errorsElement);

    const adDetailedInfo = document.querySelector(".ad-info");
    const adDetailedInfoController = new AdDetailedInfoController(adDetailedInfo);
    adDetailedInfoController.loadAd();
    

   
     

});