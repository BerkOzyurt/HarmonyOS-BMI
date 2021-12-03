import utils from '../../common/utils.js';
import sensor from '@system.sensor';
import device from '@system.device';

export default {

    data: {
        showMessage: false,
        brand: '--',
        product: '--',
        heartBeatCount:'--',
        message:'',
        timer: "00:00:30"
    },

    onInit() {
        // call step count API
        let _this = this;
        // to listen the sensor wearing state, returns true if wear is in wrist
        sensor.subscribeOnBodyState({
            success: function(response) {
                console.log('get on-body state value:' + response.value);
                if(response.value === true) {
                    _this.getHeartBeatCount();
                }
            },
            fail: function(data, code) {
                console.log('fail to get on body state, code:' + code + ', data: ' + data);
            },
        });

        device.getInfo({
            success: function(data) {
                console.log('success get device info brand:' + data.brand);
                _this.brand = data.brand;
                _this.product = data.product;
            },
            fail: function(data, code) {
                console.log('fail get device info code:'+ code + ', data: ' + data);
            },
        });

    },

    getHeartBeatCount() {
        let _this = this;
        sensor.subscribeHeartRate({
            success: function(response) {
                console.log('get heartrate value:' + response.heartRate);
                _this.heartBeatCount = response.heartRate + ' BPM';
            },
            fail: function(data, code) {
                console.log('subscribe heart rate fail, code: ' + code + ', data: ' + data);
            },
        });
    },
    touchMove(e){  // Handle the swipe event.
        if(e.direction == "right")  // Swipe right to exit.
        {
            utils.backToHome();
        }
    },

    send() {
        let message = `Heart rate is ${this.heartBeatCount}`;
        this.client.send(message);
    },

    onDestroy() {
        sensor.unsubscribeHeartRate();
    }

}
