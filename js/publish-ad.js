import LoaderController from "./controllers/LoaderController.js";
import ErrorController from "./controllers/ErrorController.js";
import SellingAdController from "./controllers/SellingAdController.js";
import BuyingAdController from "./controllers/BuyingAdController.js";
import LogOutButtonController from"./controllers/LogOutButtonController.js";





window.addEventListener("DOMContentLoaded", () =>{


    const loader = document.querySelector(".lds-ring");
    const loaderController = new LoaderController(loader);

    const errorsElement = document.querySelector(".global-errors");
    const errorsController = new ErrorController(errorsElement);

    const sellingAdform = document.querySelector(".selling-form");
    new SellingAdController(sellingAdform);
    

    const buyingAdForm = document.querySelector(".buying-form");
    new BuyingAdController(buyingAdForm);

    const logOutButton= document.querySelector(".log-out-button");
    const logOutButtonController = new LogOutButtonController(logOutButton);

})