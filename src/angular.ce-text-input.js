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
                            var value= editor.value();
                            scope.ngModel= value;
                        },
                        onChange: function(e, editor) {
                            var value= editor.value();
                            scope.$apply(function() {
                                scope.ngModel= value;
                            });
                        }
                    });
                }
            }
        };
    }]);

})();