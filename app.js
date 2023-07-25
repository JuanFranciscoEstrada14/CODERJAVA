const marcasMenu = document.getElementById('marcas-menu');
const inicioBtn = document.getElementById('inicio-btn');
const botinesContainer = document.getElementById('botines-container');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

const botinesDisponibles = [
  { id: 1, nombre: 'Botín Munich 1', marca: 'Munich', precio: 100, imagen: 'MUNICH1.jpg' },
  { id: 2, nombre: 'Botín Munich 2', marca: 'Munich', precio: 120, imagen: 'MUNICH2.jpg' },
  { id: 3, nombre: 'Botín Munich 3', marca: 'Munich', precio: 90, imagen: 'MUNICH3.jpg' },
  { id: 4, nombre: 'Botín Kelme 1', marca: 'Kelme', precio: 80, imagen: 'KELME1.jpg' },
  { id: 5, nombre: 'Botín Kelme 2', marca: 'Kelme', precio: 110, imagen: 'KELME2.jpg' },
  { id: 6, nombre: 'Botín Kelme 3', marca: 'Kelme', precio: 95, imagen: 'KELME3.jpg' },
  { id: 7, nombre: 'Botín Nike 1', marca: 'Nike', precio: 130, imagen: 'NIKE1.jpg' },
  { id: 8, nombre: 'Botín Nike 2', marca: 'Nike', precio: 150, imagen: 'NIKE2.jpg' },
  { id: 9, nombre: 'Botín Nike 3', marca: 'Nike', precio: 125, imagen: 'NIKE3.jpg' },
];

let carrito = [];

function filtrarPorMarca(marca) {
  const botinesFiltrados = botinesDisponibles.filter(botin => botin.marca === marca);
  mostrarBotinesDisponibles(botinesFiltrados);
}

function mostrarBotinesDisponibles(botines = botinesDisponibles) {
  botinesContainer.innerHTML = '';
  botines.forEach(botin => {
    const botinElement = document.createElement('div');
    botinElement.className = 'botin-image';
    botinElement.innerHTML = `
      <img src="img/${botin.imagen}" alt="${botin.nombre}">
      <h3>${botin.nombre}</h3>
      <p>Marca: ${botin.marca}</p>
      <p>Precio: $${botin.precio}</p>
      <button onclick="agregarAlCarrito(${botin.id})">Agregar al Carrito</button>
    `;
    botinesContainer.appendChild(botinElement);
  });
}

function agregarAlCarrito(botinId) {
  const botinSeleccionado = botinesDisponibles.find(botin => botin.id === botinId);
  carrito.push(botinSeleccionado);
  actualizarCarrito();
}

function actualizarCarrito() {
  carritoLista.innerHTML = '';
  let total = 0;
  carrito.forEach(botin => {
    const carritoItem = document.createElement('li');
    carritoItem.innerHTML = `
      <img src="img/${botin.imagen}" alt="${botin.nombre}" class="carrito-item-image">
      <span class="carrito-item-nombre">${botin.nombre}</span>
      <span class="carrito-item-precio">$${botin.precio}</span>
      <button onclick="eliminarDelCarrito(${botin.id})">Eliminar</button>
    `;
    carritoLista.appendChild(carritoItem);
    total += botin.precio;
  });
  carritoTotal.innerText = total;
}

function eliminarDelCarrito(botinId) {
  carrito = carrito.filter(botin => botin.id !== botinId);
  actualizarCarrito();
}


function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function comprar() {
  if (carrito.length === 0) {
    alert('El carrito está vacío. Eleji botines antes de comprar.');
  } else {
    alert('¡Muchas gracias por tu compra! Disfruta tus botines.');
    vaciarCarrito();
  }
}

const comprarBtn = document.getElementById('comprar-btn');
comprarBtn.addEventListener('click', comprar);

function volverAlInicio() {
  marcasMenu.querySelectorAll('li').forEach(item => item.classList.remove('active'));
  botinesContainer.innerHTML = '';
  mostrarBotinesDisponibles();
}

function volverAlInicio() {
  marcasMenu.querySelectorAll('li').forEach(item => item.classList.remove('active'));
  botinesContainer.innerHTML = '';
  mostrarBotinesDisponibles();
}


inicioBtn.addEventListener('click', volverAlInicio);


marcasMenu.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const marcaSeleccionada = item.dataset.marca;
    filtrarPorMarca(marcaSeleccionada);
    marcasMenu.querySelectorAll('li').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

mostrarBotinesDisponibles();
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

