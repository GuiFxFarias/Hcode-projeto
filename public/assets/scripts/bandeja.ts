import { Hamburguer } from "./types/Hamburguer";
import { Ingredient } from "./types/Ingredient";
import { formatCurrency } from "./function/formatCurrency";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";

const page = document.querySelector("body[data-display='bandeja']");

if (page) {
  const database = getFirestore();
  const bandejaEl = page.querySelector("aside ul") as HTMLUListElement;
  const bandejaTitulo = page.querySelector("header small") as HTMLElement;
  const precoTotalEl = page.querySelector("footer .price") as HTMLDivElement;
  let hamburguerPrice = 0;
  let currentHamburguer = {} as Hamburguer;
  let currentHamburguers = [] as Hamburguer[];

  const ingredientEls = page.querySelectorAll(".category label");
  let selectedIngredients = [] as Ingredient[];

  let pricesArray = [] as number[];

  // -------------------------------------------------------------------------------

  // Mock de listagem de ingredientes (deve ser puxado do firebase)

  const opcoesEl = page.querySelectorAll(".category");
  const tiposPaesEl = opcoesEl[0] as HTMLElement;
  const tiposIngredientesEl = opcoesEl[1] as HTMLElement;

  // Lista de arrays onde serao salvas as informações do firebase
  let ingredientList: Ingredient[] = [];
  let paoList: Ingredient[] = [];
  let hamburguerList: Ingredient[] = [];

  const tiposPaes: Ingredient[] = [];
  const tiposIngredientes: Ingredient[] = [];

  // tiposPaes
  const tiposPaesh3El = tiposPaesEl.querySelectorAll("h3");
  const tiposPaesPriceEl = tiposPaesEl.querySelectorAll("div");
  for (let i = 0; i < tiposPaesh3El.length; i++) {
    let item: Ingredient = {
      name: "",
      price: 0,
    };
    item.name = tiposPaesh3El[i].innerText;
    item.price = parseFloat(
      tiposPaesPriceEl[i].innerText.split(" ")[1].replace(",", ".")
    );

    tiposPaes.push(item);
  }

  // Criando as constantes que serao criadas pelo firebase
  const opcoesPao = document.querySelector(".pao") as HTMLDivElement;
  const opcoesHamburguer = document.querySelector(
    ".hamburguer"
  ) as HTMLDivElement;
  const opcoesIngre = document.querySelector(".ingredientes") as HTMLDivElement;

  const renderOptions = () => {
    if (opcoesPao) {
      opcoesPao.innerHTML =
        "<h2>Escolha o pão <small>(escolha apenas um)</small></h2>";
    }
    if (opcoesHamburguer) {
      opcoesHamburguer.innerHTML =
        "<h2>Escolha sua carne <small>(escolha apenas um)</small></h2>";
    }
    if (opcoesIngre) {
      opcoesIngre.innerHTML =
        "<h2>Turbine seu hamburguer! Escolha os extras:</h2>";
    }

    ingredientList.forEach((item) => {
      const ul = document.createElement("ul");

      ul.innerHTML = `
                <li>
                    <label>
                      <input type="radio" name="carne" checked />
                      <span></span>
                      <h3>${item.name}</h3>
                      <div>R$ ${item.price}</div>
                    </label>
                  </li>
            `;
      const input = ul.querySelector("input") as HTMLInputElement;

      opcoesPao.appendChild(ul);
    });

    paoList.forEach((item) => {
      const ul = document.createElement("ul");

      ul.innerHTML = `
                <li>
                    <label>
                      <input type="radio" name="carne" checked />
                      <span></span>
                      <h3>${item.name}</h3>
                      <div>R$ ${item.price}</div>
                    </label>
                  </li>
            `;
      const input = ul.querySelector("input") as HTMLInputElement;

      opcoesHamburguer.appendChild(ul);
    });

    hamburguerList.forEach((item) => {
      const ul = document.createElement("ul");

      ul.innerHTML = `
                <li>
                    <label>
                      <input type="radio" name="carne" checked />
                      <span></span>
                      <h3>${item.name}</h3>
                      <div>R$ ${item.price}</div>
                    </label>
                  </li>
            `;
      const input = ul.querySelector("input") as HTMLInputElement;

      opcoesIngre.appendChild(ul);
    });
  };

  const renderColections = () => {
    onSnapshot(collection(database, "Paes"), (collection) => {
      ingredientList = [];

      collection.forEach((doc) => {
        ingredientList.push(doc.data() as Ingredient);
      });

      renderOptions();
      console.log(ingredientList);
    });

    onSnapshot(collection(database, "Ingredientes"), (collection) => {
      paoList = [];

      collection.forEach((doc) => {
        paoList.push(doc.data() as Ingredient);
      });

      renderOptions();
    });

    onSnapshot(collection(database, "Hamburguer"), (collection) => {
      hamburguerList = [];

      collection.forEach((doc) => {
        hamburguerList.push(doc.data() as Ingredient);
      });

      renderOptions();
    });
  };

  const tiposIngredientesh3El = tiposIngredientesEl.querySelectorAll("h3");
  const tiposIngredientesPriceEl = tiposIngredientesEl.querySelectorAll("div");
  for (let i = 0; i < tiposIngredientesh3El.length; i++) {
    let item: Ingredient = {
      name: "",
      price: 0,
    };
    item.name = tiposIngredientesh3El[i].innerText;
    item.price = Number(
      tiposIngredientesPriceEl[i].innerText.split(" ")[1].replace(",", ".")
    );

    tiposIngredientes.push(item);
  }

  // ----------------------------------------------------------------------------

  const limpaBandeja = () => {
    bandejaEl.innerHTML = "";
  };

  // adicionar hamburguer

  // Atualizar Ingredientes selecionados
  const atualizaIngredientes = () => {
    // criar consts de Ingredientes selecionados, ids dos ingredientes selecionados

    pricesArray = [];

    // limpa ingredientes
    selectedIngredients = [];

    // ----------------------------------------------------------------- COLOCAR O FIREBASE AQUI -----------------------------------------------------------------
    ingredientEls.forEach((ingredient) => {
      if (ingredient.querySelector("input:checked")) {
        const ingredientName = ingredient.querySelector("h3")
          ?.innerHTML as string;
        const priceString = ingredient.querySelector("div")
          ?.innerHTML as string;
        const ingredientPrice = parseFloat(
          priceString.split(" ")[1].replace(",", ".")
        );

        if (ingredientName != null && !isNaN(ingredientPrice)) {
          const selectedIngredient: Ingredient = {
            name: ingredientName,
            price: ingredientPrice,
          };

          selectedIngredients.push(selectedIngredient);
          pricesArray.push(ingredientPrice);
        } else {
          console.log(
            "Erro: esse iongrediente não possuía descrição ou preço válido "
          );
        }
      }
    });

    atualizaHamburguerEPreco();
  };

  // Atualiza Hamburguer
  // ----------------------------------------------------------------- COLOCAR O FIREBASE AQUI -----------------------------------------------------------------
  const atualizaHamburguer = () => {
    currentHamburguer = {
      description: "Novo Hamburguer",
      price: hamburguerPrice,
      ingredients: selectedIngredients,
    };
  };

  const atualizaHamburguers = () => {
    if (currentHamburguers.length == 0) {
      currentHamburguers.push(currentHamburguer);
    } else {
      currentHamburguers[currentHamburguers.length - 1] = currentHamburguer;
    }

    const hamburguersEl = page.querySelector("aside ul") as HTMLUListElement;
    hamburguersEl.innerHTML = "";

    currentHamburguers.forEach((hamburguer) => {
      const li = document.createElement("li");
      if (hamburguer.description == "Novo Hamburguer") {
        li.innerHTML = `<div style="color: white">${
          hamburguer.description
        }</div>

        <div style="color: white">${formatCurrency(hamburguer.price)}</div>
        <button type="button" aria-label="Remover Hamburguer 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
            </svg>
        </button>`;
        li.style.backgroundColor = "gray";
        li.style.outlineStyle = "solid";
        li.style.outlineWidth = "3px";
        li.style.outlineColor = "gray";

        // li.classList.add("highlight-gray") --- configurar classe no sass
        hamburguersEl.appendChild(li);
      } else {
        li.innerHTML = `<div>${hamburguer.description}</div>

        <div>${formatCurrency(hamburguer.price)}</div>
        <button type="button" aria-label="Remover Hamburguer 1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
            </svg>
        </button>`;

        // li.classList.add("highlight-gray") --- configurar classe no sass
        hamburguersEl.appendChild(li);
      }
    });
  };

  // adicionar Hamburguer

  const adicionaHamburguer = () => {
    if (currentHamburguer.price > 0) {
      const { price } = currentHamburguer;
      const description = `Hamburguer ${currentHamburguers.length}`;
      const currentIngredients = currentHamburguer.ingredients as Ingredient[];

      let createdHamburguer = {
        price,
        description,
        ingredients: [] as Ingredient[],
      };
      createdHamburguer.ingredients = [...currentIngredients];

      // lógica de adição de novos componentes na pilha / bandeja
      currentHamburguers.pop();
      currentHamburguers.push(createdHamburguer);
      currentHamburguers.push(currentHamburguer);

      currentHamburguers[
        currentHamburguers.length - 1
      ].description = `Novo Hamburguer`;

      limpaIngredientesSelecionados();

      onHamburgerChange();

      // criar novo hamburguer  na aside, e atualizar Hamburguers
      // criar novo elemento para novo hamburguer na aside
    } else {
      alert(
        "Hamburguer vazio! Favor adicionar algum ingrediente ao seu hambúrguer."
      );
    }
  };

  const atualizaBandeja = () => {
    switch (currentHamburguers.length) {
      case 0:
        bandejaTitulo.innerText = "";
        break;
      case 1:
        bandejaTitulo.innerText = `Montando Hamburguer...`;
        break;
      case 2:
        bandejaTitulo.innerText = `1 Hamburguer`;
        break;
      default:
        bandejaTitulo.innerText = `${
          currentHamburguers.length - 1
        } Hamburgueres`;
        break;
    }

    atualizaPrecoTotalEl();
  };

  // ----------------------------------------------------------------- COLOCAR O FIREBASE AQUI -----------------------------------------------------------------
  const limpaIngredientesSelecionados = () => {
    ingredientEls.forEach((ingredientEl) => {
      const input = ingredientEl.querySelector("input") as HTMLInputElement;
      input.checked = false;
    });
  };

  const atualizaPrecoHamburguer = () => {
    hamburguerPrice = pricesArray.reduce((p, n) => {
      return p + n;
    }, 0);
  };

  const atualizaPrecoTotalEl = () => {
    let precoHamburguers = 0;
    currentHamburguers.forEach((hamburguer) => {
      precoHamburguers += hamburguer.price;
    });

    precoTotalEl.innerHTML = `<small>Subtotal</small>${formatCurrency(
      precoHamburguers
    )}`;
  };

  const atualizaHamburguerEPreco = () => {
    atualizaPrecoHamburguer();
    atualizaHamburguer();
  };

  const onHamburgerChange = () => {
    atualizaIngredientes();
    atualizaHamburguer();
    atualizaHamburguers();
    atualizaBandeja();
  };

  const render = () => {
    limpaIngredientesSelecionados();
    // limpa todos os input checked

    atualizaIngredientes();
    // atualiza selectedIngredients[] (que contém todos os ingredentes: Ingredient selecionados)
    // e também pricesArray[] que contém todos os precos de ingredientes selecionados,
    // e que será usado no cálculo do preco do hambúrguer pela funcao
    // atualizaHamburguerEPreco() / atualizaPrecoHamburguer, que já é chamada
    // no fim do código de atualizaIngredient

    limpaBandeja();
    // garante que o aside inicie com apenas 1 elemento de hamburguer na bandeja

    // atualizaPrecoHamburguer()
    // Recalcula o preco do hamburguer, usando pricesArray

    atualizaHamburguer();
    // atualiza currentHamburguer, com base em hamburguerPrice,
    // selectedIngredients,   e description recebe 'Novo Hamburguer'

    atualizaHamburguers();
    // atualiza currentHmburguers e os elementos de hamburguers no aside

    atualizaBandeja();
    // atualiza título e prço total da bandeja

    renderOptions();
    // atualiza as opções de ingredientes

    renderColections();
    // faz um 'OnSnapShot' nas coleções

    // ----------------------------------------------------------------- COLOCAR O FIREBASE AQUI -----------------------------------------------------------------
    ingredientEls.forEach((ingredientEl) => {
      ingredientEl.addEventListener("change", () => {
        onHamburgerChange();
      });
    });

    page
      .querySelector(`button[aria-label="Salvar Hamburguer"]`)
      ?.addEventListener("click", () => {
        adicionaHamburguer();
      });
  };

  render();
}
