var Biblioteca = angular.module('Biblioteca', ['ngRoute', 'angularUtils.directives.dirPagination', 'ngCookies']);
Biblioteca.controller('BibliotecaController', async function ($http, $cookies, $scope, $rootScope) {
    //variables
    $rootScope.Token = ''; /*await $cookies.getObject('user');*/
    $rootScope.title = '';
    $rootScope.Msj = null;
    $rootScope.Usuario
    $rootScope.RegistrosXPag = '10';
    $rootScope.ContRegistros = 0;
    $rootScope.Estatus = '1';
    $rootScope.PalabraClave = '';
    $rootScope.Closmod = function (modclos, modopen) {
        $(modclos).modal('hide');
        $(modopen).modal('show');
    }
    //sesiones
    $rootScope.Login = function (Entrada, Pass) {
        $http({
            url: "https://localhost:7211/api/Usuario/Login",
            method: "Get",
            params: { Entrada: Entrada, Pass: Pass }
        }).then(async function (response) {
            var res = response.data;
            if (res != null) {
                $cookies.putObject('user', res);
                //window.location.assign("../Main/Index");
                location.href = "../View/Layout.html";
            } else {
                $scope.alert('error', 'open', res.Error);
                await new Promise(r => setTimeout(r, 5000));
                $scope.alert('error', 'close')
            }
        }).catch(function (err) {
            alert('Excepcion Sel.' + err.data.ExceptionMessage);
        });
    }
    $rootScope.Usuario_GetById = function (Id) {
        $http({
            url: "https://localhost:7211/api/Usuario/Usuario_GetById",
            method: "Get",
            params: { Id:Id }
        }).then(async function (response) {
            $rootScope.Usuario =await response.data[0];
        }).catch(function (err) {
            alert('Excepcion Sel.' + err.data.ExceptionMessage);
        });
    }
    $rootScope.Usuario_Upd = function (usuario) {
        $http({
            url: "https://localhost:7211/api/Usuario/Usuario_Upd",
            method: "PUT",
            data: usuario
        }).then(function (response) {
            alert(response.data);
        }).catch(function (err) {
            alert('Excepcion Sel.' + err.data.ExceptionMessage);
        });
    }

    $rootScope.Logout = function () {
        $rootScope.decodedToken = null;
        $rootScope.delCookie('user');
        $rootScope.Token = null;
        window.location.assign("../View/Login.html");
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
            $rootScope.decodedToken = session[0];
        }
    }
    $rootScope.delCookie = function (key) {
        $cookies.remove(key);
    }
    $rootScope.Modala = function (modclos, modopen) {
        if (modopen != '') {
            var modalopen = new bootstrap.Modal(document.getElementById(modopen));
            modalopen.show();
        }
        if (modclos != '') {
            var modalclose = new bootstrap.Modal(document.getElementById(modclos));
            modalclose.hide();
        }
        //// Toggle Modal
        //modal1.toggle();
        //// Toggle the modal again after 3 seconds
        //setTimeout(() => {
        //    modal1.toggle();
        //}, 3000)
    }     
    //security
    $rootScope.ParseDateUnix = function (Fecha) {
        return new Date(Fecha * 1000);
    }
    $rootScope.DateDiference = function (Date1, Date2) {
        let Diferenciaminutos = (Date1 - Date2) / 60000;
        return Diferenciaminutos;
    }
});
Biblioteca.config(function ($routeProvider) {
    $routeProvider.
        when('/', { title: 'Control', templateUrl: '../View/Bibliotecario.html', controller: 'BibliotecarioController' }).
        when('/Bibliotecarios', { templateUrl: '../View/Bibliotecario.html', controller: 'BibliotecarioController'}).
        when('/Clientes', { templateUrl: '../View/Cliente.html', controller: 'ClienteController' }).
        when('/Usuarios', { templateUrl: '../View/Usuario.html', controller: 'BibliotecarioController' }).
        when('/Libros', { templateUrl: '../View/Libro.html', controller: 'LibroController' }).
        when("/Prestamos", { templateUrl: '../View/Prestamo.html', controller: "PrestamoController" }).
        //otherwise({ templateUrl: '../View/404.html' });
        otherwise({ templateUrl: '../View/404.html' });
});
Biblioteca.filter('Fecha', ['$filter', $filter =>
    (date, format, timezone) =>
        date && $filter('date')(date.slice(6, -2),
            format, timezone)
]);