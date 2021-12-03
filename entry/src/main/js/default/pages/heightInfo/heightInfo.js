import router from '@system.router'
import app from '@system.app'
import storage from '@system.storage';

export default {
    data: {
        height: 170
    },

    increaseHeight(){
        if(this.height < 250){
            this.height ++;
        }else{
            this.height = 250;
        }
    },

    decreaseHeight(){
        if(this.height > 50){
            this.height --;
        }else{
            this.height = 50;
        }
    },

    goNextPage(){
        storage.set({
            key: 'height',
            value: this.height.toString(),
            success: function() {
                console.info('call storage.set height success.');
                router.replace({
                    uri: 'pages/weightInfo/weightInfo'
                });
            },
            fail: function(data, code) {
                console.info('call storage.set height fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    touchMove(e){  // Handle the swipe event.
        if(e.direction == "right") { // Swipe right to exit.
            router.replace({
                uri: 'pages/ageInfo/ageInfo'
            })
        }
    },
    appExit(){  // Exit the application.
        app.terminate();
    }
}
