import { format } from "date-fns";
import { criaItens } from "./function/criaItem";

const page = document.querySelector(".no-footer");

if (page) {
  // listagem de const dos detalhes do pedidos

  const detailsOrder = page.querySelector(".content ul") as HTMLUListElement;
  let todayDate = new Date();
  let today = format(todayDate, "dd/MM/yyyy");
  const getHamburguer = localStorage.getItem("Hamburguer") as string;
  const ticket = page.querySelector("#list-orders li") as HTMLLIElement;
  const details = page.querySelector(
    '[aria-label="Detalhes"]'
  ) as HTMLButtonElement;
  const ulPay = page.querySelector(".detailsPay") as HTMLUListElement;
  const ulList = page.querySelector(".lista") as HTMLUListElement;

  // Criação do código
  const getHamObje = JSON.parse(getHamburguer);

  if (getHamburguer) {
    

    let c = 0;
    let priceEl = 0;
    let priceAll = [] as number[];

    // Pegando cada valor da array de hamburguers
    getHamObje.forEach((item: number) => {
      if (item) {
        priceEl = getHamObje[c].price;
        c++;
        // console.log(item)
      }
      priceAll.push(priceEl);
    });
    // console.log(getHamObje)
    

    // Fazendo a soma usando o valor total dos ingredientes
    let soma = 0;
    priceAll.forEach((item, index) => {
      soma += priceAll[index];
      // console.log(soma);
    });

    // Tirando o item a mais que existe dentro da listagem de itens

    detailsOrder.innerHTML = `
        <li>
            <span>Data: </span>
            <span>${today}</span>
        </li>
        <li>
            <span>Valor:</span>
            <span>R$ ${soma}</span>
        </li>
        <li>
            <span>Itens:</span>
            <span>${getHamObje.length}</span>
        </li>
        <li>
            <span>N°:</span>
            <span>123456789</span>
        </li>`;

    // Colocar os detalhes do pedido abaixo, ou seja, o hamburguer com seus ingredientes

    let descriptionEl = [] as string[];
    let i = 0;



    getHamObje.forEach((item: string) => {
      descriptionEl.push(getHamObje[i].description);
      i++;
    });

   // console.log(descriptionEl); // Console para verificar se adicionou os descriptions na array de descrição

    let sD = 0;

    //Pensar numa lógica de adicionar cada 'li' de acordo com quantos elementoes existem dentro da array 'descriptionEl'

    if (descriptionEl) {
      ulList.innerHTML;
    }

    // ulList.innerHTML = `
    //     <li>
    //         <span>${descriptionEl[sD]}</span>
    //         ${sD++}
    //         <select></select>
    //     </li>
    //     <li>
    //         <span>${descriptionEl[sD]}</span>
    //         ${sD++}
    //         <select></select>
    //     </li>
    //     `;

      
        const liInnerHtml = `
        <span>hamburguer_name</span>
        <select>hamburguer_ing</select>`

        const props = {
          hamburguer_name: 'description',
          hamburguer_ing: 'ingredients'
        }

      console.log(getHamObje)

       criaItens(getHamObje, ulList, 'li', liInnerHtml, props)

    details?.addEventListener("click", (e) => {
      e.preventDefault();

      ulPay.classList.toggle("remove");
      ulList.classList.toggle("add");
    });
  }
}
