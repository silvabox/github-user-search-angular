githubUserSearch.controller('GitUserSearchController', function($scope, $resource) {
  var self = this;
  var searchResource = $resource('https://api.github.com/search/users');

  $scope.doSearch = function() {
    this.searchResult = searchResource.get({
      q: $scope.searchTerm,
      access_token: '1594ef07cb23e373bf5edd4d5b637bb2242978aa'
    })
  };
});