import router from '@system.router'
import app from '@system.app'
import storage from '@system.storage';

export default {
    data: {
        age: 28
    },

    increase(){
        if(this.age < 100){
            this.age ++;
        }else{
            this.age = 100;
        }
    },

    decrease(){
        if(this.age > 1){
            this.age --;
        }else{
            this.age = 1;
        }
    },

    goNextPage(){
        storage.set({
            key: 'age',
            value: this.age.toString(),
            success: function() {
                console.info('call storage.set age success.');
                router.replace({
                    uri: 'pages/heightInfo/heightInfo'
                });
            },
            fail: function(data, code) {
                console.info('call storage.set age fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    touchMove(e){  // Handle the swipe event.
        if(e.direction == "right") { // Swipe right to exit.
            router.replace({
                uri: 'pages/genderInfo/genderInfo'
            })
        }
    },
    appExit(){  // Exit the application.
        app.terminate();
    }
}
