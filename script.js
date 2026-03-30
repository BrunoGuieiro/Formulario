const frases = [
  'Desenvolvedor Full Stack',
  'Web & Mobile Dev',
  'Estudante COTEMIG',
  'Aprendendo todo dia',
];

let indiceFrase  = 0;
let indiceLetra  = 0;
let apagando     = false;
let pausado      = false;

const campoDigitado = document.getElementById('texto-digitado');

function digitar() {
  if (pausado) return;

  const fraseAtual = frases[indiceFrase];

  if (!apagando) {
    campoDigitado.textContent = fraseAtual.slice(0, indiceLetra + 1);
    indiceLetra++;

    if (indiceLetra === fraseAtual.length) {
      pausado = true;
      setTimeout(() => {
        pausado  = false;
        apagando = true;
      }, 2000);
    }
  } else {
    campoDigitado.textContent = fraseAtual.slice(0, indiceLetra - 1);
    indiceLetra--;

    if (indiceLetra === 0) {
      apagando    = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
    }
  }

  setTimeout(digitar, apagando ? 50 : 95);
}

setTimeout(digitar, 1000);


const botaoMenu = document.getElementById('botao-menu');
const listaMenu = document.getElementById('menu-links');

botaoMenu.addEventListener('click', function () {
  botaoMenu.classList.toggle('aberto');
  listaMenu.classList.toggle('aberto');
});

document.querySelectorAll('.menu-item').forEach(function (item) {
  item.addEventListener('click', function () {
    botaoMenu.classList.remove('aberto');
    listaMenu.classList.remove('aberto');
  });
});


const todasSecoes = document.querySelectorAll('section[id]');
const todosItens  = document.querySelectorAll('.menu-item');

function atualizarMenuAtivo() {
  const scrollAtual = window.scrollY + 80;

  todasSecoes.forEach(function (secao) {
    const inicio  = secao.offsetTop;
    const fim     = inicio + secao.offsetHeight;
    const idSecao = secao.getAttribute('id');

    if (scrollAtual >= inicio && scrollAtual < fim) {
      todosItens.forEach(function (item) {
        item.classList.remove('ativo');
      });

      const itemAtivo = document.querySelector('.menu-item[href="#' + idSecao + '"]');
      if (itemAtivo) itemAtivo.classList.add('ativo');
    }
  });
}

window.addEventListener('scroll', atualizarMenuAtivo);


const elementosAnimados = document.querySelectorAll('.aparece');

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      const irmaos  = Array.from(entrada.target.parentElement.querySelectorAll('.aparece'));
      const posicao = irmaos.indexOf(entrada.target);

      entrada.target.style.transitionDelay = (posicao * 0.08) + 's';
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.12 });

elementosAnimados.forEach(function (el) {
  observador.observe(el);
});


const formulario    = document.getElementById('formulario-contato');
const campoResposta = document.getElementById('resposta-formulario');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  const nome     = document.getElementById('campo-nome').value.trim();
  const email    = document.getElementById('campo-email').value.trim();
  const assunto  = document.getElementById('campo-assunto').value.trim();
  const mensagem = document.getElementById('campo-mensagem').value.trim();

  if (!nome || !email || !assunto || !mensagem) {
    mostrarResposta('Por favor, preencha todos os campos.', 'erro');
    return;
  }

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailValido) {
    mostrarResposta('Por favor, insira um e-mail válido.', 'erro');
    return;
  }

  const botaoEnviar       = formulario.querySelector('button[type="submit"]');
  botaoEnviar.disabled    = true;
  botaoEnviar.textContent = 'Enviando...';

  setTimeout(function () {
    mostrarResposta('✓ Mensagem enviada! Em breve entrarei em contato.', 'sucesso');
    formulario.reset();
    botaoEnviar.disabled    = false;
    botaoEnviar.textContent = 'Enviar Mensagem ✉';
  }, 1200);
});

function mostrarResposta(texto, tipo) {
  campoResposta.textContent = texto;
  campoResposta.className   = 'resposta-formulario ' + tipo;

  setTimeout(function () {
    campoResposta.textContent = '';
    campoResposta.className   = 'resposta-formulario';
  }, 5000);
}


document.querySelectorAll('.campo-formulario input, .campo-formulario textarea').forEach(function (campo) {
  campo.addEventListener('focus', function () {
    const label = campo.closest('.campo-formulario').querySelector('label');
    if (label) label.style.color = '#00c8ff';
  });

  campo.addEventListener('blur', function () {
    const label = campo.closest('.campo-formulario').querySelector('label');
    if (label) label.style.color = '';
  });
});


const seletoresAnimados = [
  '.categoria-habilidade',
  '.cartao-projeto',
  '.cartao-curso',
  '.cartao-formacao',
  '.item-contato',
  '.texto-sobre',
  '.lateral-sobre',
  '.informacoes-contato',
  '.formulario-contato',
];

seletoresAnimados.forEach(function (seletor) {
  document.querySelectorAll(seletor).forEach(function (elemento) {
    elemento.classList.add('aparece');
    observador.observe(elemento);
  });
});
