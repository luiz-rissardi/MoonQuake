
import { SismicsData } from "./data/sismicsData.js";
import { sismicMarkState } from "./app/handlers/sismicMark.js";
import { apolloLunarModuleState } from "./app/handlers/apolloLunarModule.js";
import { moonMaresStates } from "./app/handlers/moonMare.js";
import { moonTextureState } from "./app/handlers/moonTextures.js";

const selectYear = document.getElementById("selectYear");
const selectDay = document.getElementById("selectDay");
const apolloModules = document.getElementById("apolloModule");
const moonMares = document.getElementById("moonMares");
const moonQuakes = document.getElementById("moonQuakes");
const menuHamburguerButton = document.getElementById("buttonHamburguer")
const moonTypes = document.querySelectorAll('input[type="radio"]');
const moonQuakeDescription = document.getElementById("QuakeDescription")

let year, day, menuOpen;

selectYear.addEventListener("change", () => {
    year = selectYear.value;
    let optionHtml = `<option> Day </option>`;
    if (year !== "Year") {
        const dataSimiscOfYear = SismicsData.filter(el => el.year === year)
        dataSimiscOfYear.forEach(el => {
            optionHtml += `<option value="${el.day}"> ${el.day} </option>`
        })
        selectDay.innerHTML = optionHtml;
    } else {
        moonQuakeDescription.style.display = "none"
        sismicMarkState.hiddenAll();
        selectDay.innerHTML = `<option> Day </option>`;
    }
})


selectDay.addEventListener("change", () => {
    day = selectDay.value;
    SismicsData.forEach((el, index) => {
        if (el.year === year && el.day === day) {
            sismicMarkState.showSismicMark(index);

            ["year",
                "day",
                "hour",
                "minute",
                "second",
                "latitude",
                "longitude",
                "magnitude"
            ].forEach(id => {
                document.getElementById(id).innerHTML = el[id]
            })
            moonQuakes.checked = false
            if(window.innerWidth < 1000){
                moonQuakeDescription.style.display = "flex"
            }else{
                moonQuakeDescription.style.display = "block"
            }
        }
    })

})

apolloModules.addEventListener("change", () => {
    apolloLunarModuleState.toggleAll();
})

moonMares.addEventListener("click", () => {
    moonMaresStates.toggleAll();
})

menuHamburguerButton.addEventListener('click', () => {
    menuOpen = !menuOpen;
    if (menuOpen) {
        menuContent.style.display = 'block';
        menuHamburguerButton.style.transform = 'rotate(180deg)';
    } else {
        menuContent.style.display = 'none';
        menuHamburguerButton.style.transform = 'rotate(0deg)';
    }
});

moonTypes.forEach(function (radio) {
    radio.addEventListener('click', function () {
        if (radio.checked) {
            moonTextureState.showOneTexture(radio.value);
            console.log(radio.value);
            if(radio.value == "topographic"){
                document.getElementById("legendTopographic").style.display = "block";
            }else{
                document.getElementById("legendTopographic").style.display = "none";
            }
        }
    });
});


moonQuakes.addEventListener("click", () => {
    sismicMarkState.toggleAllSismicMark();
    moonQuakeDescription.style.display = "none"
})