angular.module('stockItems', ['angular.third.party.module']).config(function(angThirdPartyProvider){
	angThirdPartyProvider.changeTimeout(250);
});