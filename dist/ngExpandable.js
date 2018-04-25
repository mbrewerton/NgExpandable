angular
    .module('mbrewerton.ngExpandable', [])
    .directive('expandable', function () {
        var directiveController =
            ['$scope', '$element', '$attrs', '$timeout',
                function directiveController($scope, $element, $attrs, $timeout) {
                    $timeout(function () {
                        var el = $element[0];
                            el.style.overflow = 'hidden';
                        var _classes = {
                                base: 'ng-expandable',
                                collapsed: 'collapsed',
                                handle: {
                                    base: 'ng-expandable-handle',
                                    icon: 'ng-expandable-handle-icon',
                                    header: 'ng-expandable-handle-header'
                                }
                            },
                            _computedStyle = window.getComputedStyle(el, null),
                            _expanded = true,
                            _maxHeight = parseFloat(el.scrollHeight),
                            _handleElement = angular.element(document.getElementById($scope.handle)),
                            _handleTypes = {
                                icon: 'icon',
                                header: 'header'
                            },
                            _handleType = $scope.handleType || _handleTypes.header,
                            _speed = $scope.speed || 0.5,
                            _postAnimationTimeout;

                        var ComputeHeight = function() {
                            return _maxHeight
                        }

                        var GetTransition = function (easing) {
                            return (_speed || 0.5) + 's height ' + (easing || 'ease-in-out');
                        }

                        var SetClasses = function() {
                            $element.addClass(_classes.base);
                            _handleElement.addClass(_classes.handle.base);

                            switch(_handleType) {
                                case _handleTypes.header:
                                    _handleElement.addClass(_classes.handle.header);
                                    break;
                                case _handleTypes.icon:
                                    _handleElement.addClass(_classes.handle.icon);
                                    break;
                                default:
                                    LogError('Unknown handle type specified.\nExpected one of: ' + Object.keys(_handleTypes).map(function(k){return _handleTypes[k]}).join(", ") + '. \nGot \"' + _handleType + '\"');
                                    break;
                            }
                        }

                        var SetCollapseClass = function(isCollapsed) {
                            if (isCollapsed) {
                                $element.addClass(_classes.collapsed);
                                _handleElement.addClass(_classes.collapsed);
                            } else {
                                $element.removeClass(_classes.collapsed);
                                _handleElement.removeClass(_classes.collapsed);
                            }
                        }

                        var SetHeight = function () {
                            $timeout.cancel(_postAnimationTimeout);
                            _maxHeight = el.scrollHeight;
                            if (_expanded) {
                                el.style.height = ComputeHeight() + 'px';
                                SetCollapseClass(false);
                                PostAnimation(function() {
                                    el.style.height = 'auto';
                                })
                            } else {
                                el.style.height = ComputeHeight() + 'px';
                                $timeout(function () {
                                    el.style.height = 0;

                                    PostAnimation(function() {
                                        SetCollapseClass(true);
                                    });
                                });
                            }
                        }
                        el.style.transition = GetTransition($scope.easing);

                        var ExpandFunction = function () {
                            _expanded = !_expanded;
                            SetHeight();
                        }

                        var PostAnimation = function(func) {
                            _postAnimationTimeout = $timeout(function() {
                                func();
                            }, _speed * 1000);
                        }

                        var LogError = function(err, lineNumber) {
                            console.error('[Error(mbrewerton.ngExpandable)] - ' + err)
                        }

                        if (_handleElement) {
                            // Apply the click event to our handle only
                            _handleElement[0].addEventListener('click', ExpandFunction);
                        } else {
                            // apply the expand to our element itself
                            el.addEventListener('click', ExpandFunction);
                        }

                        SetClasses();
                        SetHeight();
                    });
                }];

        return {
            controller: directiveController,
            restrict: 'A',
            scope: {
                easing: '@?',
                handle: '@',
                handleType: '@?',
                speed: '=?'
            },
            transclude: true,
            template: '<div class="ng-expandable-inner" ng-transclude></div>'
        }
    });