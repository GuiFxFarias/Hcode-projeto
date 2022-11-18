const page = document.querySelector("body[data-display='bandeja']");

if (page) {
  // Mock de listagem de ingredientes (deve ser puxado do firebase)

  // types
  type tiposPaesItem = {
    idP: number;
    nameP: string;
    priceP: string;
  };
  type tiposIngredientesItem = {
    idI: number;
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
  const bandeja = document.querySelector(".bandeja-itens") as HTMLElement;

  let selectedServices: number[] = [];
  let selectedPaes: number[] = [];

  // Criando o botao salva hambuguer

  const saveBurger = document.querySelector("#save-burger");

  saveBurger?.addEventListener("click", (e) => {
    e.preventDefault;

    const itensBandeja = document.querySelector(
      ".bandeja-itens ul"
    ) as HTMLUListElement;

    itensBandeja.innerHTML = "";

    // Pães

    selectedPaes.forEach((id) => {
      const selectedIngPaes = paesTipo.find((item) => {
        return item.idP === id;
      });
    });

    console.log(selectedPaes);
    selectedPaes = [];

    // Ingredientes

    selectedServices.forEach((id) => {
      console.log(selectedServices);

      const selectedIngredientes = divIngredientes.find((item) => {
        return item.idI === id;
      });
    });

    paesTipo.forEach((item, index) => {
      console.log(item);
    });
  });

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
      idP: 1,
      nameP: "Pão Tradicional",
      priceP: "2,00",
    },
    {
      idP: 2,
      nameP: "Pão Australiano",
      priceP: "3,00",
    },
    {
      idP: 3,
      nameP: "Pão de Batata",
      priceP: "2,50",
    },
  ];

  // console.log(paesTipo);

  paesTipo.forEach((item) => {
    const ul = document.createElement("ul");

    ul.innerHTML = `
       <label>
            <input type="radio" name="item" value="${item.idP}" />
            <span></span>
            <h3>${item.nameP}</h3>
            <div>R$ ${item.priceP}</div>
        </label>
        `;
    paesTittle.appendChild(ul);

    const input = ul.querySelector("input");

    input?.addEventListener("click", (e) => {
      const element = e.target as HTMLInputElement;

      if (element.value) {
        selectedPaes.push(Number(element.value));
      } else {
        element.value;
        selectedPaes = selectedPaes.filter((id) => {
          return id !== Number(element.value);
        });
      }
    });
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
      idI: 1,
      nameI: "Carne Bovina 125g",
      priceI: "3,00",
    },
    {
      idI: 2,
      nameI: "Carne de Frango 125g",
      priceI: "2,50",
    },
    {
      idI: 3,
      nameI: "Carne de Peixe 125g",
      priceI: "2,00",
    },
  ];

  divIngredientes.forEach((item) => {
    const ul = document.createElement("ul");

    ul.innerHTML = `
        <label>
            <input type="checkbox" name="item" value="${item.idI}" />
            <span></span>
            <h3>${item.nameI}</h3>
            <div>R$ ${item.priceI}</div>
        </label>
        `;
    classIngredientes.appendChild(ul);

    const input = ul.querySelector("input") as HTMLInputElement;

    input.addEventListener("change", (e) => {
      const element = e.target as HTMLInputElement;

      if (element.checked) {
        selectedServices.push(Number(element.value));
      } else {
        element.value;
        selectedServices = selectedServices.filter((id) => {
          return id !== Number(element.value);
        });
      }
    });
  });

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
