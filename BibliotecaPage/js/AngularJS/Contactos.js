(function (Contactos) {
    Contactos.controller("ContactosController", function ($http, $scope, $rootScope) {
        $scope.NewContactos =
            {
                nombre: '',
                aPaterno: '',
                aMaterno: '',
                idUsuario: 0
            };
        $scope.ContactosMod = '';
        $scope.Contactos = '';
        $scope.Contactos_Get = function () {
            $http({
                url: "https://localhost:7211/Api/Contactos/Contactos_Get",
                method: "get"
            }).then(function (response) {
                $scope.ContactosMod = response.data;
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
        $scope.Contactos_GetById = function () {
            $http({
                url: "https://localhost:7211/Api/Contactos/Contactos_GetById",
                method: "get"
            }).then(function (response) {
                $scope.Contactos = response.data;
            }).catch(function (err) {
                alert('Excepcion SelById.' + err.data);
            });
        }
        $scope.Contactos_Ins = function (NewContactos) {
            $http({
                url: "https://localhost:7211/api/Contactos/Contactos_Ins",
                method: "Post",
                data: NewContactos
            }).then(function (response) {
                $scope.ContactosMod.push(
                    {
                        nombre: NewContactos.nombre,
                        aPaterno: NewContactos.aPaterno,
                        aMaterno: NewContactos.aMaterno,
                        idContactos: response.data.id
                    });
                $scope.Pass = response.data.contrasena;
                $rootScope.ContRegistros = $scope.ContactosMod.length;
            }).catch(function (err) {
                alert('Excepcion Ins.' + err.data);
            });
        }
        $scope.Contactos_Upd = function (EditContactos) {
            var i;
            for (i = 0; i < $scope.ListContactosMod.length; i++) {
                if ($scope.ListContactosMod[i].IdContactos === EditContactos.IdContactos) {
                    $http({
                        url: "../Contactos/Contactos_Upd",
                        method: "POST",
                        data: EditContactos
                    }).then(function () {
                        $scope.ListContactosMod[i] = EditContactos;
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.Contactos_Del = function (Id) {
            var i;
            for (i = 0; i < $scope.ListContactosMod.length; i++) {
                if ($scope.ListContactosMod[i].IdContactos === Id) {
                    $http({
                        url: "../Contactos/Contactos_Del",
                        method: "POST",
                        params: { ID: Id }
                    }).then(function () {
                        $scope.ListContactosMod.splice(i, 1);
                        $scope.ContRegistros = $scope.ListContactosMod.length;
                    }).catch(function (err) {
                        alert('Excepcion Al Eliminar.' + err.data);
                    });
                    break;
                }
            }
        };
    });
})(Biblioteca);