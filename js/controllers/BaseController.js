import pubSub from "../services/PubSub.js"


export default class BaseController {
    constructor(element){
        this.element = element;
        this.pubSub = pubSub;
        this.events = {
            START_LOADING: "startLoading",
            FINISH_LOADING: "finishLoading",
            ERROR: "error",
            LOAD_SINGLE_AD: "loadSingleAd"
        };
    }

    subscribe(eventName, eventHandler){
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventData){
        this.pubSub.publish(eventName, eventData);
    }
}