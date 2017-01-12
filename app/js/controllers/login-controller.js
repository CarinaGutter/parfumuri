'use strict'
const controller = angular.module('sellerModule', [
    'ui.router'
])

const Slogin = 'https://webtech-prj-parfumuri-carinagutter.c9users.io'

controller.controller('loginController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(Slogin + '/sellers')
            .then((response) => {
                $scope.sellers = response.data
            })
            .catch((error) => console.log(error))
    }

    $constructor()
}])
