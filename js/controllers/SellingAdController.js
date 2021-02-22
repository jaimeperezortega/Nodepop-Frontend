

import BaseController from "./BaseController.js";
import dataService from "../services/DataService.js"


export default class SellingAdController extends BaseController{
    constructor(element){
        super(element);
        this.checkIfUserIsLogged();
        this.attachEventListeners();
        this.focusInProductNameTextArea();
    }

    async checkIfUserIsLogged(){
        const userIsLogged = await dataService.isUserLogged();
        if(!userIsLogged){
            window.location.href = "./login.html";
        } else {
            this.publish(this.events.FINISH_LOADING);
        }

    }

    focusInProductNameTextArea(){
        const productNameTextArea = document.querySelector(".ad-name");
        productNameTextArea.focus();
    }

    attachEventListeners(){
        //a medida que el usuario escribe, comprobamos que el formulario es válido para habilitar o no el bot´n de enviar

        //Selecciono primero los campos de texto (tanto los input text como los textarea)


        const button = this.element.querySelector(".selling-button");

        this.element.querySelectorAll(".input-text").forEach(inputText =>{ //Seleccionamos todos los elementos input del formulario
            
            inputText.addEventListener("keyup", event=>{ 

                //Si el input es OK lo mcaro cn verde y si no en rojo
                if (inputText.validity.valid) {
                    inputText.classList.add('is-success');
                    inputText.classList.remove('is-danger');
                } else {
                    inputText.classList.remove('is-success');
                    inputText.classList.add('is-danger');
                }

                //Valido que todo el formulario es OK para habilitar o deshabilitar el botón
                if(this.element.checkValidity()) {
                    button.removeAttribute("disabled");
                } else {
                    button.setAttribute("disabled", true);
                }

    
            })
        })

    }
}