import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/ErrorController.js";
import LoginFormController from "./controllers/LoginFormController.js";




window.addEventListener("DOMContentLoaded", () =>{


    const loader = document.querySelector(".lds-ring");
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector(".global-errors");
    const errorsController = new ErrorController(errorsElement);

    const loginFormElement = document.querySelector("form");
    new LoginFormController(loginFormElement);

})