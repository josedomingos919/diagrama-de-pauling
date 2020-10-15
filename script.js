const camada = {
  s: 2,
  p: 6,
  d: 10,
  f: 14,
};

function calcular() {
  let Total = +txt.value;
  let result = [];
  let passed = [];
  let terminou = false;

  if (Total <= 0 || txtSimbolu.value.trim() == "") return;
  sp1.innerText = txtSimbolu.value + " = ";

  let m = [
    ["1s"],
    ["2s", "2p"],
    ["3s", "3p", "3d"],
    ["4s", "4p", "4d", "4f"],
    ["5s", "5p", "5d", "5f"],
    ["6s", "6p", "6d"],
    ["7s", "7p"],
  ];

  terminou = false;

  for (let l = 0; l < m.length; l++) {
    for (let c = 0; c < m[l].length; c++) {
      let row = l,
        col = c;

      let num = "";
      while ((row + 1 <= 7 && col - 1 >= 0) || (row + 1 <= 7 && col == 0)) {
        let item = m[row][col];
        if (terminou) break;

        if (!passed.includes(item)) {
          let valorCamada = camada[item[1]];
          let totalCalc = Total - valorCamada;

          if (totalCalc >= 0) {
            result.push({ text: item, valor: valorCamada });
            Total -= valorCamada;
            if (Total == 0) {
              terminou = true;
              break;
            }
          } else {
            result.push({ text: item, valor: Total });
            terminou = true;
            break;
          }

          num += item + " ";
        }

        row++;
        col--;
        passed.push(item);
      }

    }
  }

  [...document.querySelector("table").querySelectorAll("td")]
    .filter((e) => result.map((e) => e.text).includes(e.innerText))
    .forEach(
      (e) => ((e.style.backgroundColor = "red"), (e.style.color = "white"))
    );

  sp2.innerHTML = result.map((e) => e.text + `<sup>${e.valor}</sup>`).join();
}
