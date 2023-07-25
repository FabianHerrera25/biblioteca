(function (Usuario) {
    Usuario.controller("UsuarioController", function ($http, $scope, $rootScope) {
        $scope.NewUsuario =
            {
                nombre: '',
                contrasena: '',
                correo: ''
            };
        $scope.UsuarioMod = '';
        $scope.Usuario = '';
        $scope.Usuario_Get = function () {
            $http({
                url: "https://localhost:7211/Api/Usuario/Usuario_Get",
                method: "get"
            }).then(function (response) {
                $scope.UsuarioMod = response.data;              
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
        $scope.Usuario_GetById = function () {
            $http({
                url: "https://localhost:7211/Api/Usuario/Usuario_GetById",
                method: "get"
            }).then(function (response) {
                $scope.Usuario= response.data;
            }).catch(function (err) {
                alert('Excepcion SelById.' + err.data);
            });
        }
        $scope.Usuario_Ins = function (NewUsuario) {
            $http({
                url: "https://localhost:7211/api/Usuario/Usuario_Ins",
                method: "Post",
                data: NewUsuario
            }).then(function (response) {
                $scope.UsuarioMod.push(
                    {
                        nombre: NewUsuario.nombre,
                        aPaterno: NewUsuario.aPaterno,
                        aMaterno: NewUsuario.aMaterno,
                        idUsuario: response.data.id
                    });
                $scope.Pass = response.data.contrasena;
                $rootScope.ContRegistros = $scope.UsuarioMod.length;             
            }).catch(function (err) {
                alert('Excepcion Ins.' + err.data);
            });
        }
        $scope.Usuario_Upd = function (EditUsuario) {
            var i;
            for (i = 0; i < $scope.ListUsuarioMod.length; i++) {
                if ($scope.ListUsuarioMod[i].IdUsuario === EditUsuario.IdUsuario) {
                    $http({
                        url: "../Usuario/Usuario_Upd",
                        method: "POST",
                        data: EditUsuario
                    }).then(function () {
                        $scope.ListUsuarioMod[i] = EditUsuario;
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.Usuario_Del = function (Id) {
            var i;
            for (i = 0; i < $scope.ListUsuarioMod.length; i++) {
                if ($scope.ListUsuarioMod[i].IdUsuario === Id) {
                    $http({
                        url: "../Usuario/Usuario_Del",
                        method: "POST",
                        params: { ID: Id }
                    }).then(function () {
                        $scope.ListUsuarioMod.splice(i, 1);
                        $scope.ContRegistros = $scope.ListUsuarioMod.length;
                    }).catch(function (err) {
                        alert('Excepcion Al Eliminar.' + err.data);
                    });
                    break;
                }
            }
        };   
    });
})(Biblioteca);