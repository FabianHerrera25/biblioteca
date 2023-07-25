(function (Prestamo) {
    Prestamo.controller("PrestamoController", function ($http, $scope, $rootScope) {
        $scope.idLibro = '0';
        $scope.Fecha = new Date();
        $scope.NewPrestamo = {
            idPrestamo: '0',
            fechaPrestamo: new Date(),
            fechaEsperada: new Date(),
            fechaDevolucion: new Date(),
            estado: "string",
            idCliente: '0',
            idBibliotecario: '0',
            libros: []
        };
        $scope.libro = [];
        $scope.libros = [];
        $scope.fechaAct = function () {
            var fechaEsperada = new Date($scope.NewPrestamo.fechaEsperada); // Crea un nuevo objeto de fecha basado en $scope.fechaEsperada
            fechaEsperada.setDate(fechaEsperada.getDate() + 15); // Agrega 15 días a la fecha
            $scope.NewPrestamo.fechaEsperada = fechaEsperada; // Asigna la fecha actualizada de vuelta a $scope.fechaEsperada
        };
        $scope.PrestamoMod = '';
        $scope.Prestamo = '';
        $scope.Detalles = [];
        $scope.EditarPrestamo = function (e) {
            $scope.Prestamo = e;
        }
        $scope.Prestamo_Get =async function () {
            await  $http({
                url: "https://localhost:7211/Api/Prestamo/Prestamo_Get",
                method: "get"
            }).then(async function (response) {
                $scope.PrestamoMod =await response.data;
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
        $scope.Prestamo_Ins = function (NewPrestamo) {
            if (NewPrestamo.libros.length > 0) {
                $http({
                    url: "https://localhost:7211/Api/Prestamo/Prestamo_Ins",
                    method: "Post",
                    data: NewPrestamo
                }).then(function (response) {
                    $scope.LimpiarListas();
                    $scope.idLibro = '';
                    var Cliente = $rootScope.GetNombreCliente(NewPrestamo.idCliente);
                    var Bibliotecario = $rootScope.GetNombreBibliotecario(NewPrestamo.idBibliotecario);
                    $scope.PrestamoMod.push(
                        {
                            idPrestamo: response.data,
                            cliente: Cliente,
                            bibliotecario: Bibliotecario,
                            fechaPrestamo: new Date(NewPrestamo.fechaPrestamo),
                            fechaEsperada: new Date(NewPrestamo.fechaEsperada)
                        });
                    $rootScope.ContRegistros = $scope.PrestamoMod.length;
                    alert('Prestamo guardado correctamente');
                }).catch(function (err) {
                    alert('Excepcion Ins.' + err.data);
                });
            } else {
                alert('Debe alegir minimo un libro');
            }
        }
        $scope.LimpiarListas = function () {           
            $scope.libro = [];
            $scope.libros = [];
            $scope.NewPrestamo = {
                idPrestamo: '0',
                fechaPrestamo: new Date(),
                fechaEsperada: new Date(),
                fechaDevolucion: new Date(),
                estado: "string",
                idCliente: '0',
                idBibliotecario: '0',
                libros: []
            };
        }
        $scope.Prestamo_Upd = function (Id,Fecha) {
            var i;
            for (i = 0; i < $scope.PrestamoMod.length; i++) {
                if ($scope.PrestamoMod[i].idPrestamo === Id) {
                    $http({
                        url: "https://localhost:7211/Api/Prestamo/Prestamo_Upd",
                        method: "PUT",
                        params: {ID:Id,Fecha:Fecha}
                    }).then(function (response) {
                        $scope.PrestamoMod.splice(i, 1);
                        alert(response.data);
                        $scope.ContRegistros = $scope.PrestamoMod.length;
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.Prestamo_Del = function (Id) {
            var i;
            for (i = 0; i < $scope.PrestamoMod.length; i++) {
                if ($scope.PrestamoMod[i].idPrestamo === Id) {
                    $http({
                        url: "https://localhost:7211/Api/Prestamo/Prestamo_Cancel",
                        method: "PUT",
                        params: { ID: Id }
                    }).then(function (response) {
                        $scope.PrestamoMod.splice(i, 1);
                        alert(response.data);
                        $scope.ContRegistros = $scope.PrestamoMod.length;
                    }).catch(function (err) {
                        alert('Excepcion Al Eliminar.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.MetodosIniciales = async function () {
            $scope.fechaAct();
            await $scope.Prestamo_Get();
            await $rootScope.Libro_Get();
            await $rootScope.Cliente_Get();
            await $rootScope.Bibliotecario_Get(); 
            $scope.setId();
        }
        $scope.setId = function ()
        {
            var i;
            for (i = 0; i < $scope.BibliotecarioMod.length; i++) {
                if ($rootScope.BibliotecarioMod[i].idUsuario === $rootScope.decodedToken.idUsuario) {
                    $scope.NewPrestamo.idBibliotecario = String($rootScope.BibliotecarioMod[i].idBibliotecario);                  
                    break;
                }
            }
        }
        $scope.AddLibro = function (Id) {
            var i;
            for (i = 0; i < $rootScope.LibroMod.length; i++) {
                if ($rootScope.LibroMod[i].idLibro === parseInt(Id)) {
                    $scope.idLibro = '0';
                    $scope.libro.push({
                        id: Id,
                        nombre: $rootScope.LibroMod[i].nombre
                    });
                    $scope.libros.push(Id);
                    $scope.NewPrestamo.libros = $scope.libros;
                    break;
                }
            }
        }
        $scope.Prestamo_Libros_Del = function (Id) {
            var i;
            for (i = 0; i < $scope.PrestamoMod.length; i++) {
                if ($scope.libro[i].id === Id) {
                    $scope.libro.splice(i, 1);
                    break;
                }
            }
            var a;
            for (a = 0; a < $scope.libros.length; a++) {
                if ($scope.libros[a].id === Id) {
                    $scope.libros.splice(a, 1);
                    break;
                }
            }
            $scope.NewPrestamo.libros = $scope.libros;
        };
        $scope.DetallePrestamo = async function (e) {
            $scope.Prestamo = e;
            $rootScope.Closmod("", "#editarPrestamo");
            //$scope.Detalles = [];
            let Libros = await $scope.DetallePrestamo_GetById(e.idPrestamo);
            var i;
            //$rootScope.Closmod("#editarPrestamo", "");
            for (i = 0; i < Libros.length; i++) {
                const nombreLibro = await $rootScope.GetNombreLibro(Libros[i].idLibro);
                await $scope.Detalles.push(nombreLibro);
            }
            //$rootScope.Closmod("", "#editarPrestamo");

        }
        $scope.DetallePrestamo_GetById = async function (Id) {
            let Datos = '';
            await $http({
                url: "https://localhost:7211/Api/Prestamo/DetallePrestamo_GetById",
                method: "get",
                params: { ID: Id }
            }).then(async function (response) {
                Datos =await response.data;
            }).catch(function (err) {
                alert('Excepcion SelById.' + err.data);
                });
            return Datos;
        }
    });
})(Biblioteca);