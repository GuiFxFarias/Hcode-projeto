import { Hamburguer } from "./types/Hamburguer";
import { Ingredient } from "./types/Ingredient";

const page = document.querySelector("body[data-display='bandeja']")

if(page) {
    
    // Mock de listagem de ingredientes (deve ser puxado do firebase)

    const opcoesEl = page.querySelectorAll(".category")
    const tiposPaesEl = opcoesEl[0] as HTMLElement
    const tiposIngredientesEl = opcoesEl[1] as HTMLElement

    const tiposPaes: Ingredient[] = []
    const tiposIngredientes: Ingredient[] = []

    // tiposPaes
    const tiposPaesh3El = tiposPaesEl.querySelectorAll("h3")
    const tiposPaesPriceEl = tiposPaesEl.querySelectorAll("div")
    for(let i = 0; i < tiposPaesh3El.length; i++) {
        
        let item: Ingredient = {
            name: "",
            price: 0
        }
        item.name = tiposPaesh3El[i].innerText
        item.price = parseFloat(tiposPaesPriceEl[i].innerText.split(" ")[1].replace(",", "."))

        // console.log("item.price", item.price, tiposPaesPriceEl[i].innerText.split(" ")[1])

        tiposPaes.push(item)

    }

    console.log(tiposPaes)

    //tiposIngredientes
    const tiposIngredientesh3El = tiposIngredientesEl.querySelectorAll("h3")
    const tiposIngredientesPriceEl = tiposIngredientesEl.querySelectorAll("div")
    for(let i = 0; i < tiposIngredientesh3El.length; i++) {
        
        let item: Ingredient = {
            name: "",
            price: 0
        }
        item.name = tiposIngredientesh3El[i].innerText
        item.price = Number(tiposIngredientesPriceEl[i].innerText.split(" ")[1].replace(",", "."))

        // console.log("item.price", item.price)

        tiposIngredientes.push(item)

    }
    console.log(tiposIngredientes)


// Carregar os hamburgueres selecionados no resumo

const bandejaEl = page.querySelector("aside ul") as HTMLUListElement
const bandejaTitulo = page.querySelector("header small") as HTMLElement
let hamburgueres: Hamburguer[] = []

const limpaBandeja = () => {
    bandejaEl.innerHTML = ""
}


const atualizaHamburgueres = () => {

    hamburgueres = []
    const hamburgueresEls = page.querySelectorAll("aside ul li")
    hamburgueresEls?.forEach( hamburguerEl => {

        const hamburguerElData = hamburguerEl.querySelectorAll("div")
        
        
        let hamburguer = {
            description: hamburguerElData[0].innerHTML,
            price: parseFloat(hamburguerElData[1].innerHTML.split(" ")[1].replace(",", "."))
        }
        
        hamburgueres.push(hamburguer)

        
    });
}


const atualizaBandeja = () => {

    switch (hamburgueres.length) {
        case 0:
            bandejaTitulo.innerText = ""
            break;
        case 1:
            bandejaTitulo.innerText = `${hamburgueres.length} Hamburguer`
            break;
        default:
            bandejaTitulo.innerText = `${hamburgueres.length} Hamburgueres`
            break;
    }
    
}


const render = () => {
    limpaBandeja()
    atualizaHamburgueres()
    atualizaBandeja()
}

render()
      

    
}