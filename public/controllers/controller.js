var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http',
function($scope, $http){

	var refresh = function(){
		$http.get('/contatos').success(function(response){
		console.log('Pegando os dados requisitados');
		$scope.contatos = response;
		$scope.contato = "";
	})};

	refresh(); 

	$scope.addContato = function(){
		console.log($scope.contato);
		$http.post('/contatos', $scope.contato).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remover = function(id){
		console.log(id);
		$http.delete('/contatos/'+id).success(function(response){
			refresh();
		});
	};	

	$scope.selecionarEdicao = function(id){
		console.log(id);
		$http.get('/contatos/'+id).success(function(response){
			$scope.contato = response;
		})
	};

	$scope.editarContato = function(){
		console.log($scope.contato._id);
		$http.put('/contatos/'+ $scope.contato._id, $scope.contato).success(function(response){
			refresh();
		})
	};

	$scope.limpar = function(){
		$scope.contato = "";
	};
	
}]);

