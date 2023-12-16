// Recupero informacion del Local Storage

let carritoCompras = localStorage.getItem("Carrito")
carritoCompras = JSON.parse(carritoCompras)

let carritoContainer = document.getElementById("carritoContainer")

// Funcion para crear cards de productos

function mostrarProductos(productos){
    carritoContainer.innerHTML=""
    productos.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML =`<h2>${producto.nombre}</h2>
                        <p>Cantidad: ${producto.cantidad}</p>
                        <p>Precio total $${producto.precio * producto.cantidad}
                        <button class="eliminarCarrito" id="${producto.id}">Eliminar producto</button>`
        carritoContainer.appendChild(card)
    
    let acum = 0
    const num = carritoCompras.map((prod)=> prod.cantidad)
    num.forEach(cantidad=>{
        acum+=cantidad
    })
    console.log(acum)
    })
    botonEliminarCarrito()
}

// Funcion para eliminar un producto del carrito

function botonEliminarCarrito(){
    botonEliminar = document.querySelectorAll(".eliminarCarrito")
    botonEliminar.forEach(button =>{
        button.onclick = (e) => {
            const idActual = e.currentTarget.id
            const productoEliminar = carritoCompras.find(producto => producto.id == idActual)

            const carritoMod = carritoCompras.filter((prod) => prod !== productoEliminar)

            carritoCompras = carritoMod
            mostrarProductos(carritoCompras)
            localStorage.setItem("Carrito", JSON.stringify(carritoCompras))
            
        }
    }) 
}


console.log(carritoCompras)
mostrarProductos(carritoCompras)

let vaciarCarrito = document.getElementById("vaciarCarrito")

// Funcion para vaciar carrito

vaciarCarrito.onclick = () =>{
    Swal.fire({
        title: "Esta seguro que quiere vaciar el carrito?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Carrito vaciado!", "", "success");
            localStorage.clear()
            carritoCompras = []
            carritoContainer.innerHTML = `<p>No hay elementos en el carrito</p>`
        } else if (result.isDenied) {
            Swal.fire("Carrito conservado", "", "info");
        }
    });
    

}

// Interacciones con boton Comprar

let botonComprar = document.getElementById("botonComprar")

botonComprar.onclick = () =>{
    if(carritoCompras.length === 0){
        Swal.fire({
            title: "Compra no realizada",
            text: "Debe tener por lo menos un producto en el carrito",
            icon: "error"
        });
    } else {
        Swal.fire({
            title: "Compra realizada!",
            text: "Gracias por comprar con nosotros",
            icon: "success"
        });
    }
    console.log(carritoCompras)
    
}

let acum = 0
    const num = carritoCompras.map((prod)=> prod.cantidad)
    num.forEach(cantidad=>{
        acum+=cantidad
    })
    console.log(acum)
