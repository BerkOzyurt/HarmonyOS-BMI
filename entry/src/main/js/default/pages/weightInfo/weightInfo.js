import router from '@system.router'
import app from '@system.app'
import storage from '@system.storage';

export default {
    data: {
        weight: 70
    },

    increaseWeight(){
        if(this.weight < 200){
            this.weight ++;
        }else{
            this.weight = 200;
        }
    },

    decreaseWeight(){
        if(this.weight > 30){
            this.weight --;
        }else{
            this.weight = 30;
        }
    },

    goNextPage(){
        storage.set({
            key: 'weight',
            value: this.weight.toString(),
            success: function() {
                console.info('call storage.set weight success.');
                router.replace({
                    uri: 'pages/resultPage/resultPage'
                });
            },
            fail: function(data, code) {
                console.info('call storage.set weight fail, code: ' + code + ', data: ' + data);
            },
        });
    },

    touchMove(e){  // Handle the swipe event.
        if(e.direction == "right") { // Swipe right to exit.
            router.replace({
                uri: 'pages/heightInfo/heightInfo'
            })
        }
    },
    appExit(){  // Exit the application.
        app.terminate();
    }
}
