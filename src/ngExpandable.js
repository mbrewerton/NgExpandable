(function () {
    'use strict';

    angular
        .module ('mbrewerton.ngExpandable')
        .directive ('expandable', directive);


    /** @ngInject */
    function directive(Dependencies) {

        function directiveController($element, $attrs, $timeout) {
            var vm = this;

            $timeout(function() {
                var el = $element[0];
                el.style.overflow = 'hidden';
                var maxHeight = el.scrollHeight;
                var expanded = true;
                var handleElement = document.getElementById(vm.handle);

                var getTransition = function(speed, easing) {
                    return (speed || 0.5) + 's height ' + (easing || 'ease-in-out');
                }

                var setHeight = function() {
                    if (expanded) {
                        el.style.height = maxHeight + 'px';
                        $timeout(function() {
                                el.style.height = 'auto';
                            },
                            vm.speed);
                    } else {
                        el.style.height = 0;
                    }
                }
                el.style.transition = getTransition(vm.speed, vm.easing);

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
        }

        return {
            bindToController: true,
            controller: directiveController,
            restrict: 'A',
            scope: {                
                handle: '@',
                speed: '=?',
                easing: '@?'
            },
        }
    }

} ());