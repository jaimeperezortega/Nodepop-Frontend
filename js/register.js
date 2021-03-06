
import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/ErrorController.js";
import RegisterFormController from "./controllers/RegisterFormController.js";



window.addEventListener("DOMContentLoaded", () =>{


    const loader = document.querySelector(".lds-ring");
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector(".global-errors");
    const errorsController = new ErrorController(errorsElement);

    const registerFormElement = document.querySelector("form");
    const registerFormController = new RegisterFormController(registerFormElement);

})