window.angular&&(function() {
    var module= angular.module('CE.TextInput', []);

    module.directive('ceTextInput', [function() {
        return {
            restrict: 'E',
            scope: {
                type: '=',
                ngModel: '=',
                onInit: '&',
                onChange: '&',
                onKeyPress: '&',
                onEnterKey: '&'
            },
            link: function(scope, element, attr) {
                if(window.CETextInput) {
                    scope.$editor= new CETextInput(element[0], {
                        type: scope.type,
                        onInit: function(editor) {
                            scope.ngModel= editor.value;
                            return scope.onInit({'$editor': editor});
                        },
                        onChange: function(e, editor) {
                            scope.ngModel= editor.value;
                            scope.$apply();
                            return scope.onChange({'$event': e, '$editor': editor});
                        },
                        onKeyPress: function(e, editor) {
                            return scope.onKeyPress({'$event': e, '$editor': editor});
                        },
                        onEnterKey: function(e, editor) {
                            return scope.onEnterKey({'$event': e, '$editor': editor});
                        }
                    });
                }
            }
        };
    }]);

})();