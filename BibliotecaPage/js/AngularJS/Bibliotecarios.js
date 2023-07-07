(function (Bibliotecarios) {
    Bibliotecarios.controller("BibliotecariosController", function ($http, $scope, $rootScope) {
        $scope.NewBibliotecario =
            {
                Nombre: '',
                APaterno: '',
                AMaterno: ''
            };
        $scope.BibliotecarioMod = '';
        $scope.Biblioterio_Get = function () {
            $http({
                url: "https://localhost:7211/Api/Bibliotecario/Bibliotecario_Get",
                method: "get"
            }).then(function (response) {
                $scope.BibliotecarioMod = response.data;
                $rootScope.ContRegistros = response.length;
            }).catch(function (err) {
                alert('Excepcion Sel.' + err.data);
            });
        }
    });
})(Biblioteca);