
import dataService from "../services/DataService.js";
import BaseController from "./BaseController.js";


export default class FixedBottomButtonsController extends BaseController {
    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        if(userIsLogged){
            //mostrar botón para publicar anuncio
            const newAdButton = this.element.querySelector(".new-ad-button");

            newAdButton.classList.remove("is-hidden");

            
            
        } else{
            //mostrar botón de login o de registro
            const loginRegisterButtons = this.element.querySelector(".login-register-buttons");
            loginRegisterButtons.classList.remove("is-hidden");
        }
    }


}