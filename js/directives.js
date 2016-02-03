app.directive('todoParent', [todoParent]);

function todoParent() {
  return {
    controller: ['$scope', function($scope) {
      var vm = this;
      vm.list = [];
      vm.addPost = function() {
        console.log(vm.list);
        vm.list.push('child');
        $scope.$apply();
      };

      vm.deletePost = function(event) {
        event.target.parentNode.removeChild(event.target);
      };
    }],
    controllerAs: 'tp',
    // template: '<div><h2>Do All The Things</h2></div>',
    require: 'todoParent',
    link: function(scope, element, attrs, ctrl) {
      element.find('button').on('click', function(event) {
        ctrl.addPost();
      });
    }
  };
}

app.directive('todoChild', [todoChild]);

function todoChild() {
  return {
    controller: ['$scope', function($scope) {
      var vm = this;

    }],
    template: '<div><h3>Do a Thing</h3></div>',
    require: '^todoParent',
    link: function(scope, element, attrs, ctrl) {

      element.on('click', function(event) {
        ctrl.deletePost(event);
      });
    }
  };
}
