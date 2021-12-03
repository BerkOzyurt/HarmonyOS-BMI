import router from '@system.router'
import app from '@system.app'
import file from '@system.file';

export default {
    data: {
        title: '--'
    },

    deleteFile() {
        file.delete({
            uri: 'internal://app/test.txt',
            success: function () {
                console.log('call delete success.');
            },
            fail: function (data, code) {
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    writeText(){
        //var policeQualificationsFemale = "minBmi:18-maxBmi:27-acceptable:True-minFemaleAge:18-maxFemaleAge:24-height:162"
        //var policeQualificationsMale = "minBmi:18-maxBmi:27-acceptable:True-minMaleAge:18-maxMaleAge:26-height:167"

        var policeQualificationsFemale = "18-27-True-18-24-162"
        var policeQualificationsMale = "18-27-True-18-26-167"

        this.writePoliceQualificationsFemale(policeQualificationsFemale, policeQualificationsMale);
        /*var policeQualifications2 = {
            title: 'Police',
            minBmi: '18',
            maxBmi: '27',
            genderOptionFemale: {
                acceptable: 'True',
                minFemaleAge: '18',
                maxFemaleAge: '24',
                height: '162'
            },
            genderOptionMale: {
                acceptable: 'True',
                minFemaleAge: '18',
                maxFemaleAge: '26',
                height: '167'
            }
        };*/

    },

    writePoliceQualificationsFemale(policeQualificationsFemale, policeQualificationsMale){
        var _this = this;
        file.writeText({
            uri: 'internal://app/policeQualificationsFemale.txt',
            text: policeQualificationsFemale,
            success: function () {
                console.log('call writePoliceQualificationsFemaleText success.');
                _this.writePoliceQualificationsMale(policeQualificationsMale);
            },
            fail: function (data, code) {
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    writePoliceQualificationsMale(policeQualificationsMale){
        var _this = this;
        file.writeText({
            uri: 'internal://app/policeQualificationsMale.txt',
            text: policeQualificationsMale,
            //text: JSON.stringify(policeQualifications),
            success: function () {
                console.log('call writePoliceQualificationsMaleText success.');
                router.replace({
                    uri: 'pages/genderInfo/genderInfo'
                });
            },
            fail: function (data, code) {
                console.error('call fail callback fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    touchMove(e){
        if(e.direction == "right") {
            this.appExit();
        }
    },
    appExit(){
        app.terminate();
    }
}
