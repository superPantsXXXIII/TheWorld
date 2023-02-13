export default class CountryItem {

    constructor(parent, item, Borders) {
        this.parent = parent;
        this.name = item.name.common;
        this.population = item.population;
        this.region = item.region;
        this.langs = { ...item.languages };
        this.capital = [...item.capital];
        this.currency = { ...item.currencies }
        this.latLang = [...item.latlng];
        this.borders = [...Borders];
        this.flag = { ...item.flags };
    }

    render() {
        let div = document.createElement("div");
        div.className = "box";
        document.querySelector(this.parent).append(div);
        let langsFormated = "";
        Object.values(this.langs).forEach(val => {
            langsFormated += val + " ";
        });//[1] -> 

        let currencyFormated = "";
        Object.entries(this.currency).forEach(entry => {
            const [key, value] = entry;
            currencyFormated += key + ":" + value.name + " ";
        });//[1] -> 

        let bordesformated = "";

        if (this.borders[0] != "none") {
            this.borders.forEach(item => {
                bordesformated += `<a href="index.html?s=${item}">${item}</a>  `
            })
        }

        div.innerHTML = `
        <img src="${this.flag.png}" alt="${this.flag.alt}">
        <h1>${this.name}</h1>
        <p>${this.region}</p>
        <p>${this.capital}</p>
        <p>${langsFormated}</p>
        <p>${(this.population).toLocaleString(undefined, { minimumFractionDigits: 0 })/*[2]->*/}</p>
        <p>${currencyFormated}</p>
        <p>${bordesformated}</p>
        <iframe src="https://maps.google.com/maps?q=${this.latLang[0]},${this.latLang[1]/*[3]->*/}&z=6&ie=UTF8&iwloc=&output=embed" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        `
    }
}