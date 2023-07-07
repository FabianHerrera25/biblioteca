(function (Usuarios) {
    Usuarios.controller("UsuariosController",function ($http, $scope, $rootScope) {
        //usuarios
        $scope.NewUsuario =
            {
                Nombre: null,
                Correo: null,
                Pass: null,
                Rol: 'Usuario'
            }
        $scope.ListUsuariosMod = null;
        $scope.Usuario_Ins = function (NewUsuario) {
            $http({
                url: "../Api/Usuario/Usuario_Ins",
                method: "POST",
                data: NewUsuario,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(async function (response) {
                if (response.data.Error === '' || response.data.Error === null) {
                    $scope.ListUsuariosMod.push({
                        IdUsuario: response.data.IdUsuario,
                        Nombre: response.data.Nombre,
                        Pass: response.data.Pass,
                        Correo: response.data.Correo,
                        Error: response.data.Error,
                        Rol: response.data.Rol,
                        Estatus: true
                    });
                    $rootScope.ContRegistros = $scope.ListUsuariosMod.length;
                    $rootScope.Modal('', 'AgregarUsuario');
                    $scope.clean();
                    alert('Datos guardados correctamente.');
                } else {
                    $rootScope.alert('erroragregar', 'open', response.data.Error);
                    await new Promise(r => setTimeout(r, 5000));
                    $rootScope.alert('erroragregar', 'close');
                }
            }).catch(function (err) {
                alert('Excepcion Usuario_Ins.' + err.data);
            });

        }
        $scope.Usuario_Sel = function (Estatus) {
            $rootScope.Estatus = Estatus;
            //$rootScope.Token =await $rootScope.getCookie('user');
            $http({
                url: "../Api/Usuario/Usuario_Sel",
                method: "GET",
                params: { Estatus: Estatus },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(function (response) {
                $scope.ListUsuariosMod = response.data;
                $rootScope.ContRegistros = response.data.length;
            }).catch(function (err) {
                alert('Excepcion Usuario_Sel.' + err.data.ExceptionMessage);
            });
        }
        $scope.LoadEdit_Usuario = function (e) {
            $scope.EditUsuario = e;
            $rootScope.Modal('EliminarUsuario', '');
        }
        $scope.Usuario_SelById = async function (Id) {            
            $http({
                url: "../Api/Usuario/Usuario_SelById",
                method: "GET",
                params: { Id: Id },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(async function (response) {
                $scope.EditUsuario = response.data;
                $scope.EditUsuario.Pass = await $rootScope.Desencriptar($scope.EditUsuario.Pass);
                $rootScope.Modal('EditarUsuario', '');
                }).catch(function (err) {
                    alert('Excepcion Usuario_SelById.' + err.data.ExceptionMessage);
            });
        }
        $scope.Usuario_React = function (Id) {
            $http({
                url: "../Api/Usuario/Usuario_React",
                method: "PUT",
                params: { Id: Id },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(async function (response) {
                $scope.EditUsuario = response.data;
                let p = await $rootScope.Desencriptar(response.data.Pass);
                $scope.EditUsuario.Pass = p;
                $val_Lista(Id, 'React');
                $rootScope.Modal('EditarUsuario', '');
                console.log();
            }).catch(function (err) {
                alert('Excepcion Usuario_React.' + err.data.ExceptionMessage);
            });
        }
        $scope.Usuario_Upd = function (EditUsuario) {
            var i;
            for (i = 0; i < $scope.ListUsuariosMod.length; i++) {
                if ($scope.ListUsuariosMod[i].IdUsuario === EditUsuario.IdUsuario) {
                    $http({
                        url: "../Api/Usuario/Usuario_Upd",
                        method: "PUT",
                        data: EditUsuario,
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + $rootScope.Token
                        }
                    }).then(async function (response) {
                        if (response.data.Error === '' || response.data.Error === null) {
                            $scope.ListUsuariosMod[i] = EditUsuario;
                            $rootScope.Modal('', 'EditarUsuario');
                            alert('Datos actualizados correctamente');
                        }
                        else {
                            $rootScope.alert('erroreditar', 'open', response.data.Error);
                            await new Promise(r => setTimeout(r, 5000));
                            $rootScope.alert('erroreditar', 'close');
                        }
                    }).catch(function (err) {
                        alert('Excepcion Usuario_Upd.' + err.data.ExceptionMessage);
                    });
                    break;
                }
            }
        };
        $scope.Usuario_UpdPerfil = function (EditUsuario) {
            $http({
                url: "../Api/Usuario/Usuario_Upd",
                method: "POST",
                data: EditUsuario,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(async function (response) {
                if (response.data.Error === '' || response.data.Error === null) {
                    $scope.EditUsuario = EditUsuario;
                    $rootScope.Modal('', 'EditarUsuario');
                    alert('Datos actualizados correctamente');
                }
                else {
                    $rootScope.alert('erroreditar', 'open', response.data.Error);
                    await new Promise(r => setTimeout(r, 5000));
                    $rootScope.alert('erroreditar', 'close');
                }
            }).catch(function (err) {
                alert('Excepcion Usuario_UpdPerfil.' + err.data.ExceptionMessage);
            });
        }
        $scope.Usuario_Del = function (Id) {
            $http({
                url: "../Api/Usuario/Usuario_Del",
                method: "DELETE",
                params: { ID: Id },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(async function (response) {
                let MSJ = response.data;
                if (MSJ === '') {
                    $val_Lista(Id, 'EliminarUsuario');
                    $rootScope.Modal('', 'EliminarUsuario');
                    alert('Datos eliminados correctamente');
                }
                else {
                    $rootScope.alert('erroreliminar', 'open', MSJ);
                    await new Promise(r => setTimeout(r, 5000));
                    $rootScope.alert('erroreliminar', 'close')
                }
            }).catch(function (err) {
                alert('Excepcion Usuario_Del.' + err.data.ExceptionMessage);
            });
        };
        $scope.ViewPerfil = async function ()
        {
            await $rootScope.getCookie('user');
            let Id = $rootScope.decodedToken.Id;
            $http({
                url: "../Api/Usuario/Usuario_SelById",
                method: "GET",
                params: { Id: Id },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then(async function (response) {
                $scope.EditUsuario = response.data;
                $scope.EditUsuario.Pass = await $rootScope.Desencriptar($scope.EditUsuario.Pass);
                $rootScope.Modal('EditarUsuario', '');
            }).catch(function (err) {
                alert('Excepcion Usuario_SelById.' + err.data.ExceptionMessage);
            });
        }
        $scope.clean = function () {
            var NewUsuario =
            {
                Nombre: '',
                Correo: '',
                Pass: '',
                Rol: 'Usuario'
            }
            $scope.NewUsuario = NewUsuario;
            $scope.EditUsuario = null;
        };
        $val_Lista = function (Id, Accion) {
            let estatus = $rootScope.Estatus;
            switch (estatus) {
                //inactivo
                case '0':
                    var i;
                    for (i = 0; i < $scope.ListUsuariosMod.length; i++) {
                        if ($scope.ListUsuariosMod[i].IdUsuario === Id) {
                            $scope.ListUsuariosMod.splice(i, 1);
                            let Reg = $scope.ListUsuariosMod.length;
                            if (Reg == 0) {
                                $scope.Usuario_Sel(1);
                                $rootScope.Estatus = '1';
                            }
                        }
                    }
                    break;
                //activo
                case '1':
                    var i;
                    for (i = 0; i < $scope.ListUsuariosMod.length; i++) {
                        if ($scope.ListUsuariosMod[i].IdUsuario === Id) {
                            $scope.ListUsuariosMod.splice(i, 1);
                            $rootScope.ContRegistros = $scope.ListUsuariosMod.length;
                        }
                    }
                    break;
                //todos
                case '2':
                    var i;
                    for (i = 0; i < $scope.ListUsuariosMod.length; i++) {
                        if ($scope.ListUsuariosMod[i].IdUsuario === Id) {
                            switch (Accion) {
                                case 'React':
                                    $scope.ListUsuariosMod[i].Estatus = 1;
                                    break;
                                case 'EliminarUsuario':
                                    $scope.ListUsuariosMod[i].Estatus = 0;
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    break;
            }
        }
    });
})(EnvioCorreos);