// Controle Financeiro com persistência e tema salvo

let lancamentos = [];

const extratoEl = document.getElementById('extrato');
const totalReceitasEl = document.getElementById('total-receitas');
const totalDespesasEl = document.getElementById('total-despesas');
const saldoEl = document.getElementById('saldo');
const graficoEl = document.getElementById('grafico');
const formLancamento = document.getElementById('formLancamento');
const modoEscuroCheckbox = document.getElementById('modoEscuro');

let grafico;

// Salvar dados no localStorage
function salvarNoStorage() {
  localStorage.setItem('lancamentos', JSON.stringify(lancamentos));
}

// Carregar dados do localStorage
function carregarDoStorage() {
  const dados = localStorage.getItem('lancamentos');
  if (dados) {
    lancamentos = JSON.parse(dados);
  }
}

// Atualiza o gráfico (doughnut)
function atualizarGrafico(receitas, despesas) {
  if (grafico) grafico.destroy();

  grafico = new Chart(graficoEl, {
    type: 'doughnut',
    data: {
      labels: ['Receitas', 'Despesas'],
      datasets: [{
        data: [receitas, despesas],
        backgroundColor: ['#4caf50', '#f44336']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: {
          callbacks: {
            label: ctx => {
              return ctx.label + ': R$ ' + ctx.parsed.toFixed(2);
            }
          }
        }
      }
    }
  });
}

// Atualizar UI (lista, totais, gráfico)
function atualizarUI() {
  extratoEl.innerHTML = '';

  let receitas = 0, despesas = 0;

  const fragment = document.createDocumentFragment();

  lancamentos.forEach((lanc, index) => {
    const li = document.createElement('li');
    li.textContent = `${lanc.descricao} - R$ ${lanc.valor.toFixed(2)}`;

    // Botão excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'Excluir';
    btnExcluir.setAttribute('aria-label', `Excluir lançamento ${lanc.descricao} no valor de R$${lanc.valor.toFixed(2)}`);
    btnExcluir.addEventListener('click', () => {
      excluirLancamento(index);
    });

    li.appendChild(btnExcluir);
    fragment.appendChild(li);

    if (lanc.tipo === 'receita') receitas += lanc.valor;
    else despesas += lanc.valor;
  });

  extratoEl.appendChild(fragment);

  totalReceitasEl.textContent = receitas.toFixed(2);
  totalDespesasEl.textContent = despesas.toFixed(2);
  saldoEl.textContent = (receitas - despesas).toFixed(2);

  atualizarGrafico(receitas, despesas);

  salvarNoStorage();
}

// Excluir lançamento pelo índice
function excluirLancamento(index) {
  lancamentos.splice(index, 1);
  atualizarUI();
}

// Adicionar lançamento com validação
function adicionarLancamento(event) {
  event.preventDefault();

  const descricao = document.getElementById('descricao').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);
  const tipo = document.getElementById('tipo').value;
  const categoria = 'outros';
  const data = new Date().toISOString().split('T')[0];

  if (!descricao) {
    alert('Por favor, preencha a descrição.');
    return;
  }

  if (isNaN(valor) || valor <= 0) {
    alert('Informe um valor válido maior que zero.');
    return;
  }

  lancamentos.push({ descricao, valor, tipo, categoria, data });
  atualizarUI();

  formLancamento.reset();
  document.getElementById('descricao').focus();
}

// Exportar dados para JSON
function exportarDados() {
  if (!lancamentos.length) {
    alert('Nenhum lançamento para exportar.');
    return;
  }

  const dados = JSON.stringify(lancamentos, null, 2);
  const blob = new Blob([dados], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'dados-financeiros.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Exportar dados para Excel
function exportarExcel() {
  if (!lancamentos.length) {
    alert('Nenhum lançamento para exportar.');
    return;
  }

  const wsData = [
    ['Descrição', 'Valor', 'Tipo', 'Categoria', 'Data'],
    ...lancamentos.map(l => [l.descricao, l.valor, l.tipo, l.categoria, l.data])
  ];

  const worksheet = XLSX.utils.aoa_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Lançamentos');
  XLSX.writeFile(workbook, 'controle-financeiro.xlsx');
}

// Alternar tema escuro e salvar preferência
function alternarTema() {
  const isEscuro = modoEscuroCheckbox.checked;
  document.documentElement.classList.toggle('modo-escuro', isEscuro);
  document.body.classList.toggle('modo-escuro', isEscuro);
  modoEscuroCheckbox.setAttribute('aria-checked', isEscuro);
  localStorage.setItem('temaEscuro', isEscuro);
}

// Carregar tema salvo no localStorage
function carregarTema() {
  const temaSalvo = localStorage.getItem('temaEscuro') === 'true';
  modoEscuroCheckbox.checked = temaSalvo;
  alternarTema();
}

// Inicialização do app
function init() {
  carregarDoStorage();
  atualizarUI();
  carregarTema();

  formLancamento.addEventListener('submit', adicionarLancamento);
  modoEscuroCheckbox.addEventListener('change', alternarTema);

  document.getElementById('btnExportJson').addEventListener('click', exportarDados);
  document.getElementById('btnExportExcel').addEventListener('click', exportarExcel);
}

window.addEventListener('DOMContentLoaded', init);
