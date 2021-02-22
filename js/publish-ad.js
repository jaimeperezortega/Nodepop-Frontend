import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/ErrorController.js";
import PublishAdController from "./controllers/PublishAdController.js";





window.addEventListener("DOMContentLoaded", () =>{


    const loader = document.querySelector(".lds-ring");
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector(".global-errors");
    const errorsController = new ErrorController(errorsElement);

    const publishFormElement = document.querySelector("form");
    new PublishAdController(publishFormElement);
    

})