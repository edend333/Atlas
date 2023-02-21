import { config } from "../config.js";
import { doApi, declareEvents, initMap, doApiBorders } from "./mapList.js"

const init = () => { 
    addGoogleMap();
    declareEvents();
    doApi("israel");
    doApiBorders();
    initMap();
    
}

const addGoogleMap = () => {
    const mapScript = document.createElement('script');
    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${config.GOOGLEMAP_API_KEY}&callback=initMap`;
    mapScript.setAttribute('src', scriptUrl);
    document.head.appendChild(mapScript);
}


init();

