export const declareEvents = () => {
    let id_input = document.querySelector("#id_input");
    let search_btn = document.querySelector("#search_btn");
    search_btn.addEventListener("click",() => {
      window.location.href = `index.html?s=${id_input.value}`;
    })
}