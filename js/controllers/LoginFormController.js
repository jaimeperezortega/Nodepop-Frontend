import dataService from "../services/DataService.js";
import BaseController from "./BaseController.js"

export default class LoginFormController extends BaseController{
    constructor (element){
        super(element);
        this.attachEventListener(); 
    }
    attachEventListener(){  // ESTAMOS ATENTOS AL EVENTO DE ENVIAR EL FORMULARIO PARA EJECUTAR ALGO DESPUEÉS
        this.element.addEventListener("submit", async event =>{
            event.preventDefault();

            const user = {
                username: this.element.elements.email.value, //Obtengo el contenido de lo que lleva ese input
                password: this.element.elements.password.value

            };

            this.publish(this.events.START_LOADING);
            try {
                const data = await dataService.login(user)
               dataService.saveToken(data.accessToken); //Guardamos el token del usuario en nuestro local storage a través del método que hemos definido en el servicio de Data Service
               let next = "/";
               const queryParams = window.location.search.replace("?", ""); // Est lo que consigue es que si me pasan ?next=otrapagina ---> next=otrapagina . le quita el interrogante
               const queryParamsParts= queryParams.split("=");
               if(queryParamsParts.length >=2 && queryParamsParts[0] === "next"){
                next = queryParamsParts[1];
               }
               window.location.href= next;
            } catch (error) {
                this.publish(this.events.ERROR, error);
            } finally{
                this.publish(this.events.FINISH_LOADING);
            }
        });
        this.element.querySelectorAll("input").forEach(input =>{ //Seleccionamos todos los elementos input del formulario
            const button = this.element.querySelector("button");
            input.addEventListener("keyup", event=>{ 

                //Si el input es OK lo mcaro cn verde y si no en rojo
                if (input.validity.valid) {
                    input.classList.add('is-success');
                    input.classList.remove('is-danger');
                } else {
                    input.classList.remove('is-success');
                    input.classList.add('is-danger');
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