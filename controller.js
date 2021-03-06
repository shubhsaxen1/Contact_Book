    var app = angular.module('myApp', []);


    app.controller('AppController', ['$scope', '$window', function($scope, $window) {
        var self = this;



        self.deleted = false;

        self.user = {
            id: null,
            fname: '',
            lname: '',
            phone: '',
            email: '',
            status: ''
        };
        self.id = localStorage.getItem('ids');

        self.users = [];

        self.user_temp = localStorage.getItem('users');
        self.user_json = JSON.parse(self.user_temp)
        if (self.user_json == null) {
            self.user_json = []
        }

        self.submit = function() {
            console.log(self.user.id)


            if (self.user.id === null) {

                if (self.id == null) {
                    self.id = 1;
                }

                self.user.id = self.id++;


                self.users = self.user_json;

                console.log('Saving New User', self.user);

                self.users.push(self.user)



                localStorage.setItem('ids', JSON.stringify(self.id));


                localStorage.setItem('users', JSON.stringify(self.users));



            } else {
                console.log(self.user_json.length)
                for (var i = 0; i < self.user_json.length; i++) {

                    if (self.user_json[i].id === self.user.id) {

                        self.user_json[i] = self.user;
                        break;
                    }
                }

                localStorage.setItem('users', JSON.stringify(self.user_json));

            }




            if (confirm("Successfully added !")) {
                $window.location.reload();

            } else {
                $window.location.reload();
            }




            self.reset();
        };

        self.edit = function(ids) {

            for (var i = 0; i < self.user_json.length; i++) {

                if (self.user_json[i].id === ids) {
                    self.user = angular.copy(self.user_json[i]);
                    break;
                }
            }
        }



        self.reset = function() {
            self.user = {
                id: null,
                fname: '',
                lname: '',
                email: '',
                phone: '',
                status: ''
            };

        }

        self.remove = function(ids) {
            console.log('id to be deleted', ids);
            for (var i = 0; i < self.user_json.length; i++) {
                console.log(self.user_json[i].id)
                if (self.user_json[i].id === ids) {
                    self.user_json[i].deleted = true;

                }
            }
            console.log(self.user_json)
            localStorage.setItem('users', JSON.stringify(self.user_json));

        }

    }]);