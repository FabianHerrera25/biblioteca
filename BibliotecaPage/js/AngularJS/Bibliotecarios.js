(function (Bibliotecarios) {
    Bibliotecarios.controller("BibliotecariosController", function ($http, $scope, $rootScope) {
        $scope.NewBibliotecario =
            {
                nombre: '',
                aPaterno: '',
                aMaterno: '',
                idUsuario: 0
            };
        $scope.Pass = '';
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
        $scope.Biblioterio_Ins = function (NewBibliotecario) {
            $http({
                url: "https://localhost:7211/api/Bibliotecario/Bibliotecario_Ins",
                method: "Post",
                data: NewBibliotecario
            }).then(function (response) {
                $scope.BibliotecarioMod.push(
                    {
                        nombre: NewBibliotecario.nombre,
                        aPaterno: NewBibliotecario.aPaterno,
                        aMaterno: NewBibliotecario.aMaterno,
                        idBibliotecario: response.data.id
                    });
                $scope.Pass = response.data.contrasena;
                $rootScope.ContRegistros = $scope.BibliotecarioMod.length;             
            }).catch(function (err) {
                alert('Excepcion Ins.' + err.data);
            });
        }

    });
})(Biblioteca);