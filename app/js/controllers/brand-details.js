'use strict'
angular.module('brandModule')
  .controller('brandDetailsController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://webtech-prj-parfumuri-carinagutter.c9users.io'
    let $constructor = () => {
      $http.get(SERVER + '/brands/' + $stateParams.id)
        .then((response) => {
          $scope.brand = response.data
          return $http.get(SERVER + '/brands/' + $stateParams.id + '/perfumes')
        })
        .then((response) => {
          $scope.perfumes = response.data
        })
        .catch((error) => console.log(error))
    }
   
    $scope.addperfume = (perfume) => {
      $http.post(SERVER + '/brands/' + $stateParams.id + '/perfumes', perfume)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    } 
    
     $scope.deleteperfume = (perfume) => {
      $http.delete(SERVER + '/brands/' + $stateParams.id + '/perfumes/' + perfume.id)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }
    
     $scope.selected = {}
    
     $scope.editperfume = (perfume) => {
      $scope.selected = perfume
    }
    
     $scope.cancelEditing = () => {
      $scope.selected = {}
    }
    
    $scope.getTemplate = (perfume) => {
      if (perfume.id == $scope.selected.id) {
        return 'edit'
      }
      return 'display'
    }
    
    $scope.saveperfume = (perfume) => {
      $http.put(SERVER + '/brands/' + $stateParams.id + '/perfumes/' + perfume.id, perfume)
        .then((response) => {
          $state.go($state.current, {}, {
            reload: true
          })
        })
        .catch((error) => console.log(error))
    }
    
    $constructor()
  }])