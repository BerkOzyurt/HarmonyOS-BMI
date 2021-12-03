import router from '@system.router'
import app from '@system.app'
import storage from '@system.storage';

export default {
    data: {
        gender: "ddd"
    },

    setGenderMale(_this){
        this.gender = "Male"
    },

    setGenderFemale(){
        this.gender = "Female"
    },

    goNextPage(){
        storage.set({
            key: 'gender',
            value: this.gender,
            success: function() {
                console.info('call storage.set gender success.');
                router.replace({
                    uri: 'pages/ageInfo/ageInfo'
                });
            },
            fail: function(data, code) {
                console.info('call storage.set gender fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    touchMove(e){  // Handle the swipe event.
        if(e.direction == "right") { // Swipe right to exit.
            router.replace({
                uri: 'pages/index/index'
            })
        }
    },
    appExit(){  // Exit the application.
        app.terminate();
    }
}
