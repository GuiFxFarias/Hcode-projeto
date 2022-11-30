import { Hamburguer } from "./types/Hamburguer";
import { Ingredient } from "./types/Ingredient";
import { formatCurrency } from "./function/formatCurrency"
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { criaItens } from "./function/criaItem";
import { stringToJson } from "./function/strigToJson";


const page = document.querySelector("body[data-display='bandeja']")

if(page) {
    
const bandejaEl = page.querySelector("aside ul") as HTMLUListElement
const bandejaTitulo = page.querySelector("header small") as HTMLElement
const precoTotalEl = page.querySelector("footer .price") as HTMLDivElement
let hamburguerPrice = 0
let currentHamburguer = {} as Hamburguer
let currentHamburguers = [] as Hamburguer[]


let ingredientEls = page.querySelectorAll(".category label")
let selectedIngredients = [] as Ingredient[]

let pricesArray = [] as number[]



// -------------------------------------------------------------------------------

    // firebase / puxando listagem de ingredientes:

    const database = getFirestore();
    let tiposPaes: Ingredient[] = []
    let tiposHamburgueres: Ingredient[] = []
    let tiposExtras: Ingredient[] = []

    onSnapshot(collection(database, "Paes"), (collection) => {
        tiposPaes = []
 
        collection.forEach( doc => {
            // configurar um novo item "type" em cada documento da collection,
            // para substituir o código abaixo
            const tipoPao = doc.data() as Ingredient
            tipoPao.type = "pao"
            tiposPaes.push(tipoPao)

            // Após criar o item nos documentos na firestore apagar o código acima e deixar assim:
            // tiposPaes.push(doc.data() as Ingredient)

        })
        renderIngredientes()
    })      
    onSnapshot(collection(database, "Hamburguer"), (collection) => {
        tiposHamburgueres = []
        
        collection.forEach( doc => {
            // configurar um novo item "type" em cada documento da collection,
            // para substituir o código abaixo
            const tipoHamburguer = doc.data() as Ingredient
            tipoHamburguer.type = "hamburguer"
            tiposHamburgueres.push(tipoHamburguer)

            // Após criar o item nos documentos na firestore apagar o código acima e deixar assim:
            // tiposHamburgueres.push(doc.data() as Ingredient)
        })
        renderIngredientes()
    })
    onSnapshot(collection(database, "Ingredientes"), (collection) => {
        tiposExtras = []

        collection.forEach( doc => {
            // configurar um novo item "type" em cada documento da collection,
            // para substituir o código abaixo
            const tipoExtra = doc.data() as Ingredient
            tipoExtra.type = "extra"
            tiposExtras.push(tipoExtra)

            // Após criar o item nos documentos na firestore apagar o código acima e deixar assim:
            // tiposExtras.push(doc.data() as Ingredient)
        })
        renderIngredientes()
    })

    // render ingredientes config:
    const ingredientesCheckboxInnerHTML = ` <label>
                                        <input type="checkbox" name="extra" />
                                        <span></span>
                                        <h3>ingredient_name</h3>
                                        <div>ingredient_price</div>
                                    </label>`

    const ingredientesRadioInnerHTML = ` <label>
                                        <input type="radio" name="ingredient_type" />
                                        <span></span>
                                        <h3>ingredient_name</h3>
                                        <div>ingredient_price</div>
                                    </label>`
    
    const ingredientesProps = {
        ingredient_name: "name",
        ingredient_price: "price",
        ingredient_type: "type"
    }

    const tiposPaesEl = page.querySelector(".category.pao ul") as HTMLElement
    const tiposHamburgueresEl = page.querySelector(".category.hamburguer ul") as HTMLElement
    const tiposExtrasEl = page.querySelector(".category.ingredientes ul") as HTMLElement

    // render Ingredientes:
    const renderIngredientes = () => {
        criaItens(tiposPaes, tiposPaesEl, "li", ingredientesRadioInnerHTML, ingredientesProps)
        criaItens(tiposHamburgueres, tiposHamburgueresEl, "li", ingredientesRadioInnerHTML, ingredientesProps)
        criaItens(tiposExtras, tiposExtrasEl, "li", ingredientesCheckboxInnerHTML, ingredientesProps)

        ingredientEls = page.querySelectorAll(".category label")
        ingredientEls.forEach( ingredientEl => {
            ingredientEl.addEventListener("change", () => {
                console.log("oi")
                onHamburgerChange()
            })
        })

    }


// ----------------------------------------------------------------------------

    const limpaBandeja = () => {
        bandejaEl.innerHTML = ""
    }




// adicionar hamburguer

    // Atualizar Ingredientes selecionados
    const atualizaIngredientes = () => {
    // criar consts de Ingredientes selecionados
    
    pricesArray = []

    // limpa ingredientes
    selectedIngredients = []
  
    ingredientEls.forEach( ingredient => {

        if(ingredient.querySelector("input:checked")) {

            const ingredientName = ingredient.querySelector("h3")?.innerHTML as string
            const priceString = ingredient.querySelector("div")?.innerHTML as string
            console.log("priceString: ", priceString)
            const ingredientPrice = parseFloat(priceString.split("&nbsp;")[1].replace(",", "."))
            

            if(ingredientName != null && !isNaN(ingredientPrice)) {
                
                const selectedIngredient: Ingredient = {
                    name:  ingredientName,
                    price:  ingredientPrice
                }

                selectedIngredients.push(selectedIngredient)
                pricesArray.push(ingredientPrice)


            } else {
                console.log("Erro: esse ingrediente não possuía descrição ou preço válido")
            }



        }


    })


    atualizaHamburguerEPreco()



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
        if(hamburguer.description=="Novo Hamburguer") {

        li.innerHTML = `<div style="color: white">${hamburguer.description}</div>

        <div style="color: white">${formatCurrency(hamburguer.price)}</div>
        <button type="button" aria-label="Remover Hamburguer 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
            </svg>
        </button>`
        li.style.backgroundColor = "gray"
        li.style.outlineStyle = "solid"
        li.style.outlineWidth = "3px"
        li.style.outlineColor = "gray"

        // li.classList.add("highlight-gray") --- configurar classe no sass
        hamburguersEl.appendChild(li)


        } else {

            li.innerHTML = `<div>${hamburguer.description}</div>

        <div>${formatCurrency(hamburguer.price)}</div>
        <button type="button" aria-label="Remover Hamburguer 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
            </svg>
        </button>`

        // li.classList.add("highlight-gray") --- configurar classe no sass
        hamburguersEl.appendChild(li)

        }
        
    })

}


// adicionar Hamburguer

const adicionaHamburguer = () => {

    if(currentHamburguer.price>0) {
        const {price} = currentHamburguer
        const description = `Hamburguer ${currentHamburguers.length}`
        const currentIngredients = currentHamburguer.ingredients as Ingredient[]
    
        let createdHamburguer = { price, description, ingredients: [] as Ingredient[]}
        createdHamburguer.ingredients = [...currentIngredients]
    
        // lógica de adição de novos componentes na pilha / bandeja
        currentHamburguers.pop()
        currentHamburguers.push(createdHamburguer)
        currentHamburguers.push(currentHamburguer)
        
        currentHamburguers[currentHamburguers.length-1].description = `Novo Hamburguer`
    

        limpaIngredientesSelecionados()

        onHamburgerChange()
    
        // criar novo hamburguer  na aside, e atualizar Hamburguers
        // criar novo elemento para novo hamburguer na aside
    } else {
        alert("Hamburguer vazio! Favor adicionar algum ingrediente ao seu hambúrguer.")
    }
}
















const atualizaBandeja = () => {

    switch (currentHamburguers.length) {
        case 0:
            bandejaTitulo.innerText = ""
            break;
        case 1:
            bandejaTitulo.innerText = `Montando Hamburguer...`
            break;
        case 2:
            bandejaTitulo.innerText = `1 Hamburguer`
            break;
        default:
            bandejaTitulo.innerText = `${currentHamburguers.length-1} Hamburgueres`
            break;
    }

    console.log("atualizou bandeja")

    atualizaPrecoTotalEl()

}



const limpaIngredientesSelecionados = () => {
    ingredientEls.forEach( ingredientEl => {
        const input = ingredientEl.querySelector("input") as HTMLInputElement
        input.checked = false
      })
}



const atualizaPrecoHamburguer = () => {
    hamburguerPrice = pricesArray.reduce((p, n) => {
        return p+n
    }, 0)
}

const atualizaPrecoTotalEl = () => {

        let precoHamburguers = 0
        currentHamburguers.forEach( hamburguer => {
            precoHamburguers += hamburguer.price
            console.log("atualizou preco total")
        })
    
        precoTotalEl.innerHTML = `<small>Subtotal</small>${formatCurrency(precoHamburguers)}`
    
}

// criando o click do pagar

const priceHambuguer = page.querySelector('[name="price_hambuguer"]') as HTMLInputElement
const payButton = page.querySelector('[aria-label="Pagar"]') as HTMLButtonElement

precoTotalEl?.addEventListener('load', (e) =>{
    

    priceHambuguer.value = 'balbalbal'
})



const atualizaHamburguerEPreco = () => {
    atualizaPrecoHamburguer()
    atualizaHamburguer()
}


const onHamburgerChange = () => {
    atualizaIngredientes()
    atualizaHamburguer()
    atualizaHamburguers()
    atualizaBandeja()
}





const render = () => {

    
    limpaIngredientesSelecionados()
    // limpa todos os input checked

    atualizaIngredientes()
    // atualiza selectedIngredients[] (que contém todos os ingredentes: Ingredient selecionados)
    // e também pricesArray[] que contém todos os precos de ingredientes selecionados,
    // e que será usado no cálculo do preco do hambúrguer pela funcao
    // atualizaHamburguerEPreco() / atualizaPrecoHamburguer, que já é chamada 
    // no fim do código de atualizaIngredient

    limpaBandeja()
    // garante que o aside inicie com apenas 1 elemento de hamburguer na bandeja

    // atualizaPrecoHamburguer()
    // Recalcula o preco do hamburguer, usando pricesArray


    atualizaHamburguer()
    // atualiza currentHamburguer, com base em hamburguerPrice, 
    // selectedIngredients,   e description recebe 'Novo Hamburguer'

    atualizaHamburguers()
    // atualiza currentHmburguers e os elementos de hamburguers no aside

    atualizaBandeja()
    // atualiza título e prço total da bandeja





    page.querySelector(`button[aria-label="Salvar Hamburguer"]`)?.addEventListener("click", () => {
        adicionaHamburguer()
    })
}

render()
    
}