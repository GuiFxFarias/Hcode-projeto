
const page = document.querySelector("body[data-display='bandeja']")

if(page) {
    
    // Mock de listagem de ingredientes (deve ser puxado do firebase)

        // types
        type tiposPaesItem = {
            name: string;
            price: string;
        }
        type tiposIngredientesItem = {
            name: string;
            price: string;
        }
       

    const opcoesEl = page.querySelectorAll(".category")
    const tiposPaesEl = opcoesEl[0] as HTMLElement
    const tiposIngredientesEl = opcoesEl[1] as HTMLElement

    const tiposPaes: tiposPaesItem[] = []
    const tiposIngredientes: tiposIngredientesItem[] = []

    // tiposPaes
    const tiposPaesh3El = tiposPaesEl.querySelectorAll("h3")
    const tiposPaesPriceEl = tiposPaesEl.querySelectorAll("div")
    for(let i = 0; i < tiposPaesh3El.length; i++) {
        
        let item: tiposPaesItem = {
            name: "",
            price: ""
        }

        console.log(item)

        item.name = tiposPaesh3El[i].innerText
        item.price = tiposPaesPriceEl[i].innerText

        tiposPaes.push(item)

    }

    console.log(tiposPaes)

    //tiposIngredientes
    const tiposIngredientesh3El = tiposIngredientesEl.querySelectorAll("h3")
    const tiposIngredientesPriceEl = tiposIngredientesEl.querySelectorAll("div")
    for(let i = 0; i < tiposIngredientesh3El.length; i++) {
        
        let item: tiposIngredientesItem = {
            name: "",
            price: ""
        }
        item.name = tiposIngredientesh3El[i].innerText
        item.price = tiposIngredientesPriceEl[i].innerText

        tiposIngredientes.push(item)

    }
    console.log(tiposIngredientes)


    
// Fazendo a bandeja pelo typescript


// types

type hamburguer = {
    name: string;
    price: string;
}


// Carregar os hamburgueres selecionados no resumo

const bandejaEl = page.querySelector("aside ul") as HTMLUListElement
const bandejaTitulo = page.querySelector("header small") as HTMLElement
let hamburgueres: hamburguer[] = []

const limpaBandeja = () => {
    bandejaEl.innerHTML = ""
}


const atualizaHamburgueres = () => {

    hamburgueres = []
    const hamburgueresEls = page.querySelectorAll("aside ul li")
    hamburgueresEls?.forEach( hamburguerEl => {

        const hamburguerElData = hamburguerEl.querySelectorAll("div")
        
        
        let hamburguer = {
            name: hamburguerElData[0].innerHTML,
            price: hamburguerElData[1].innerHTML
        }
        
        hamburgueres.push(hamburguer)

        // console.log("Hamburgueres: ", hamburgueres)
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