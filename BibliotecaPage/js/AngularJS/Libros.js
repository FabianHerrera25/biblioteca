(function (Libro) {
    Libro.controller("LibroController", function ($http, $scope, $rootScope) {
        $scope.NewLibro =
            {
                nombre:'',
                editorial:'',
                genero:'',
                autor:'',
                inventario:0
            };
        $rootScope.LibroMod = '';
        $scope.Libro =
            {
            Id: '0',
            Inventario: 0,
            Add: 0,
            };
        $rootScope.Libro_Get = async function () {
            await $http({
                url: "https://localhost:7211/Api/Libro/Libro_Get",
                method: "get"
            }).then(async function (response) {
                $rootScope.LibroMod =await response.data;              
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
        $scope.Libro_GetById = function () {
            $http({
                url: "https://localhost:7211/Api/Libro/Libro_GetById",
                method: "get"
            }).then(function (response) {
                $scope.Libro= response.data;
            }).catch(function (err) {
                alert('Excepcion SelById.' + err.data);
            });
        }
        $scope.Libro_Ins = function (NewLibro) {
            $http({
                url: "https://localhost:7211/api/Libro/Libro_Ins",
                method: "Post",
                data: NewLibro
            }).then(function (response) {
                $rootScope.LibroMod.push(
                    {
                        nombre: NewLibro.nombre,
                        aPaterno: NewLibro.aPaterno,
                        aMaterno: NewLibro.aMaterno,
                        idLibro: response.data.id
                    });
                $scope.Pass = response.data.contrasena;
                $rootScope.ContRegistros = $rootScope.LibroMod.length;
                console.log('Se ha agregado correctamente');
            }).catch(function (err) {
                alert('Excepcion Ins.' + err.data);
            });
        }
        $scope.Libro_Upd = function (EditLibro) {
            var i;
            for (i = 0; i < $rootScope.LibroMod.length; i++) {
                if ($rootScope.LibroMod[i].idLibro === EditLibro.idLibro) {
                    $http({
                        url: "https://localhost:7211/api/Libro/Libro_Upd",
                        method: "PUT",
                        data: EditLibro
                    }).then(function (response) {
                        $rootScope.LibroMod[i] = EditLibro;
                        alert(response.data);
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.Libro_Del = function (Id) {
            var i;
            for (i = 0; i < $rootScope.LibroMod.length; i++) {
                if ($rootScope.LibroMod[i].idLibro === Id) {
                    $http({
                        url: "https://localhost:7211/api/Libro/Libro_Del",
                        method: "PUT",
                        params: { ID: Id }
                    }).then(function (response) {
                        $rootScope.LibroMod.splice(i, 1);
                        $scope.ContRegistros = $rootScope.LibroMod.length;
                        alert(response.data);
                    }).catch(function (err) {
                        alert('Excepcion Al Eliminar.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.LoadEdit = function (e)
        {
            $scope.EditLibro = e;
        }
        $scope.Libro_Info = function (Id)
        {
            var i;
            for (i = 0; i < $rootScope.LibroMod.length; i++) {
                if ($rootScope.LibroMod[i].idLibro == parseInt(Id)) {
                    $scope.Libro.Inventario = $rootScope.LibroMod[i].inventario;
                    break;
                }
            }
        }
        $scope.Libro_UpdStock = function (Id,Libros) {
            var i;
            for (i = 0; i < $rootScope.LibroMod.length; i++) {
                if ($rootScope.LibroMod[i].idLibro === parseInt(Id)) {
                    $http({
                        url: "https://localhost:7211/Api/Libro/Libro_UpdStock",
                        method: "PUT",
                        params:{IdLibro: Id,LibrosExtra:Libros}
                    }).then(function (response) {                       
                        $rootScope.LibroMod[i].inventario = parseInt($rootScope.LibroMod[i].inventario) + Libros;                       
                        alert(response.data);
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $rootScope.GetNombreLibro = function (Id) {
            var i;
            for (i = 0; i < $rootScope.LibroMod.length; i++) {
                if ($rootScope.LibroMod[i].idLibro === parseInt(Id)) {
                    return $rootScope.LibroMod[i];
                    break;
                }
            }
        }
    });
})(Biblioteca);