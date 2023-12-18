const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

function myfunc($scope) {
    $scope.giohang = [];
    $scope.dssp = [
        {
            id: 1,
            name: 'kẹo',
            gia: 5000,
            mota: 'day la banh'
        },
        {
            id: 2,
            name: 'bánh',
            gia: 10000,
            mota: 'day la keo'
        }
    ];
}
var app = angular.module("myapp", ['ngRoute']);
app.controller('myctrl', myfunc);
app.controller('homeCtrl', function ($scope) {
    $scope.name = 'Dao ne'
    this.name = 'bun ngu qua'

    $scope.mua = function (sp) {
        var chuaCo = true;
        for (const item of $scope.$parent.giohang) {
            if (item.id == sp.id) {
                //th1 : da co sp trong gio hang
                item.soluong++;
                chuaCo = false;
                break;
            }
        }
        //th2 : chua co sp trong gio hang
        if (chuaCo) {
            sp.soluong = 1;
            $scope.$parent.giohang.push(sp);
        }


    }
})
app.controller('aboutCtrl', function ($scope) {
    $scope.name = 'Xin chao'
});
app.controller('cardCtrl', function ($scope) {
    $scope.tinhTongtien = function () {
        var tong = 0;
        for (const item of $scope.$parent.giohang) {
            tong = tong + item.gia * item.soluong;
        }
        return tong;
    };
    $scope.xoahet = function () {
        $scope.$parent.giohang = [];
    };
    $scope.xoa = function (id) {
        //   $scope.$parent.giohang = $scope.$parent.giohang.splice(i,1);
        $scope.$parent.giohang = $scope.$parent.giohang.filter(sp => sp.id != id);
    };
});
app.controller('detailCtrl', function ($scope, $routeParams) {
    var id = $routeParams.id;
    //    $scope.sanpham = $scope.$parent.dssp.filter(sp => sp.id == id)[0];
    for (const item of $scope.$parent.dssp) {
        if (item.id == id) {
            $scope.sanpham = item;
        }
    }
});
app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'home.html?'+ Math.random(),
            controller: 'homeCtrl',
            controllerAs: 'home'
        })
        .when('/about', {
            templateUrl: 'about.html?'+ Math.random(),
            controller: 'aboutCtrl'
        })
        .when('/cart', {
            templateUrl: 'cart.html',
            controller: 'cardCtrl'
        })
        .when('/detail/:id', {
            templateUrl: 'detail.html',
            controller: 'detailCtrl'
        })
        .otherwise({
            templateUrl: '404.html'
        })
});
app.run(function($rootScope){
    $rootScope.$on('$routeChangeStart',function(){
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess',function(){
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError',function(){
        $rootScope.loading = false;
        alert('Loi !');
    });
});

