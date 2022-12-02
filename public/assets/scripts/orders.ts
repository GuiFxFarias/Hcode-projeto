import { format } from "date-fns";

const page = document.querySelector(".no-footer");

if (page) {
  // listagem de const dos detalhes do pedidos

  const detailsOrder = page.querySelector(".content ul") as HTMLUListElement;
  let todayDate = new Date();
  let today = format(todayDate, "dd/MM/yyyy");
  const getHamburguer = localStorage.getItem("Hamburguer");
  const ticket = page.querySelector("#list-orders li");
  const details = page.querySelector('[aria-label="Detalhes"]');

  // Criação do código

  if (getHamburguer) {
    const getHamObje = JSON.parse(getHamburguer);

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
    getHamObje.pop();

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

    details?.addEventListener("click", (e) => {
      e.preventDefault();
      
      // criar um Css para o botao de detalhes do pedido para que apareca os lanches e o que tem em cada lanche
    });
  }
}
