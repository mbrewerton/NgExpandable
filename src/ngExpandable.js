angular
.module('mbrewerton.ngExpandable', ['ngAnimate'])
.directive('expandable', function () {
    var directiveController =
        ['$scope', '$element', '$attrs', '$timeout',
            function directiveController($scope, $element, $attrs, $timeout) {
                $timeout(function () {
                    var el = $element[0];
                        el.style.overflow = 'hidden';
                    var _maxHeight = el.scrollHeight,
                        _expanded = angular.isDefined($scope.open) ? $scope.open : true,
                        _handleElement = document.getElementById($scope.handle),
                        _speed = $scope.speed || 0.5,
                        _startedOpen = _expanded,
                        _runOnce = true;

                    if (!_expanded) {
                        el.style.display = 'none';
                    }

                    var getTransition = function (easing) {
                        return (_speed || 0.5) + 's height ' + (easing || 'ease-in-out');
                    }

                    var setHeight = function () {
                        _maxHeight = el.scrollHeight;
                        if (_expanded) {
                            el.style.height = _maxHeight + 'px';
                            console.log(_speed);
                            $timeout(function() {
                                el.style.height = 'auto';
                            }, _speed * 1000);
                        } else {
                            el.style.height = _maxHeight + 'px';
                            $timeout(function() {
                                el.style.height = 0;
                            });
                        }
                    }
                    el.style.transition = getTransition($scope.easing);

                    var expandFunction = function () {
                        if (!_startedOpen && _runOnce) {
                            el.style.display = 'block';
                            _runOnce = false;
                        }
                        _expanded = !_expanded;
                        setHeight();
                    }

                    if (_handleElement) {
                        // Apply the click event to our handle only
                        _handleElement.addEventListener('click', expandFunction);
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
            easing: '@?',
            open: '=?'
        },
    }
});