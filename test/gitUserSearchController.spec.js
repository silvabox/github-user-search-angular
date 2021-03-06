describe('GitUserSearchController', function() {
    beforeEach(module('GitUserSearch'));

    var scope, ctrl;

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        ctrl = $controller('GitUserSearchController', {
            $scope: scope
        });
    }));

    it('should initialise with an empty search result and term', function() {
      expect(scope.searchResult).toBeUndefined();
      expect(scope.searchTerm).toBeUndefined();
    });

    describe('when searching for a user', function() {
        var items = [{
            "login": "tansaku",
            "avatar_url": "https://avatars.githubusercontent.com/u/30216?v=3",
            "html_url": "https://github.com/tansaku"
          }, {
            "login": "stephenlloyd",
            "avatar_url": "https://avatars.githubusercontent.com/u/196474?v=3",
            "html_url": "https://github.com/stephenlloyd"
        }];

        var httpBackend;
        
        beforeEach(inject(function($httpBackend) {
            httpBackend = $httpBackend
            httpBackend
              .when("GET", "https://api.github.com/search/users?q=hello" + '&access_token=1594ef07cb23e373bf5edd4d5b637bb2242978aa')
              .respond({
                items: items
              });
        }));

        it('should display search results', function() {
          scope.searchTerm = 'hello';
          scope.doSearch(); 
          scope.$apply();
          httpBackend.flush();
          expect(scope.searchResult.items).toEqual(items);
        });
    });

});
