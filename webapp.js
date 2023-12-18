var app = angular.module("app", ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
       .when('/index', {
        templateUrl: 'moduleHome.html?'+ Math.random(),
        controller: 'homeCtrl',
        controllerAs: 'home'
    })
    .when('/detail', {
        templateUrl: 'detail.html?'+ Math.random(),
        controller: 'detailCtrl'
    })
       .when('/detailproduct', {
        templateUrl: 'detailproduct.html?'+ Math.random(),
        controller: 'dtpCtrl'
    })
    .when('/cart', {
        templateUrl: 'cart1.html?'+ Math.random(),
        controller: 'cartCtrl',
     
    })
    .otherwise({
       templateUrl: 'moduleHome.html?'+ Math.random(),
    })


    
});
app.run(['$anchorScroll', '$rootScope', function($anchorScroll, $rootScope) {
    $anchorScroll.yOffset = 0;

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        // Thiết lập lại vị trí cuộn trang khi chuyển trang
        $anchorScroll();
    });
}]);


app.controller("detailCtrl",function($scope,$rootScope,$http){
    $rootScope.jeans=[];
    $rootScope.blazers=[];
    $rootScope.shoes=[];


    $http.get('jean.json').then(function(response) {
        $rootScope.jeans = response.data;
    });
    $http.get('blazer.json').then(function(response) {
        $rootScope.blazers = response.data;
    });
    $http.get('shoes.json').then(function(response) {
        $rootScope.shoes = response.data;
    });
    $rootScope.selectedProduct={};
    $scope.showProductDetail = function(product) {
        $rootScope.selectedProduct = product;
console.log( $rootScope.selectedProduct.size);

    };

});

app.controller("dtpCtrl", function($scope, $rootScope,$timeout,$anchorScroll){
    // $scope.selectedProduct = $rootScope.selectedProduct;
    // $scope.selectSz = null;
    $anchorScroll();

    $timeout(function () {
        const imgClickImages = document.querySelectorAll('.img-click img');
        const carousel = document.getElementById('carouselExampleControls');
        let carouselInstance = null;

        if (carousel) {
            carouselInstance = new bootstrap.Carousel(carousel);
        }

        imgClickImages.forEach((img) => {
            img.addEventListener('click', function () {
                const index = parseInt(img.getAttribute('data-index'));

                if (carouselInstance && carouselInstance._isSliding === false) {
                    carouselInstance.to(index);
                }

                img.focus();
            });
        });
    });

    $scope.themGh = function() {
        if ($scope.size && $scope.qty) {
            if (!$rootScope.spGh) {
                $rootScope.spGh = [];
            }
    
            // Tạo một bản sao của selectedProduct để tránh thay đổi tham chiếu
            var newItem = angular.copy($scope.selectedProduct);
            newItem.size = $scope.size;
            newItem.qty = $scope.qty;
    
            $rootScope.spGh.push(newItem);
    
            var liveToast = new bootstrap.Toast(document.getElementById('liveToast'));
            liveToast.show();

        } else {
            alert('Vui lòng chọn size và số lượng trước khi thêm vào giỏ hàng.');
        }
        
    };
    
  

  
});
app.filter('removeVND', function() {
    return function(input) {
        return input.replace('VND', '');
    };
});

app.controller("cartCtrl",function($scope,$rootScope){

    if (!$rootScope.spGh) {
        $rootScope.spGh = [];
    }
    $scope.tinhTongCong= function() {
        var sum = 0;
        for (var i = 0; i < $rootScope.spGh.length; i++) {
            sum += $rootScope.spGh[i].gia * $rootScope.spGh[i].qty;
        }
        $scope.tongcong = sum;
    };
    $scope.tinhTongCong();
    $scope.addCart = function(product) {
        $scope.spGh.push(angular.copy(product));
        console.log("Độ dài khi thêm: " + $scope.spGh.length);
        $scope.tinhTongCong();
    };

    $scope.xoa = function(index) {
        $scope.spGh.splice(index, 1);
        console.log("Độ dài khi xoá: " + $scope.spGh.length);
        $scope.tinhTongCong();


    }

    
})






