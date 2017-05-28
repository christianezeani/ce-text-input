window.angular&&(function() {
    var module= angular.module('CE.TextInput', []);

    module.directive('ceTextInput', [function() {
        return {
            restrict: 'E',
            scope: { type: '=', ngModel: '=' },
            link: function(scope, element, attr) {
                if(window.CETextInput) {
                    scope.$editor= new CETextInput(element[0], {
                        type: scope.type,
                        onInit: function(editor) {
                            scope.ngModel= editor.value;
                        },
                        onChange: function(e, editor) {
                            scope.$apply(function() {
                                scope.ngModel= editor.value;
                            });
                        }
                    });
                }
            }
        };
    }]);

})();