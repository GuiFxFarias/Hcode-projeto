import IMask from "imask";

const page = document.querySelector("body[data-display='payment']");

if (page) {
  const numCartao = page.querySelector("#cartao") as HTMLInputElement;
  const validade = page.querySelector("#validade") as HTMLInputElement;
  const codCvv = page.querySelector("#cvv") as HTMLInputElement;
  const nome = page.querySelector("#nome") as HTMLInputElement;

  const year = new Date().getFullYear();

  IMask(numCartao, {
    mask: "0000 0000 0000 0000",
  });

  IMask(validade, {
    mask: "MM/YY",
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: String(year).substring(2, 4),
        to: String(year + 10).substring(2, 4),
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
    },
  });

  IMask(codCvv, {
    mask: "000",
  });

  // Variaveis sem ser pela mascara

  const getHamburguer = localStorage.getItem("Hamburguer");
  const priceCard = page.querySelector('[name="installments"]') as HTMLSelectElement;

  // Criação do código

  if (getHamburguer) {
    const getHamObje = JSON.parse(getHamburguer);

    let c = 0;
    let priceEl = 0;
    let priceAll = [] as number [];

    // Pegando cada valor da array de hamburguers
    getHamObje.forEach((item: number) => {
      if (item) {
        priceEl = getHamObje[c].price;
        c++;
      }
      priceAll.push(priceEl);
    });


    // Fazendo a soma usando o valor total dos ingredientes
    let soma = 0;    
    priceAll.forEach((item, index) => {
      soma += priceAll[index];
      console.log(soma)
    });

    priceCard.innerHTML = ''

    priceCard.innerHTML = `<option value="1">
    1 parcela de R$ ${soma} (R$ ${soma})
    </option>
    <option value="2">
    2 parcelas de R$ ${soma/2} (R$ ${soma/2})
    </option>`
  }
}
