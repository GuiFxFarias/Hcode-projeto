import { Hamburguer } from "./types/Hamburguer";
import { Ingredient } from "./types/Ingredient";
import { formatCurrency } from "./function/formatCurrency"

const page = document.querySelector("body[data-display='bandeja']")

if(page) {
    
const bandejaEl = page.querySelector("aside ul") as HTMLUListElement
const bandejaTitulo = page.querySelector("header small") as HTMLElement
const precoTotalEl = page.querySelector("footer .price") as HTMLDivElement
let hamburguerPrice = 0
let currentHamburguer = {} as Hamburguer
let currentHamburguers = [] as Hamburguer[]


const ingredientEls = page.querySelectorAll(".category label")
let selectedIngredients = [] as Ingredient[]



// -------------------------------------------------------------------------------

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

        tiposPaes.push(item)

    }

    const tiposIngredientesh3El = tiposIngredientesEl.querySelectorAll("h3")
    const tiposIngredientesPriceEl = tiposIngredientesEl.querySelectorAll("div")
    for(let i = 0; i < tiposIngredientesh3El.length; i++) {
        
        let item: Ingredient = {
            name: "",
            price: 0
        }
        item.name = tiposIngredientesh3El[i].innerText
        item.price = Number(tiposIngredientesPriceEl[i].innerText.split(" ")[1].replace(",", "."))

        tiposIngredientes.push(item)

    }



// ----------------------------------------------------------------------------

const limpaBandeja = () => {
    bandejaEl.innerHTML = ""
}


    // adicionar hamburguer

        // Atualizar Ingredientes selecionados
const atualizaIngredientes = () => {
    // criar consts de Ingredientes selecionados, ids dos ingredientes selecionados
  
    
    let pricesArray = [] as number[]

    // limpa ingredientes
    selectedIngredients = []
  
    ingredientEls.forEach( ingredient => {

        if(ingredient.querySelector("input:checked")) {

            const ingredientName = ingredient.querySelector("h3")?.innerHTML as string
            const priceString = ingredient.querySelector("div")?.innerHTML as string
            const ingredientPrice = parseFloat(priceString.split(" ")[1].replace(",", "."))
            

            if(ingredientName != null && !isNaN(ingredientPrice)) {
                
                const selectedIngredient: Ingredient = {
                    name:  ingredientName,
                    price:  ingredientPrice
                }

                selectedIngredients.push(selectedIngredient)
                pricesArray.push(ingredientPrice)


            } else {
                console.log("Erro: esse iongrediente não possuía descrição ou preço válido ")
            }



        }


    })


    hamburguerPrice = pricesArray.reduce((p, n) => {
        return p+n
    }, 0)

    atualizaHamburguer()

    
}



// Atualiza Hamburguer

const atualizaHamburguer = () => {
    currentHamburguer = {
        description: "Novo Hamburguer",
        price: hamburguerPrice,
        ingredients: selectedIngredients
    }
}






const atualizaHamburguers = () => {

    if(currentHamburguers.length==0) {
        currentHamburguers.push(currentHamburguer)
    } else {
        currentHamburguers[currentHamburguers.length-1] = currentHamburguer
    }

    const hamburguersEl = page.querySelector("aside ul") as HTMLUListElement
    hamburguersEl.innerHTML = "" 


    currentHamburguers.forEach( hamburguer => {
        const li = document.createElement("li")
        li.innerHTML = `<div>${hamburguer.description}</div>

        <div>${formatCurrency(hamburguer.price)}</div>
        <button type="button" aria-label="Remover Hamburguer 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
            </svg>
        </button>`
        hamburguersEl.appendChild(li)
    })

}


/////////////////////////   TRABALHANDO AQUI !!!!!!!!!!!!!!!!!!!!!!!!!


// adicionar Hamburguer

const adicionaHamburguer = () => {

    const {price, description, ingredients} = currentHamburguer

    const createdHamburguer: Hamburguer = {
        description: `Hamburguer ${currentHamburguers.length}`,
        price,
        ingredients
    }

    currentHamburguers.unshift(createdHamburguer)
    
    console.log("currentHamburguer: ", currentHamburguer)
    console.log("currentHamburguers: ", currentHamburguers)
    
    currentHamburguers[currentHamburguers.length-1].description = `Novo Hamburguer`
    // currentHamburguers.push(currentHamburguer)

    console.log("currentHamburguer: ", currentHamburguer)
    console.log("currentHamburguers: ", currentHamburguers)

    // criar novo hamburguer  na aside, e atualizar Hamburguers
    // criar novo elemento para novo hamburguer na aside
}







const atualizaBandeja = () => {

    switch (currentHamburguers.length) {
        case 0:
            bandejaTitulo.innerText = ""
            break;
        case 1:
            bandejaTitulo.innerText = `${currentHamburguers.length} Hamburguer`
            break;
        default:
            bandejaTitulo.innerText = `${currentHamburguers.length} Hamburgueres`
            break;
    }

    // Atualiza preco total
    let precoHamburguers = 0
    currentHamburguers.forEach( hamburguer => {
        precoHamburguers += hamburguer.price
    })

    precoTotalEl.innerHTML = `<small>Subtotal</small>${formatCurrency(precoHamburguers)}`


}


const render = () => {

    atualizaIngredientes()
    limpaBandeja()
    atualizaHamburguer()
    atualizaHamburguers()
    atualizaBandeja()


    ingredientEls.forEach( ingredientEl => {
        ingredientEl.addEventListener("change", () => {
            atualizaIngredientes()
            atualizaHamburguer()
            atualizaHamburguers()
            atualizaBandeja()
        })
    })

    page.querySelector(`button[aria-label="Salvar Hamburguer"]`)?.addEventListener("click", () => {
        adicionaHamburguer()
    })
}

render()
      

    
}