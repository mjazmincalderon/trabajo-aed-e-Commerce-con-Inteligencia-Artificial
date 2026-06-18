const products = [
  {
    codigoPublicacion: "RV-0001",
    nombreProducto: "GameBox Mini 1992",
    categoria: "Consolas",
    anioOrigen: 1992,
    estado: "Restaurado",
    tipoOperacion: "Venta",
    precio: 82000,
    disponibleParaIntercambio: true,
    vendedor: "PixelNico",
    ubicacion: "CABA",
    fechaPublicacion: "2026-06-15",
    imagen: "assets/products/gamebox-mini.png",
    descripcion: "Consola portatil con estuche original y pantalla revisada."
  },
  {
    codigoPublicacion: "RV-0002",
    nombreProducto: "Cassette Synthwave Club",
    categoria: "Musica",
    anioOrigen: 1987,
    estado: "Coleccion",
    tipoOperacion: "Venta",
    precio: 18500,
    disponibleParaIntercambio: false,
    vendedor: "LunaTape",
    ubicacion: "Rosario",
    fechaPublicacion: "2026-06-12",
    imagen: "assets/products/cassette-synthwave.png",
    descripcion: "Edicion limitada con arte de tapa conservado."
  },
  {
    codigoPublicacion: "RV-0003",
    nombreProducto: "Revista Arcade Max N. 12",
    categoria: "Revistas",
    anioOrigen: 1996,
    estado: "Usado",
    tipoOperacion: "Intercambio",
    precio: 9900,
    disponibleParaIntercambio: true,
    vendedor: "RetroMati",
    ubicacion: "La Plata",
    fechaPublicacion: "2026-06-10",
    imagen: "assets/products/revista-arcade.png",
    descripcion: "Incluye notas sobre fichines clasicos y mapas de trucos."
  },
  {
    codigoPublicacion: "RV-0004",
    nombreProducto: "Joystick Turbo Pad",
    categoria: "Accesorios",
    anioOrigen: 1994,
    estado: "Restaurado",
    tipoOperacion: "Venta o intercambio",
    precio: 24000,
    disponibleParaIntercambio: true,
    vendedor: "BitValen",
    ubicacion: "Cordoba",
    fechaPublicacion: "2026-06-09",
    imagen: "assets/products/joystick-turbo.png",
    descripcion: "Control compatible con consolas de 16 bits."
  },
  {
    codigoPublicacion: "RV-0005",
    nombreProducto: "Vinilo Neon Nights",
    categoria: "Musica",
    anioOrigen: 1984,
    estado: "Coleccion",
    tipoOperacion: "Venta",
    precio: 31500,
    disponibleParaIntercambio: false,
    vendedor: "DiscoRomi",
    ubicacion: "Mendoza",
    fechaPublicacion: "2026-06-08",
    imagen: "assets/products/vinilo-neon.png",
    descripcion: "Vinilo de estetica synth con funda abstracta y disco cuidado."
  },
  {
    codigoPublicacion: "RV-0006",
    nombreProducto: "Camara Instant Flash 80",
    categoria: "Fotografia",
    anioOrigen: 1988,
    estado: "Usado",
    tipoOperacion: "Venta o intercambio",
    precio: 58000,
    disponibleParaIntercambio: true,
    vendedor: "FotoVale",
    ubicacion: "Mar del Plata",
    fechaPublicacion: "2026-06-07",
    imagen: "assets/products/camara-instant.png",
    descripcion: "Camara instantanea retro con correa y prueba de funcionamiento."
  },
  {
    codigoPublicacion: "RV-0007",
    nombreProducto: "Reloj Digital Pixel Band",
    categoria: "Wearables",
    anioOrigen: 1998,
    estado: "Restaurado",
    tipoOperacion: "Venta",
    precio: 27600,
    disponibleParaIntercambio: false,
    vendedor: "ByteSofi",
    ubicacion: "CABA",
    fechaPublicacion: "2026-06-06",
    imagen: "assets/products/reloj-digital.png",
    descripcion: "Reloj digital translucido con botones coloridos y bateria nueva."
  },
  {
    codigoPublicacion: "RV-0008",
    nombreProducto: "Mini Arcade Pocket",
    categoria: "Arcade",
    anioOrigen: 1991,
    estado: "Restaurado",
    tipoOperacion: "Intercambio",
    precio: 69000,
    disponibleParaIntercambio: true,
    vendedor: "ArcadeTomi",
    ubicacion: "San Miguel",
    fechaPublicacion: "2026-06-05",
    imagen: "assets/products/mini-arcade.png",
    descripcion: "Mini cabina de mesa con controles restaurados y pantalla revisada."
  }
];

const grid = document.querySelector("#productGrid");
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categorySelect");
const operationSelect = document.querySelector("#operationSelect");
const dialog = document.querySelector("#productDialog");
const dialogContent = document.querySelector("#dialogContent");
const closeDialog = document.querySelector("#closeDialog");
const selectedItems = document.querySelector("#selectedItems");
const itemCount = document.querySelector("#itemCount");
const totalAmount = document.querySelector("#totalAmount");
const reserveButton = document.querySelector("#reserveButton");
const reserveMessage = document.querySelector("#reserveMessage");

const publicationsByCode = new Map(products.map((product) => [product.codigoPublicacion, product]));
const selectedCodes = new Set();

const money = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0
});

function renderProducts() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const operation = operationSelect.value;
  const filtered = products.filter((product) => {
    const matchesText = `${product.nombreProducto} ${product.descripcion} ${product.codigoPublicacion} ${product.vendedor} ${product.ubicacion}`
      .toLowerCase()
      .includes(query);
    const matchesCategory = category === "Todas" || product.categoria === category;
    const matchesOperation = operation === "Todas" || product.tipoOperacion === operation;
    return matchesText && matchesCategory && matchesOperation;
  });

  grid.innerHTML = "";

  filtered.forEach((product) => {
    const card = document.createElement("button");
    card.className = "product-card";
    card.type = "button";
    card.dataset.code = product.codigoPublicacion;
    card.innerHTML = `
      <img class="product-photo" src="${product.imagen}" alt="${product.nombreProducto}" loading="lazy" />
      <p class="card-code">${product.codigoPublicacion}</p>
      <h3>${product.nombreProducto}</h3>
      <p>${product.descripcion}</p>
      <p><strong>${product.tipoOperacion}</strong> - ${product.estado}</p>
      <span class="price">${money.format(product.precio)}</span>
    `;
    card.addEventListener("click", () => openProduct(product));
    grid.appendChild(card);
  });
}

function openProduct(product) {
  dialogContent.innerHTML = `
    <img class="dialog-photo" src="${product.imagen}" alt="${product.nombreProducto}" />
    <p class="card-code">${product.codigoPublicacion}</p>
    <h2>${product.nombreProducto}</h2>
    <p>${product.descripcion}</p>
    <div class="detail-list">
      <div class="detail-row"><strong>Categoria</strong><span>${product.categoria}</span></div>
      <div class="detail-row"><strong>Anio</strong><span>${product.anioOrigen}</span></div>
      <div class="detail-row"><strong>Estado</strong><span>${product.estado}</span></div>
      <div class="detail-row"><strong>Tipo de operacion</strong><span>${product.tipoOperacion}</span></div>
      <div class="detail-row"><strong>Precio</strong><span>${money.format(product.precio)}</span></div>
      <div class="detail-row"><strong>Intercambio</strong><span>${product.disponibleParaIntercambio ? "Si" : "No"}</span></div>
      <div class="detail-row"><strong>Vendedor</strong><span>${product.vendedor}</span></div>
      <div class="detail-row"><strong>Ubicacion</strong><span>${product.ubicacion}</span></div>
      <div class="detail-row"><strong>Fecha</strong><span>${product.fechaPublicacion}</span></div>
    </div>
    <button class="button primary wide add-button" type="button" data-code="${product.codigoPublicacion}">
      Agregar a seleccion
    </button>
  `;
  dialog.showModal();
}

function addToSelection(code) {
  if (!publicationsByCode.has(code)) return;
  selectedCodes.add(code);
  reserveMessage.textContent = "";
  renderSelection();
}

function removeFromSelection(code) {
  selectedCodes.delete(code);
  renderSelection();
}

function renderSelection() {
  const selectedProducts = Array.from(selectedCodes).map((code) => publicationsByCode.get(code));
  const total = selectedProducts.reduce((sum, product) => sum + product.precio, 0);

  itemCount.textContent = selectedProducts.length;
  totalAmount.textContent = money.format(total);
  reserveButton.disabled = selectedProducts.length === 0;

  if (selectedProducts.length === 0) {
    selectedItems.innerHTML = '<p class="empty-state">Todavia no agregaste objetos.</p>';
    return;
  }

  selectedItems.innerHTML = selectedProducts.map((product) => `
    <article class="selection-item">
      <div>
        <p class="card-code">${product.codigoPublicacion}</p>
        <h3>${product.nombreProducto}</h3>
        <p>${product.tipoOperacion} - ${product.vendedor} - ${product.ubicacion}</p>
      </div>
      <div class="selection-actions">
        <strong>${money.format(product.precio)}</strong>
        <button class="remove-button" type="button" data-remove="${product.codigoPublicacion}">Quitar</button>
      </div>
    </article>
  `).join("");
}

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
operationSelect.addEventListener("change", renderProducts);
closeDialog.addEventListener("click", () => dialog.close());
dialogContent.addEventListener("click", (event) => {
  const button = event.target.closest("[data-code]");
  if (!button) return;
  addToSelection(button.dataset.code);
  dialog.close();
  document.querySelector("#seleccion").scrollIntoView({ behavior: "smooth" });
});
selectedItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;
  removeFromSelection(button.dataset.remove);
});
reserveButton.addEventListener("click", () => {
  const codes = Array.from(selectedCodes).join(", ");
  reserveMessage.textContent = `Reserva armada para: ${codes}`;
});

renderProducts();
renderSelection();
