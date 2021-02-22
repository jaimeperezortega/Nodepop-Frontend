

import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js"


export default class PublishAdController extends BaseController{
    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        if(!userIsLogged){
            window.location.href = "./login.html";
        } else {
            this.publish(this.events.FINISH_LOADING);
        }

    }

    attachEventListeners(){

    }
}