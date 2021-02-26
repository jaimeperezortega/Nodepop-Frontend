import dataService from "../services/DataService.js";
import BaseController from "./BaseController.js"

export default class LogOutButtonController extends BaseController{
    constructor (element){
        super(element);
        this.attachEventListener(); 
        this.checkIfUserIsLogged();
    }
    attachEventListener(){  
        this.element.addEventListener("click", async event =>{
            event.preventDefault();

            localStorage.removeItem("token");
               window.location.href= "/";
           
        });
       
    };

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        const logOutButton = document.querySelector(".log-out-button");
        
        if (userIsLogged){
            logOutButton.classList.remove("is-hidden");
        } else {
            logOutButton.classList.add("is-hidden");
        }
    }
}