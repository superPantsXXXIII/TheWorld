export default class CountryItem {

    constructor(parent, item, Borders) {
        this.parent = parent;
        this.name = item.name.common;
        this.population = item.population;
        this.region = item.region;
        this.langs = { ...item.languages };
        this.capital = item.capital?[...item.capital]:"none";
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
            langsFormated += val + ",";
        });//[1] -> 

        let currencyFormated = "";
        Object.entries(this.currency).forEach(entry => {
            const [key, value] = entry;
            currencyFormated += key + "-" + value.name + ",";
        });//[1] -> 

        let bordesformated = "";

        if (this.borders[0] != "None") {
            this.borders.forEach(item => {
                bordesformated += item != this.borders[this.borders.length - 1]?`<a href="index.html?s=${item}">${item}</a>, `:`<a href="index.html?s=${item}">${item}</a>`;
            })
        }
        else{
            bordesformated = `${this.borders[0]}`
        }

        div.innerHTML = `
        <div class="info">
        <img src="${this.flag.png}" alt="${this.flag.alt}">
        <h1>${this.name}</h1>
        <p><b>Region</b>:${this.region}</p>
        <p><b>Capital</b>:${this.capital}</p>
        <p><b>Languages</b>:${langsFormated}</p>
        <p><b>Population</b>:${(this.population).toLocaleString(undefined, { minimumFractionDigits: 0 })/*[2]->*/}</p>
        <p><b>Currency</b>:${currencyFormated}</p>
        <p><b>Bordering nations</b>:${bordesformated}</p>
        </div>
        <div class ="theWorld">
        <iframe src="https://maps.google.com/maps?q=${this.latLang[0]},${this.latLang[1]/*[3]->*/}&z=5&ie=UTF8&iwloc=&output=embed" width="100%" height="650" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        `
    }
}