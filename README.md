# ngExpandable
`ngExpandable` is a directive for AngularJS that allows you to create expandable/collapsible elements in your AngularJS applications quickly and easily. There are minimal requirements and usage is extremely simple.

Current Stable Version: 1.2.0

## Requirements
- AngularJS - 1.6.9+ 
- AngularAnimate - 1.6.9+

## Installation
There is a bower package for ngExpandable if you're using bower.

If using bower:
```
bower install mbrewerton-ngexpandable
```

If not using bower:
Head to [releases](https://github.com/mbrewerton/NgExpandable/releases) and download the latest version. If using this method you will also need to make sure you have the appropriate version of AngularJS and AngularAnimate installed.

## New in this Release
- [Feature] Added the ability toggle the expandable element without the need for a `handle` element.

## Usage
Once installed, you need to make sure the script is included in the `<head></head>` tag and that it's added as a dependency in your AngularJS app:
```html
<html>
    <head>
        <script src="path/to/angular/angular.min.js"></script>
        <script src="path/to/angular-animate/angular-animate.min.js"></script>
        <script src="path/to/mbrewerton-gexpandable/ngExpandable.min.js"></script>

        <script>
            angular.module('myApp', [
                'ngAnimate',
                'mbrewerton.ngExpandable'
            ]);
        </script>
    </head>

    <body ng-app="myApp">
        <!-- Rest of content -->
    </body>
</html>
```

Using the directive is extremely simple. All you need is a "handle" and to mark your div as `expandable`. Simple example with a header:

```html
<div id="myHandle">My Header</div>
<div expandable handle="myHandle">
    <h2>A header in the div</h2>
    <div>
        Some more content in here
    </div>
</div>
```

**NEW**: You can now use the directive without a `handle` by using the `open` property. Example:
```js
var app = angular.module('demo', [
    'mbrewerton.ngExpandable'
]);

(function(){            
    angular.module('demo')
            .controller('controller', ControllerCtrl)
    function ControllerCtrl($scope){
        $scope.showContent = false;
        
        $scope.toggle = function() {
            $scope.showContent = !$scope.showContent;
        }
    }            
}());
```
```html
<button ng-click="toggle()">Toggle Div</div>
<div expandable open="showContent">
    <h2>A header in the div</h2>
    <div>
        Some more content in here
    </div>
</div>
```

The expandable div also supports dynamic heights, for example if you use an ng-repeat inside the expandable div, it will make sure to keep the size relevant, for example:

```html
<div id="myHandle">My Header</div>
<div expandable handle="myHandle">
    <h2>A header in the div</h2>
    <div ng-repeat="thing in myArray">
        <h3>{{thing.name}}</p>
        <p>{{thing.description}}</p>
    </div>
</div>
```

It's also possible to use the expandable element and handle inside an `ng-repeat` as well. Example:

```html
<div ng-repeat="element in myExpandableElements">
    <h2 id="{{element.id}}Handle">My Header</h2>
    <div expandable handle="{{element.id}}Handle">
        <h2>{{element.title}}</h2>
        <div>
           {{element.content}}
        </div>
    </div>
</div>
```

## Future Releases
There are features planned for the future roadmap, not limited to the following list:
- Add option to display expand/collapse icon with choices, eg: Chevron, Plus/Minus etc.
- Add default styling to expandable elements/headers
- Allow for animations without `ngAnimate` 

## Boring License Stuff
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.