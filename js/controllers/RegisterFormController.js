import dataService from "../services/DataService.js";
import BaseController from "./BaseController.js"


export default class RegisterFormController extends BaseController{

    constructor (element){
        super(element);
        this.attachEventListener(); //En el momento en que se instancia este controlador se pone a "escuchar" los eventos del formulario    }
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
                const data = await dataService.registerUser(user)
                console.log("USUARIO CREADO", data)
                window.location.href = "/login.html"; //Una vez se registra satisfactoriamente el usuario le redirigimos a la página de login
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