'use strict'
const ctrl = angular.module('brandModule', [
    'ui.router'
])

const SERVER = 'https://webtech-prj-parfumuri-carinagutter.c9users.io'

ctrl.controller('brandController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(SERVER + '/brands')
            .then((response) => {
                $scope.cells = response.data
            })
            .catch((error) => console.log(error))
    }
    
    
    $scope.addbrand = (brand) => {
        $http.post(SERVER + '/brands', brand)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }
    
      $scope.deletebrand = (brand) => {
        $http.delete(SERVER + '/brands/' + brand.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }
    
    $scope.selected = {}

    $scope.editbrand = (brand) => {
        $scope.selected = brand
    }
    
       $scope.cancelEditing = () => {
        $scope.selected = {}
    }
    
    $scope.getTemplate = (brand) => {
        if (brand.id == $scope.selected.id) {
            return 'edit'
        }
        return 'display'
    }

    $scope.savebrand = (brand) => {
        $http.put(SERVER + '/brands/' + brand.id, brand)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => console.log(error))
    }


    $constructor()
    
}])