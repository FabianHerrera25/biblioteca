var Biblioteca = angular.module('Biblioteca', ['ngRoute', 'angularUtils.directives.dirPagination', 'ngCookies']);
Biblioteca.controller('BibliotecaController', async function ($http, $cookies, $scope, $rootScope) {
    //variables
    $rootScope.Token = ''; /*await $cookies.getObject('user');*/
    $rootScope.title = '';
    $rootScope.Msj = null;
    $rootScope.RegistrosXPag = '10';
    $rootScope.ContRegistros = 0;
    $rootScope.Estatus = '1';
    //sesiones
    $rootScope.Login = function (Entrada, Pass) {
        $http({
            url: "../Api/Usuario/Login",
            method: "Post",
            params: { Entrada: Entrada, Pass: Pass }
        }).then(async function (response) {
            var res = response.data;
            if (res.Token != null) {
                $cookies.putObject('user', res.Token);
                //window.location.assign("../Main/Index");
                location.href = "../Main/#!/";
            } else {
                $scope.alert('error', 'open', res.Error);
                await new Promise(r => setTimeout(r, 5000));
                $scope.alert('error', 'close')
            }
        }).catch(function (err) {
            alert('Excepcion Sel.' + err.data.ExceptionMessage);
        });
    }
    $rootScope.Logout = function () {
        $rootScope.decodedToken = null;
        $rootScope.delCookie('user');
        $rootScope.title = null;
        $rootScope.Token = null;
        window.location.assign("../Main/LoginView");
    }
    $rootScope.alert = function (element, action, Mensaje) {
        var x = document.getElementById(element);
        switch (action) {
            case 'open': x.style.display = "block";
                $rootScope.Msj = Mensaje;
                break;
            case
                'close': x.style.display = "none";
                $rootScope.Msj = null;
                break;
        }
    }
    $rootScope.setCookie = function () {
        $cookies.put(key, value);
    }
    $rootScope.getCookie = async function (key) {
        let session = await $cookies.getObject(key);
        if (session == undefined) {
            $rootScope.Logout();
        } else {
            let Diferencia = await $rootScope.ExpiredToken(session);
            if (Diferencia < 0) {
                $rootScope.Logout();
            }
            $scope.LeerToken(session);
            return session;
        }
    }
    $rootScope.delCookie = function (key) {
        $cookies.remove(key);
    }
    $rootScope.LeerToken = function (token) {
        return JSON.parse(atob(token.split('.')[1]));
    }
    $rootScope.Modal = function (open, close) {
        $('#' + open).modal("show");
        $('#' + close).modal("hide");
    }
    //security
    $rootScope.Desencriptar = async function (text) {
        var pass = await
            $http({
                url: "../Api/Usuario/Desencriptar",
                method: "POST",
                params: { text: text },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.Token
                }
            }).then().catch(function (err) {
                alert('Excepcion Desencriptar.' + err.data.ExceptionMessage);
            });
        return pass.data;
    }
    $rootScope.ExpiredToken = async function (token) {
        let decodedToken = JSON.parse(atob(token.split('.')[1]));
        //console.log(decodedToken);
        let exp = await $rootScope.ParseDateUnix(decodedToken.exp);
        //let iat = await $rootScope.ParseDateUnix(decodedToken.iat);
        let now = new Date(Date.now());
        let Diference = await $rootScope.DateDiference(exp, now);
        //console.log('Vence: ' + exp);
        //console.log('Solicitado: ' + iat);
        //console.log('Comprobado: ' + now);
        //console.log('Restante: ' + Diference.toFixed(2) + ' minutos');
        return Diference;
    }
    $rootScope.ParseDateUnix = function (Fecha) {
        return new Date(Fecha * 1000);
    }
    $rootScope.DateDiference = function (Date1, Date2) {
        let Diferenciaminutos = (Date1 - Date2) / 60000;
        return Diferenciaminutos;
    }
    $rootScope.Auth = async function () {
        let session = await $cookies.getObject('user');
        $rootScope.Token = session;
        let decodedToken = await $scope.LeerToken(session);
        $rootScope.decodedToken = decodedToken;
        switch (decodedToken.role) {
            case 'Administrador':
                return 'Administrador';
                break;
            case 'Usuario':
                return 'Usuario';
                break;
            default:
                return 'AUTH_REQUIRED';
                break;
        }
    };
});
Biblioteca.config(function ($routeProvider) {
    $routeProvider.
        when('/', { title: 'Control', templateUrl: '../View/Bibliotecario.html', controller: 'BibliotecariosController' }).
        when('/Bibliotecarios', { title: 'Control', templateUrl: '../View/Bibliotecario' }).
        when('/Usuarios', { title: 'Usuario', templateUrl: '../View/Usuario', controller: 'BibliotecariosController' }).
        when('/Libros', { title: 'Perfil', templateUrl: '../View/Libro', controller: 'UsuariosController' }).
        when("/Prestamos", { templateUrl: '../View/Prestamo', controller: "PrestamosController" }).
        otherwise({ templateUrl: '<h1>Otherwise</h1>' });
});
Biblioteca.filter('Fecha', ['$filter', $filter =>
    (date, format, timezone) =>
        date && $filter('date')(date.slice(6, -2),
            format, timezone)
]);