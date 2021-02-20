import BaseController from "./BaseController.js";
import {errorView} from "../views.js";

export default class ErrorController extends BaseController{


    showError(errorMessage){
        this.element.innerHTML = errorView(errorMessage);
        this.element.classList.remove('hidden');
        this.element.addEventListener("click", (event)=>{
            if (event.target == this.element || event.target.classList.contains('delete')) {
                this.element.classList.add('hidden');
            }
        })
    }

}