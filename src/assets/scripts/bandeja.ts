const page = document.querySelector("body[data-display='bandeja']");

if (page) {
  // Mock de listagem de ingredientes (deve ser puxado do firebase)

  // types
  type tiposPaesItem = {
    nameP: string;
    priceP: string;
  };
  type tiposIngredientesItem = {
    nameI: string;
    priceI: string;
  };

  const opcoesEl = page.querySelectorAll(".category");
  const tiposPaesEl = opcoesEl[0] as HTMLElement;
  const tiposIngredientesEl = opcoesEl[1] as HTMLElement;

  const tiposPaes: tiposPaesItem[] = [];
  const tiposIngredientes: tiposIngredientesItem[] = [];

  // tiposPaes
  const tiposPaesh3El = tiposPaesEl.querySelectorAll("h3");
  const tiposPaesPriceEl = tiposPaesEl.querySelectorAll("div");
  const paesTittle = document.querySelector(".paes") as HTMLDivElement;

  /*
  for (let i = 0; i < tiposPaesh3El.length; i++) {
    let item: tiposPaesItem = {
      name: "",
      price: "",
    };

    item.name = tiposPaesh3El[i].innerText;
    item.price = tiposPaesPriceEl[i].innerText;

    tiposPaes.push(item);
  }
  */

  // Criando os li pelo 'banco de dados' criado
  const paesTipo: tiposPaesItem[] = [
    {
      nameP: "Pão Tradicional",
      priceP: "2,00",
    },
    {
      nameP: "Pão Australiano",
      priceP: "3,00",
    },
    {
      nameP: "Pão de Batata",
      priceP: "2,50",
    },
  ];

  // console.log(paesTipo);

  paesTipo.forEach((item) => {
    const ul = document.createElement("ul");

    ul.innerHTML = `
       <label>
            <input type="radio" name="item" checked />
            <span></span>
            <h3>${item.nameP}</h3>
            <div>R$ ${item.priceP}</div>
        </label>
        `;
    paesTittle.appendChild(ul);
  });

  //tiposIngredientes
  const tiposIngredientesh3El = tiposIngredientesEl.querySelectorAll("h3");
  const tiposIngredientesPriceEl = tiposIngredientesEl.querySelectorAll("div");
  const classIngredientes = document.querySelector(
    ".ingredientes"
  ) as HTMLDivElement;

  // Adicionando ingredientes pelo 'banco de dados'

  const divIngredientes: tiposIngredientesItem[] = [
    {
      nameI: "Carne Bovina 125g",
      priceI: "3,00",
    },
    {
      nameI: "Carne de Frango 125g",
      priceI: "2,50",
    },
    {
      nameI: "Carne de Peixe 125g",
      priceI: "2,00",
    },
  ];

  divIngredientes.forEach((item) => {
    const ul = document.createElement("ul");

    ul.innerHTML = `
        <label>
            <input type="checkbox" name="item" />
            <span></span>
            <h3>${item.nameI}</h3>
            <div>R$ ${item.priceI}</div>
        </label>
        `;
    classIngredientes.appendChild(ul);
  });

  const itensBandeja = document.querySelector(
    ".bandeja-itens ul"
  ) as HTMLUListElement;
  const bandeja = document.querySelector(".bandeja-itens") as HTMLElement;

  bandeja.innerHTML = "";

  const selectedServices = [];

  selectedServices.forEach((item) =>{



    /*

    const ul = document.createElement('ul')

    ul.innerHTML = `
    <li>
       <div>Hamburguer 1</div>
        <div>R$ 15,00</div>
        <button type="button" aria-label="Remover Hamburguer 1">
          <svg width="24" height="24" viewBox="0 0 fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 19C6 20.1 6.9 21 8 21H16C1720.1 18 19V7H6V19ZM19 4H15.5L14.5 34H5V6H19V4Z" fill="black"/>
          </svg>
        </button>
    </li> 
    `
    bandeja.appendChild(ul)
    */

  })

  /*
  for (let i = 0; i < tiposIngredientesh3El.length; i++) {
    let item: tiposIngredientesItem = {
      name: "",
      price: "",
    };

    item.name = tiposIngredientesh3El[i].innerText;
    item.price = tiposIngredientesPriceEl[i].innerText;

    tiposIngredientes.push(item);
  }
*/

  // types

  type hamburguer = {
    name: string;
    price: string;
  };

  // Carregar os hamburgueres selecionados no resumo

  const bandejaEl = page.querySelector("aside ul") as HTMLUListElement;
  const bandejaTitulo = page.querySelector("header small") as HTMLElement;
  let hamburgueres: hamburguer[] = [];

  const limpaBandeja = () => {
    bandejaEl.innerHTML = "";
  };

  const atualizaHamburgueres = () => {
    hamburgueres = [];
    const hamburgueresEls = page.querySelectorAll("aside ul li");
    hamburgueresEls?.forEach((hamburguerEl) => {
      const hamburguerElData = hamburguerEl.querySelectorAll("div");

      let hamburguer = {
        name: hamburguerElData[0].innerHTML,
        price: hamburguerElData[1].innerHTML,
      };

      hamburgueres.push(hamburguer);

      // console.log("Hamburgueres: ", hamburgueres)
    });
  };

  const atualizaBandeja = () => {
    switch (hamburgueres.length) {
      case 0:
        bandejaTitulo.innerText = "";
        break;
      case 1:
        bandejaTitulo.innerText = `${hamburgueres.length} Hamburguer`;
        break;
      default:
        bandejaTitulo.innerText = `${hamburgueres.length} Hamburgueres`;
        break;
    }
  };

  const render = () => {
    limpaBandeja();
    atualizaHamburgueres();
    atualizaBandeja();
  };

  render();
}
