# Controle Financeiro Simples

Projeto frontend simples para controle financeiro pessoal, permitindo adicionar receitas e despesas, visualizar um extrato, gráficos, alternar entre modo claro e escuro e exportar dados para JSON e Excel.

---

## Funcionalidades

- Adicionar lançamentos (descrição, valor, tipo receita/despesa)
- Lista de extrato dinâmica com exclusão de lançamentos
- Resumo financeiro (total receitas, despesas e saldo)
- Gráfico de pizza interativo com Chart.js mostrando receitas e despesas
- Modo claro e modo escuro com preferência salva no navegador
- Persistência de dados no `localStorage` para manter dados ao recarregar
- Exportação dos dados em JSON e Excel (.xlsx)
- Acessibilidade melhorada (labels escondidos, ARIA, navegação teclado)
- Layout responsivo para dispositivos móveis

---

## Tecnologias utilizadas

- HTML5 semântico e acessível
- CSS3 com variáveis, responsividade e transições suaves
- JavaScript ES6+ modularizado e organizado
- [Chart.js](https://www.chartjs.org/) para gráficos
- [SheetJS (xlsx)](https://sheetjs.com/) para exportação Excel

---

## Como usar

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` no seu navegador favorito (Google Chrome, Firefox, Edge, etc).
3. Use o formulário para adicionar receitas e despesas.
4. Veja o extrato, o resumo e o gráfico atualizarem automaticamente.
5. Alterne o modo escuro usando o checkbox para melhor conforto visual.
6. Exporte seus dados para JSON ou Excel para backup ou análise externa.

---

## Melhoria e contribuições

Este projeto é aberto para contribuições! Fique à vontade para abrir issues ou pull requests com melhorias, correções ou novas funcionalidades.
