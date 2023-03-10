import CountryItem from "./countryItem.js";
import { declareEvents } from "./worldEvents.js"



const getCountryAPI = async () => {
    const search = new URLSearchParams(window.location.search);
    let query = search.get("s") || "Eswatini";
    query = query.toLowerCase() == "united states"?"usa":query;
    let url = `https://restcountries.com/v3.1/name/${query}`;
    url += (query.toLowerCase() == "china" || query.toLowerCase() =="niger")?"?fullText=true":"";
    let resp = await fetch(url);
    let data = await resp.json();
    //console.log(data);
    //console.log(Object.getOwnPropertyNames(data[0].currencies));
    
    if(!data.message){
        let borders_arr = data[0].borders ? await forLoop(data[0].borders) : ["None"];
      //  console.log(borders_arr)
    
        displayCountry(data[0], borders_arr);
    }
    else{
        document.querySelector("#countryParent").innerHTML=`<h2 style="font-size:3em">404 Not Found ;-; Please Refine your search tearm</h2>`
    }
}

const forLoop = async arr => {

    let arrBorders = [];
    //  console.log("“Start”");

    for (let i = 0; i < arr.length; i++) {
        let resp = await getCountryByCode(arr[i]).then(data => {
            //    console.log(arr[i])
            //    console.log(data[0])
            arrBorders.push(data[0].name.common);
        })
    }
    // console.log("“End”");
    return arrBorders;
}// [4] ->

const getCountryByCode = async item => {
    let url = `https://restcountries.com/v3.1/alpha/${item}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data;
}

const displayCountry = (item, borders) => {
    let country = new CountryItem("#countryParent", item, borders);
    country.render();
}


//getCountryAPI("Eswatini")
getCountryAPI();
declareEvents();