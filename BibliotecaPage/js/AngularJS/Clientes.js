(function (Cliente) {
    Cliente.controller("ClienteController", function ($http, $scope, $rootScope) {
        $scope.NewCliente =
            {
                nombre: '',
                aPaterno: '',
                aMaterno: '',
                nombreU: '',
                telefono:'',
                celular:'',
                correo: '',
                contrasenia: ''
            };
        $rootScope.ClienteMod = '';
        $scope.Cliente = '';
        $rootScope.Cliente_Get =async function () {
            await $http({
                url: "https://localhost:7211/Api/Cliente/Cliente_Get",
                method: "get"
            }).then(async function (response) {
                $rootScope.ClienteMod =await response.data;              
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
        $scope.Cliente_GetById = function () {
            $http({
                url: "https://localhost:7211/Api/Cliente/Cliente_GetById",
                method: "get"
            }).then(function (response) {
                $scope.Cliente= response.data;
            }).catch(function (err) {
                alert('Excepcion SelById.' + err.data);
            });
        }
        $scope.Cliente_Ins = function (NewCliente) {
            $http({
                url: "https://localhost:7211/api/Cliente/Cliente_Ins",
                method: "Post",
                data: NewCliente
            }).then(function (response) {
                $rootScope.ClienteMod.push({
                    nombre: NewCliente.nombre,
                    aPaterno: NewCliente.aPaterno,
                    aMaterno: NewCliente.aMaterno,
                    idCliente: response.data.id
                });
            }).catch(function (err) {
                alert('Excepcion Ins.' + err.data);
            });
        }
        $scope.Cliente_Upd = function (EditCliente) {
            var i;
            for (i = 0; i < $rootScope.ClienteMod.length; i++) {
                if ($rootScope.ClienteMod[i].idCliente === EditCliente.idCliente) {
                    $http({
                        url: "https://localhost:7211/api/Cliente/Cliente_Upd",
                        method: "PUT",
                        data: EditCliente
                    }).then(function (response) {
                        $rootScope.ClienteMod[i] = EditCliente;
                        alert(response.data);
                    }).catch(function (err) {
                        alert('Excepcion Upd.' + err.data);
                    });
                    break;
                }
            }
        };
        $scope.Cliente_Del = function (Id) {
            var i;
            for (i = 0; i < $rootScope.ClienteMod.length; i++) {
                if ($rootScope.ClienteMod[i].idCliente === Id) {
                    $http({
                        url: "https://localhost:7211/Api/Cliente/Cliente_Del",
                        method: "PUT",
                        params: { ID: Id }
                    }).then(function (response) {
                        $rootScope.ClienteMod.splice(i, 1);
                        $scope.ContRegistros = $rootScope.ClienteMod.length;
                        alert(response.data);
                    }).catch(function (err) {
                        alert('Excepcion Al Eliminar.' + err.data);
                    });
                    break;
                }
            }
        };   
        $scope.LoadEdit = function (e) {
            $scope.EditCliente = e;
        }
        $rootScope.GetNombreCliente = function (Id)
        {
            var i;
            for (i = 0; i < $rootScope.ClienteMod.length; i++) {
                if ($rootScope.ClienteMod[i].idCliente === parseInt(Id)) {                    
                    return $rootScope.ClienteMod[i].nombre + ' ' + $rootScope.ClienteMod[i].aPaterno + ' ' + $rootScope.ClienteMod[i].aMaterno;
                    break;
                }
            }
        }
    });
})(Biblioteca);