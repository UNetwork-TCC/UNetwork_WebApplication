function formataData(data) {
    // Obtém o dia, o mês e o ano da data
    let dia = data.getDate();
    let mes = data.getMonth() + 1; // O mês começa em zero, então é preciso somar 1
    let ano = data.getFullYear().toString();
  
    // Adiciona um zero à esquerda se o dia ou o mês forem menores que 10
    if (dia < 10) {
      dia = "0" + dia;
    }
    if (mes < 10) {
      mes = "0" + mes;
    }
  
    // Retorna a string no formato "DD/MM/AA"
    return dia + "/" + mes + "/" + ano.slice(-2); // O slice(-2) pega os dois últimos dígitos do ano
  }
  
  // Cria uma data atual
  let dataAtual = new Date();
  
  // Formata a data usando a função
  let dataFormatada = formataData(dataAtual);
  
  // Exibe a data formatada
  console.log(dataFormatada); 