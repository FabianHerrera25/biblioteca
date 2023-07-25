(function (Bibliotecarios) {
    Bibliotecarios.controller("BibliotecarioController", function ($http, $scope, $rootScope) {
        $scope.NewBibliotecario =
            {
                nombre: '',
                aPaterno: '',
                aMaterno: '',
                idUsuario: 0
            };
        $scope.Pass = '';
        $rootScope.BibliotecarioMod = '';
        $scope.Bibliotecario = '';
        $scope.LoadEdit = function (e)
        {
            $scope.EditBibliotecario = e;
        }
        $rootScope.Bibliotecario_Get = async function () {
            await $http({
                url: "https://localhost:7211/Api/Bibliotecario/Bibliotecario_Get",
                method: "get"
            }).then(async function (response) {
                $rootScope.BibliotecarioMod =await response.data;              
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
        $scope.Bibliotecario_GetById = function () {
            $http({
                url: "https://localhost:7211/Api/Bibliotecario/Bibliotecario_GetById",
                method: "get"
            }).then(function (response) {
                $scope.Bibliotecario= response.data;
            }).catch(function (err) {
                alert('Excepcion SelById.' + err.data);
            });
        }
        $scope.Bibliotecario_Ins = function (NewBibliotecario) {
            $http({
                url: "https://localhost:7211/api/Bibliotecario/Bibliotecario_Ins",
                method: "Post",
                data: NewBibliotecario
            }).then(function (response) {
                $rootScope.BibliotecarioMod.push(
                    {
                        nombre: NewBibliotecario.nombre,
                        aPaterno: NewBibliotecario.aPaterno,
                        aMaterno: NewBibliotecario.aMaterno,
                        idBibliotecario: response.data.id
                    });
                $scope.Pass = response.data.contrasena;
                $rootScope.ContRegistros = $rootScope.BibliotecarioMod.length;  
            }).catch(function (err) {
                alert('Excepcion Ins.' + err.data);
            });
        }
        $scope.Bibliotecario_Upd = function (EditBibliotecario) {
            var i;
            for (i = 0; i < $rootScope.BibliotecarioMod.length; i++) {
                if ($rootScope.BibliotecarioMod[i].idBibliotecario === EditBibliotecario.idBibliotecario) {
                    $http({
                        url: "https://localhost:7211/Api/Bibliotecario/Bibliotecario_Upd",
                        method: "PUT",
                        data: EditBibliotecario
                    }).then(function (response) {
                        $rootScope.BibliotecarioMod[i] = EditBibliotecario;
                        alert(response.data);
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.Bibliotecario_Del = function (Id) {
            var i;
            for (i = 0; i < $rootScope.BibliotecarioMod.length; i++) {
                if ($rootScope.BibliotecarioMod[i].idBibliotecario === Id) {
                    $http({
                        url: "https://localhost:7211/Api/Bibliotecario/Bibliotecario_Del",
                        method: "PUT",
                        params: { ID: Id }
                    }).then(function (response) {
                        $rootScope.BibliotecarioMod.splice(i, 1);
                        alert(response.data);
                        $scope.ContRegistros = $rootScope.BibliotecarioMod.length;
                    }).catch(function (err) {
                        alert('Excepcion Al Eliminar.' + err.data);
                    });
                    break;
                }
            }
        };   
        $rootScope.GetNombreBibliotecario = function (Id) {
            var i;
            for (i = 0; i < $rootScope.ClienteMod.length; i++) {
                if ($rootScope.BibliotecarioMod[i].idBibliotecario === parseInt(Id)) {
                    return $rootScope.BibliotecarioMod[i].nombre + ' ' + $rootScope.BibliotecarioMod[i].aPaterno + ' ' + $rootScope.BibliotecarioMod[i].aMaterno;
                    break;
                }
            }
        }

    });
})(Biblioteca);