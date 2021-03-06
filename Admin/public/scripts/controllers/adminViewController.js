emilyApp.controller('AdminViewController', ["$scope", "$http", "VolunteerFactory",
function($scope, $http, VolunteerFactory) {

  $scope.questionToEdit = false;

  var getAdmins = function() {
    $http.get('/private/adminview/alladmins')
      .then(function(response){
        $scope.adminArray = response.data;
      });
  };

  $scope.removeAdmin = function(id) {
    var removalHTTP = '/private/adminview/deleteadmin/' + id;
    $http.delete(removalHTTP).then(getAdmins);
  };

  $scope.addAdmin = function() {
    var addHTTP = '/private/adminview/addadmin/' + $scope.inputEmail;
    $http.post(addHTTP).then(getAdmins);
  };

  var getSkills = function() {
    $http.get('/private/adminview/allskills')
      .then(function(response){
        $scope.skillArray = response.data;
      });
  };

  $scope.addSkill = function() {
    var addHTTP = '/private/adminview/addskill/' + encodeURIComponent($scope.inputSkill);
    $http.post(addHTTP).then(getSkills);
  };

  $scope.switchSkill = function(id, used) {
    var switchHTTP = '/private/adminview/switchskill/' + id + '/' + used;
    $http.put(switchHTTP).then(getSkills);
  };

  var getInterests = function() {
    $http.get('/private/adminview/allinterests')
      .then(function(response){
        $scope.interestArray = response.data;
      });
  };

  $scope.addInterest = function() {
    var addHTTP = '/private/adminview/addinterest/' + encodeURIComponent($scope.inputInterest);
    $http.post(addHTTP).then(getInterests);
  };

  $scope.switchInterest = function(id, used) {
    var switchHTTP = '/private/adminview/switchinterest/' + id + '/' + used;
    $http.put(switchHTTP).then(getInterests);
  };

  var getEssayQs = function() {
    $http.get('/private/adminview/allessayqs')
      .then(function(response){
        $scope.essayqObject = response.data;
      });
  };

  $scope.modifyQuestionButton = function(index){
    $scope.questionToEdit = index;
    var placeholder = $scope.essayqObject[index];
    $scope.inputEssayQ = placeholder;
  };

  $scope.saveQuestion = function(index, text){
    var putHTTP = '/private/adminview/changeessayq/' + index;
    var sendObject = {questionText: text};
    $http.put(putHTTP, sendObject).then(getEssayQs);
    $scope.questionToEdit = false;
    getEssayQs();
  };

  $scope.cancelQuestion = function() {
    $scope.questionToEdit = false;
  };

  getEssayQs();
  getInterests();
  getSkills();
  getAdmins();
}]);
