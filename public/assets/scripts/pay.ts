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
}

