import router from '@system.router'
import app from '@system.app'
import file from '@system.file';
import storage from '@system.storage';

export default {
    data: {
        result: '',
        age: 0,
        gender: "null",
        height: 0,
        weight: 0
    },

    deleteFile() {
        var inThis = this;
        file.delete({
            uri: 'internal://app/test.txt',
            success: function () {
                inThis.result = 'Deleted'
                console.log('call delete success.');
            },
            fail: function (data, code) {
                inThis.result = data;
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },


    readText(){
        var _this = this;
        _this.result = 'Now';
        file.readText({
            uri: 'internal://app/test.txt',
            success: function (data) {
                //const obj = JSON.parse(data);
                _this.result = data.text;
                console.log('call readText success: ' + data.text);
            },
            fail: function (data, code) {
                _this.result = data;
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    readPoliceQualificationsFemale(){
        var _this = this;
        file.readText({
            uri: 'internal://app/policeQualificationsFemale.txt',
            success: function (data) {
                console.log('call readText success: ' + data.text);
                const femaleArray = data.text.split("-");
                _this.calculateFemaleQualificationsResult(femaleArray);
            },
            fail: function (data, code) {
                _this.result = data;
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    calculateFemaleQualificationsResult(femaleArray){
        var femaleMinBmi = femaleArray[0];
        var femaleMaxBmi = femaleArray[1];
        var femaleAcceptable = femaleArray[2];
        var minFemaleAge = femaleArray[3];
        var maxFemaleAge = femaleArray[4];
        var femaleHeight = femaleArray[5];

        if(this.age >= minFemaleAge && this.age <= maxFemaleAge){
            if(this.height >= femaleHeight){
                if((this.getBMI(this.weight, this.height)) >= femaleMinBmi && (this.getBMI(this.weight, this.height)) <= femaleMaxBmi){
                    this.result = "You can apply for the police exam."
                }else{
                    this.result = this.result + "BMI is not acceptable."
                }
            }else{
                this.result = this.result + "Height is not acceptable."
            }
        }else{
            this.result = this.result + "Age is not acceptable."
        }
    },

    getBMI(bmiWeight, bmiHeight){
        return (bmiWeight / ((bmiHeight * bmiHeight)/ 10000)).toFixed(2);
    },

    readPoliceQualificationsMale(){
        var _this = this;
        file.readText({
            uri: 'internal://app/policeQualificationsMale.txt',
            success: function (data) {
                console.log('call readText success: ' + data.text);
                const maleArray = data.text.split("-");
                _this.calculateMaleQualificationsResult(maleArray);
            },
            fail: function (data, code) {
                _this.result = data;
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    calculateMaleQualificationsResult(maleArray){
        var maleMinBmi = maleArray[0];
        var maleMaxBmi = maleArray[1];
        var maleAcceptable = maleArray[2];
        var minMaleAge = maleArray[3];
        var maxMaleAge = maleArray[4];
        var maleHeight = maleArray[5];

        if(this.age >= minMaleAge && this.age <= maxMaleAge){
            if(this.height >= maleHeight){
                if((this.getBMI(this.weight, this.height)) >= maleMinBmi && (this.getBMI(this.weight, this.height)) <= maleMaxBmi){
                    this.result = "You can apply for the police exam."
                }else{
                    this.result = this.result + "BMI is not acceptable."
                }
            }else{
                this.result = this.result + "Height is not acceptable."
            }
        }else{
            this.result = this.result + "Age is not acceptable."
        }
    },

    getGender(){
        var _this = this;
        storage.get({
            key: 'gender',
            success: function(data) {
                console.log('call storage.getGender success: ' + data);
                _this.gender = data;
                _this.getAge();
            },
            fail: function(data, code) {
                console.log('call storage.getGender fail, code: ' + code + ', data: ' + data);
                _this.result = data;
            },
            complete: function() {
                console.log('getGender call complete');
            },
        });
    },

    getAge(){
        var _this = this;
        storage.get({
            key: 'age',
            success: function(data) {
                console.log('call storage.getAge success: ' + data);
                _this.age = data;
                _this.getHeight();
            },
            fail: function(data, code) {
                console.log('call storage.getAge fail, code: ' + code + ', data: ' + data);
                _this.result = data;
            },
            complete: function() {
                console.log('getAge call complete');
            },
        });
    },

    getHeight(){
        var _this = this;
        storage.get({
            key: 'height',
            success: function(data) {
                console.log('call storage.getHeight success: ' + data);
                _this.height = data;
                _this.getWeight();
            },
            fail: function(data, code) {
                console.log('call storage.getHeight fail, code: ' + code + ', data: ' + data);
                _this.result = data;
            },
            complete: function() {
                console.log('getHeight call complete');
            },
        });
    },

    getWeight(){
        var _this = this;
        storage.get({
            key: 'weight',
            success: function(data) {
                console.log('call storage.getWeight success: ' + data);
                _this.weight = data;
                if(_this.gender == "Female"){
                    _this.readPoliceQualificationsFemale();
                }else{
                    _this.readPoliceQualificationsMale();
                }
            },
            fail: function(data, code) {
                console.log('call storage.getWeight fail, code: ' + code + ', data: ' + data);
                _this.result = data;
            },
            complete: function() {
                console.log('getWeight call complete');
            },
        });
    },

    touchMove(e){  // Handle the swipe event.
        if(e.direction == "right") { // Swipe right to exit.
            router.replace({
                uri: 'pages/weightInfo/weightInfo'
            })

        }
    },
    appExit(){  // Exit the application.
        app.terminate();
    }
}
