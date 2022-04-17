const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listarHuevos = document.querySelector('#lista-huevos')
let articulosCarrito = []

cargarEventListeners()
function cargarEventListeners() {
    
    listarHuevos.addEventListener('click', agregarHuevo)

    
    carrito.addEventListener('click', eliminarHuevo)

    
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] 
        limpiarHTML()
    })
}


function agregarHuevo(e) {
    e.preventDefault()


    if (e.target.classList.contains('agregar-carrito')) {
        const huevoSeleccionado = e.target.parentElement.parentElement
        leerDatosHuevo(huevoSeleccionado)
    }
}

function eliminarHuevo(e) {
    if (e.target.classList.contains('borrar-huevo')) {
        const huevoId = e.target.getAttribute('data-id')

        
        articulosCarrito = articulosCarrito.filter(huevo => huevo.id !== huevoId)
        carritoHTML()
    }
}


function leerDatosHuevo(huevo) {
    console.log(huevo);


    const infoHuevo = {
        imagen: huevo.querySelector('img').src,
        titulo: huevo.querySelector('h4').textContent,
        precio: huevo.querySelector('.precio span').textContent,
        id: huevo.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    
    const existe = articulosCarrito.some ( huevo => huevo.id === infoHuevo.id )
    if (existe) {
        
        const huevos = articulosCarrito.map(huevo => {
            if (huevo.id === infoHuevo.id) {
                huevo.cantidad++
                return huevo
            } else {
                return huevo
            }
        })
        articulosCarrito = [...huevos]
    } else {
        
       
        articulosCarrito = [...articulosCarrito, infoHuevo]
    }
    console.log(articulosCarrito);


    carritoHTML()
}



function carritoHTML() {

    
    limpiarHTML()

   
    articulosCarrito.forEach(huevo => {
        const { imagen, titulo, precio, cantidad, id } = huevo
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href='#' class="borrar-huevo" data-id="${id}"> X </a>
        </td>
        `
        
        contenedorCarrito.appendChild(row)
    })
}


function limpiarHTML() {
    

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}

