'use strict';

StockItemsController.$inject = ['$scope', 'angThirdParty'];
function StockItemsController($scope, angThirdParty) {

	angThirdParty.then(function(stockData){
		$scope.stockItems = stockData;
	});

	$scope.receiptItems = [];

	$scope.addItemInReceipt = function(selectedItem){
		_.each($scope.stockItems, function(item){
			if(item.id == selectedItem.id)
				{
					item.qty -=1;
					$scope.checkItemAvailability(item);
				} 
		});

			var receiptItem = _.findWhere($scope.receiptItems, {
				id: selectedItem.id
			});

			if(!_.isUndefined(receiptItem)){
				if(receiptItem.id == selectedItem.id)
				receiptItem.qty +=1;
			}
			else{
				$scope.receiptItems.push({
					id: selectedItem.id,
					name: selectedItem.name,
					qty: 1,
					price: selectedItem.price
				});
			}
			calculateTotalPrice();
	}

	$scope.removeItemFromReceipt = function(itemId){
		_.each($scope.receiptItems, function(item){
			if(item.id == itemId)
				 item.qty -=1;
		});

		_.each($scope.stockItems, function(item){
			if(item.id == itemId){
				item.qty +=1;
				$scope.checkItemAvailability();
			}
		});
		calculateTotalPrice();
	}

	$scope.deleteItemFromReceipt = function(index){
		$scope.receiptItems.splice(index, 1);
	}
	
	$scope.checkItemAvailability = function(item){
		_.each($scope.stockItems, function(item){
			var receiptItem = _.findWhere($scope.receiptItems, {
				id: item.id
			});
			if(!_.isUndefined(receiptItem))
				if(item.qty == 0){
					receiptItem.outOfStock = true;
				}
				else{
					receiptItem.outOfStock = false;
				}
		});
	}

	function calculateTotalPrice(){
		$scope.totalPrice = 0;
		_.each($scope.receiptItems, function(item){
			$scope.totalPrice += (item.price*item.qty);
		});
	}
}

angular.module('stockItems').controller('StockItemsController', StockItemsController);