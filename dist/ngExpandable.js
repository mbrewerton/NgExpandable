angular
    .module('mbrewerton.ngExpandable', ['ngAnimate'])
    .directive('expandable', function () {
        var directiveController =
            ['$scope', '$element', '$attrs', '$timeout',
                function directiveController($scope, $element, $attrs, $timeout) {
                    $timeout(function () {
                        var el = $element[0];
                        el.style.overflow = 'hidden';
                        var maxHeight = el.scrollHeight;
                        var expanded = true;
                        var handleElement = document.getElementById($scope.handle);

                        var getTransition = function (speed, easing) {
                            return (speed || 0.5) + 's height ' + (easing || 'ease-in-out');
                        }

                        var setHeight = function () {
                            if (expanded) {
                                el.style.height = maxHeight + 'px';
                            } else {
                                el.style.height = 0;
                            }
                        }
                        el.style.transition = getTransition($scope.speed, $scope.easing);

                        var expandFunction = function () {
                            expanded = !expanded;
                            setHeight();
                        }

                        if (handleElement) {
                            // Apply the click event to our handle only
                            handleElement.addEventListener('click', expandFunction);
                        } else {
                            // apply the expand to our element itself
                            el.addEventListener('click', expandFunction);
                        }

                        setHeight();
                    });
                }];

        return {
            controller: directiveController,
            restrict: 'A',
            scope: {
                handle: '@',
                speed: '=?',
                easing: '@?'
            },
        }
    });