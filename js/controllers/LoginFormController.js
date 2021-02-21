import dataService from "../services/DataService.js";
import BaseController from "./BaseController.js"

export default class LoginFormController extends BaseController{
    constructor (element){
        super(element);
        this.attachEventListener(); 
    }
}