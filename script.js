const productos = [
    {
        id: 1,
        nombre: "Ladrillo Cerámico",
        descripcion: "Ladrillo cerámico de alta calidad",
        cantidadEnStock: 100,
        costoEnPesos: 10.50
    },
    {
        id: 2,
        nombre: "Cemento Portland",
        descripcion: "Cemento Portland para construcción",
        cantidadEnStock: 50,
        costoEnPesos: 15.75
    },
    {
        id: 3,
        nombre: "Tornillos de Acero",
        descripcion: "Tornillos de acero inoxidable, paquete de 100 unidades",
        cantidadEnStock: 200,
        costoEnPesos: 8.99
    },
    {
        id: 4,
        nombre: "Pintura Latex Blanca",
        descripcion: "Pintura látex de interior, 1 galón",
        cantidadEnStock: 30,
        costoEnPesos: 25.50
    },
    {
        id: 5,
        nombre: "Martillo de Carpintero",
        descripcion: "Martillo de carpintero de 16 oz",
        cantidadEnStock: 60,
        costoEnPesos: 12.75
    },
    {
        id: 6,
        nombre: "Destornillador Phillips",
        descripcion: "Destornillador Phillips de cabeza cruzada",
        cantidadEnStock: 80,
        costoEnPesos: 6.25
    },
    {
        id: 7,
        nombre: "Pegamento de Contacto",
        descripcion: "Pegamento de contacto para madera y cuero",
        cantidadEnStock: 40,
        costoEnPesos: 9.99
    },
    {
        id: 8,
        nombre: "Tubo de PVC 2 pulgadas",
        descripcion: "Tubo de PVC de 2 pulgadas de diámetro, 10 pies de largo",
        cantidadEnStock: 25,
        costoEnPesos: 18.30
    },
    {
        id: 9,
        nombre: "Cinta Métrica",
        descripcion: "Cinta métrica de 25 pies",
        cantidadEnStock: 70,
        costoEnPesos: 7.50
    },
    {
        id: 10,
        nombre: "Taladro Eléctrico",
        descripcion: "Taladro eléctrico de 1/2 pulgada, 750W",
        cantidadEnStock: 15,
        costoEnPesos: 45.99
    },
    {
        id: 11,
        nombre: "Pala de Jardín",
        descripcion: "Pala de jardín con mango de madera",
        cantidadEnStock: 35,
        costoEnPesos: 14.25
    },
    {
        id: 12,
        nombre: "Bombillo LED",
        descripcion: "Bombillo LED de 60W, luz blanca",
        cantidadEnStock: 100,
        costoEnPesos: 3.99
    },
    {
        id: 13,
        nombre: "Cable de Extensión",
        descripcion: "Cable de extensión de 25 pies",
        cantidadEnStock: 45,
        costoEnPesos: 10.99
    },
    {
        id: 14,
        nombre: "Serrucho de Carpintero",
        descripcion: "Serrucho de carpintero de 20 pulgadas",
        cantidadEnStock: 55,
        costoEnPesos: 9.75
    },
    {
        id: 15,
        nombre: "Papel de Lija",
        descripcion: "Papel de lija surtido, paquete de 50 hojas",
        cantidadEnStock: 75,
        costoEnPesos: 5.99
    },
    {
        id: 16,
        nombre: "Tubo de Cobre 1/2 pulgada",
        descripcion: "Tubo de cobre de 1/2 pulgada de diámetro, 5 pies de largo",
        cantidadEnStock: 20,
        costoEnPesos: 21.50
    },
    {
        id: 17,
        nombre: "Silla de Plástico",
        descripcion: "Silla de plástico resistente, color blanco",
        cantidadEnStock: 40,
        costoEnPesos: 15.99
    },
    {
        id: 18,
        nombre: "Aceite de Motor",
        descripcion: "Aceite de motor sintético, 5 cuartos",
        cantidadEnStock: 65,
        costoEnPesos: 29.99
    },
    {
        id: 19,
        nombre: "Cepillo de Pintura",
        descripcion: "Cepillo de pintura de 2 pulgadas",
        cantidadEnStock: 90,
        costoEnPesos: 3.49
    },
    {
        id: 20,
        nombre: "Sierra Circular",
        descripcion: "Sierra circular eléctrica de 7-1/4 pulgadas",
        cantidadEnStock: 10,
        costoEnPesos: 79.95
    },
    // Agregar más productos aquí...
];


document.getElementById("buy-cash").addEventListener("click", function () {
    cambiarMetodoDePago("efectivo");
    aplicarDescuentoOAumento();
});

document.getElementById("buy-credit").addEventListener("click", function () {
    cambiarMetodoDePago("credito");
    aplicarDescuentoOAumento();
});

document.getElementById("buy-debit").addEventListener("click", function () {
    cambiarMetodoDePago("debito");
    calcularTotal(); // No se aplica descuento ni aumento
});

// Variables para llevar un seguimiento del carrito, el método de pago y las cantidades de productos
const carrito = [];
let metodoDePago = "efectivo"; // Puede ser "efectivo", "credito" o "debito"

// Función para mostrar los productos en la página web
// Función para agregar un producto al carrito
function agregarAlCarrito (productoId) {
    const producto = productos.find((p) => p.id === productoId);
    const cantidadInput = document.getElementById(`quantity-${productoId}`);
    const cantidad = parseInt(cantidadInput.value);

    if (producto && cantidad > 0 && producto.cantidadEnStock >= cantidad) {
        // Verificar si el producto ya está en el carrito y actualizar la cantidad
        const productoEnCarrito = carrito.find((p) => p.id === productoId);
        if (productoEnCarrito) {
            productoEnCarrito.cantidad += cantidad;
        } else {
            producto.cantidad = cantidad;
            carrito.push(producto);
        }

        // Actualizar la cantidad en stock en el JSON
        producto.cantidadEnStock -= cantidad;

        // Actualizar la cantidad en stock en el input
        cantidadInput.value = "1"; // Establecer el valor nuevamente a 1

        // Actualizar la cantidad en stock en la línea correspondiente en el HTML
        const cantidadEnStockLine = document.getElementById(`stock-${productoId}`);
        cantidadEnStockLine.innerHTML = `<b>Cantidad en Stock:</b> ${producto.cantidadEnStock}<br>`;

        // Mostrar el carrito y calcular el total
        calcularTotal();
        mostrarCarrito();
    }
}
// Función para mostrar los productos en la página web
function mostrarProductos () {
    const productList = document.getElementById("product-list");

    // Limpiar la lista de productos antes de agregar los nuevos
    productList.innerHTML = "";

    // Recorrer el array de productos y crear elementos HTML para mostrarlos
    productos.forEach((producto) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <b>Producto:</b> ${producto.nombre}<br>
            <b>Descripción:</b> ${producto.descripcion}<br>
            <span id="stock-${producto.id}"><b>Cantidad en Stock:</b> ${producto.cantidadEnStock}<br></span>
            <b>Costo en Pesos:</b> $${producto.costoEnPesos}<br>
            <label for="quantity-${producto.id}">Cantidad:</label>
            <input type="number" id="quantity-${producto.id}" value="1" min="1">
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button><br><br>
        `;
        productList.appendChild(listItem);
    });
}

// Resto del código...

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito (productoId) {
    // Buscar el índice del producto en el carrito
    const index = carrito.findIndex((producto) => producto.id === productoId);

    // Si se encontró el producto en el carrito, eliminarlo
    if (index !== -1) {
        const productoEliminado = carrito.splice(index, 1)[0];

        // Devolver la cantidad eliminada al stock
        const productoEnStock = productos.find((p) => p.id === productoId);
        productoEnStock.cantidadEnStock += productoEliminado.cantidad;

        // Volver a mostrar el carrito y recalcular el total
        mostrarCarrito();
        calcularTotal();
    }
}

// Resto del código...

// Función para mostrar el carrito de compras
function mostrarCarrito () {
    const cartTable = document.querySelector("#cart table tbody");
    cartTable.innerHTML = ""; // Limpiar la tabla antes de agregar los nuevos productos

    // Recorrer el carrito y crear filas de tabla para mostrar los productos
    carrito.forEach((producto) => {
        const cartRow = document.createElement("tr");
        cartRow.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.costoEnPesos.toFixed(2)}</td>
            <td>$${(producto.costoEnPesos * producto.cantidad).toFixed(2)}</td>
            <td><button class="eliminar-button fas fa-trash-alt" data-id="${producto.id}"></button></td>
        `;
        cartTable.appendChild(cartRow);
    });

    // Calcular el total y mostrarlo
    calcularTotal();

    // Agregar eventos click a los botones "ELIMINAR"
    const eliminarButtons = document.querySelectorAll(".eliminar-button");
    eliminarButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const productId = parseInt(button.getAttribute("data-id"));
            eliminarProductoDelCarrito(productId);
        });
    });

    // Actualizar la cantidad en stock en el HTML
    productos.forEach((producto) => {
        const cantidadEnStockLine = document.getElementById(`stock-${producto.id}`);
        cantidadEnStockLine.innerHTML = `<b>Cantidad en Stock:</b> ${producto.cantidadEnStock}<br>`;
    });
}


// Función para calcular el total y aplicar descuento o aumento según el método de pago
function calcularTotal () {
    const totalElement = document.getElementById("total-price");
    let total = 0;

    // Calcular el total sin descuento o aumento
    carrito.forEach((producto) => {
        total += producto.costoEnPesos * producto.cantidad;
    });

    // Aplicar descuento o aumento según el método de pago
    if (metodoDePago === "efectivo") {
        total *= 0.90; // 10% de descuento
    } else if (metodoDePago === "credito") {
        total *= 1.07; // 7% de aumento
    }

    totalElement.textContent = total.toFixed(2); // Mostrar el total en el formato deseado
}

// Función para cambiar el método de pago
function cambiarMetodoDePago (nuevoMetodo) {
    metodoDePago = nuevoMetodo;
    calcularTotal();
}

// Función para aplicar descuento o aumento y mostrar el total actualizado
function aplicarDescuentoOAumento () {
    if (metodoDePago === "efectivo") {
        total *= 0.90; // 10% de descuento
    } else if (metodoDePago === "credito") {
        total *= 1.07; // 7% de aumento
    }

    totalElement.textContent = total.toFixed(2); // Mostrar el total en el formato deseado
}

// Función para cambiar el método de pago
function cambiarMetodoDePago (nuevoMetodo) {
    metodoDePago = nuevoMetodo;
    calcularTotal();
}

// Llamar a la función para mostrar los productos al cargar la página
mostrarProductos();
