// DoApi
export const doApi = async(_city) => { 
    try{
        
        let url = `https://restcountries.com/v3.1/name/${_city}?fullText=true`;
        hideDiv();
        let resp = await axios.get(url)
        console.log(resp.data)
        updateInfoUi(resp.data)
        initMap(resp.data)
        showDiv();
    }
    catch(err){
        console.log(err);
        hideDiv();
        document.querySelector("#id_message").classList.remove("d-none")
        document.querySelector("#id_message").innerHTML = `
        <h3>${_city}, Contry Cannot Be Found</h3> 
        <p class="mx-auto">Try Again</p> 
        `
    }

}



// Hide Div
export const hideDiv = () => {
    document.querySelector("main").style.display = "none";
    document.querySelector("article").style.display = "none";
    
  }

// Show
  const showDiv = () => {
    document.querySelector("main").style.display = "block";
    document.querySelector("article").style.display = "block";
    document.querySelector("#id_message").classList.add("d-none");
}

// DoApi For Borders
export const doApiBorders = async(_border) => { 
        let url = `https://restcountries.com/v3.1/alpha/${_border}`
        let resp = await axios.get(url)
        console.log(resp.data)
        updateInfoUi(resp.data)
        initMap(resp.data)
}




// Up Date Info Ui
const updateInfoUi = async (json) => {
    document.querySelector("#id_img").src =json[0].flags.png;
    document.querySelector("#id_name").innerHTML = json[0].name.common;
    document.querySelector("#id_pop").innerHTML =`
    <p><b>POP:</b> ${json[0].population.toLocaleString()}</p> 
    ` ;

    document.querySelector("#id_region").innerHTML = `
    <p><b>Region: </b>${json[0].region}</p>
    ` ;

    document.querySelector("#id_languages").innerHTML =`
    <p><b>Languages:</b> ${Object.values(json[0].languages)} </p>
    `;

  let vulCurrency = Object.keys(json[0].currencies);
    document.querySelector("#id_coin").innerHTML = `
    <p><b>Coin:</b> ${Object.values(json[0].currencies[vulCurrency])}</p>   
    `;

    document.querySelector("#id_capital").innerHTML =`
    <p><b>Capital:</b>  ${json[0].capital}</p>  
    
    ` ;

    document.querySelector("#id_capital").innerHTML =`
    <p><b>Capital:</b> ${json[0].capital}</p>  
     
    ` ;

    // CreateElement("div")
    // Borders.map
    // Send to doApi
    // Replace Children - Initialization For Div
    const bordersContainer = document.getElementById('id_borders');
    bordersContainer.replaceChildren([])

    const borders = json[0].borders;
    const bordersData = await getBordersData(borders)

    const borderDivs = borders.map(  border => {
        const newDiv = document.createElement("div");
        newDiv.innerText = bordersData[border].name.common;
        newDiv.onclick = async () => {
            console.log( border);
            doApiBorders(border);
        }

        return newDiv;
    })



    // Up Date Info Ui Borders
    bordersContainer.replaceChildren(...borderDivs);
    console.log( borders);


}

const getBordersData = async (borders) => {
    const codes = borders.join(',')
    const url = `https://restcountries.com/v3.1/alpha?codes=${codes}`;
    const resp = await axios.get(url)
    let data = resp.data ;
    const bordersDataMap = {};

    Object.values(data).forEach(borderData => {
        bordersDataMap[borderData.cca3] = borderData
    })

    return bordersDataMap;
}


// Up Date Info Ui Map
export const initMap = (json) =>{

    let x = json[0].latlng[0]
    console.log(x)
    let y = json[0].latlng[1]
    // console.log(x)
    let option = {
    
        center:{ lat: x, lng: y },
        zoom:4,
    } 
    const map = new google.maps.Map(document.getElementById("map"),option);

    // Marker
    const marker = new google.maps.Marker({
        position: { lat: json[0].latlng[0], lng: json[0].latlng[1] },
        map: map,
      });
}

// Declare Events
export const declareEvents = () => {
    let id_input = document.querySelector("#id_input");
    let search_btn = document.querySelector("#btn_Search");
    let usa_button = document.querySelector("#id_usa");
    let israel_button = document.querySelector("#id_israel");
    let france_button = document.querySelector("#id_france");
    let thailand_button = document.querySelector("#id_thailand");
 
    search_btn.addEventListener("click",() => {
        doApi(id_input.value)
    })
    id_input.addEventListener("keydown",(e) => {
        if(e.key == "Enter"){
            doApi(id_input.value);
        }
    })
    usa_button.addEventListener("click", () => {
        doApi("United States")
    })
    israel_button.addEventListener("click", () => {
        doApi("israel")
    })
    france_button.addEventListener("click", () => {
        doApi("france")
    })
    thailand_button.addEventListener("click", () => {
        doApi("thailand")
    })
 
    }
