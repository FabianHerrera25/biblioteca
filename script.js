function ListarBibliotecarios(busqueda) {
    fetch("listar.php", {
        method: "POST",
        body: busqueda
    }).then(response => response.text()).then(response => {
        resultado.innerHTML = response;
    })
}

registrar.addEventListener("click", () => {
    fetch("registrar.php", {
        method: "POST",
        body: new FormData(frm)
    }).then(response => response.text()).then(response => {
        if (response == "ok") {
            Swal.fire({
                icon: 'success',
                title: 'Registrado',
                showConfirmButton: false,
                timer: 1500
            })
            frm.reset();
            ListarBibliotecarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Modificado',
                showConfirmButton: false,
                timer: 1500
            })
            registrar.value = "Registrar";
            idp.value = "";
            ListarBibliotecarios();
            frm.reset();
        }
    })
});

function Eliminar(id) {
    Swal.fire({
        title: '¿Está seguro de eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí!',
        cancelButtonText: 'NO'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch("eliminar.php", {
                method: "POST",
                body: id
            }).then(response => response.text()).then(response => {
                if (response == "ok") {
                    ListarBibliotecarios();
                    Swal.fire({
                        icon: 'success',
                        title: 'Eliminado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }

            })

        }
    })
}

function Editar(id) {
    fetch("editar.php", {
        method: "POST",
        body: id
    }).then(response => response.json()).then(response => {
        idp.value = response.id;
        codigo.value = response.codigo;
        nombre.value = response.nombre;
        apellido.value = response.apellido;
        estado.value = response.estado;
        registrar.value = "Actualizar"
    })
}

buscar.addEventListener("keyup", () => {
    const valor = buscar.value;
    if (valor == "") {
        ListarBibliotecarios();
    } else {
        ListarBibliotecarios(valor);
    }
});