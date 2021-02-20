import BaseController from "./BaseController.js";
import {errorView} from "../views.js";


export default class ErrorController extends BaseController{

    constructor(element){
        super(element);
        this.subscribe(this.events.ERROR, (error) =>{
            this.showError(error);
        })
    
    }
    showError(errorMessage){
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');
        this.element.addEventListener("click", (event)=>{

            //Controlamos en qué elemento del DOM hay que hacer el clic para cerrar el mensaje de error. Botón de la X o en el fondo blanco
            if (event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }
        })
    }

}