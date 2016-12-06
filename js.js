$(document).ready(function() {

    var phase = "Work";
    var minutes = 25;
    var minutesBreak = 5;
    var countdown = minutes * 60;
    // var countdown = 1;
    var minutesDisplay = Math.floor(countdown / 60);
    var secondsDisplay = countdown % 60;
    var myTimer = clearInterval();
    var countdownBarFill = 0;
    var countdownBarWidth = $('#countdownBar').width();
    var startEngaged = 'no';

    function updateDisplay() {
        if (countdown % 60 < 10) {
            secondsDisplay = "0" + countdown % 60;
        }
        else {
            secondsDisplay = countdown % 60;
        }
        if (countdown / 60 < 10) {
            minutesDisplay = "0" + Math.floor(countdown / 60);
        }
        else {
            minutesDisplay = Math.floor(countdown / 60);
        }
        countdownBarFill = Math.floor((1 - (countdown / (minutes * 60))) * countdownBarWidth);
        $('#activityTimer').text(minutesDisplay + ":" + secondsDisplay);
        // $('#countdownBarFill').text(countdownBarFill);
        $('#countdownBarFill').width(countdownBarFill);
    }

    function updateClock() {
        countdown--;
        if (countdown < 0) {
            clearInterval(myTimer);
            countdownBarFill = 0;
            if (phase === 'Work') {
                phase = 'Break';
                countdown = minutesBreak * 60;

                myTimer = setInterval(updateClock, 1000);
            } else if (phase === 'Break') {
                phase = 'Work';
                countdown = minutes * 60;

                myTimer = setInterval(updateClock, 1000);
            }
            $('#currentPhase').text("The Current Phase is " + phase + ".");
            alert("Get Ready for the Next Round.  You are currently set for " + phase + ".");
        } else {
            updateDisplay();
        }
    }

    function updateTimerSetting() {
        $('#timerSetting').text("Work timer set to " + minutes + " minutes.");
    }

    function updateTimerSettingBreak() {
        $('#timerSettingBreak').text("Break timer set to " + minutesBreak + " minutes.");
    }
    $('#addTime').click(function() {
        minutes++;
        countdown = minutes * 60;
        updateTimerSetting();
        updateDisplay();
    });
    $('#decTime').click(function() {
        minutes--;
        countdown = minutes * 60;

        updateTimerSetting();
        updateDisplay();
    });
    $('#addTimeBreak').click(function() {
        minutesBreak++;
        updateTimerSettingBreak();
        updateDisplay();
    });
    $('#decTimeBreak').click(function() {
        minutesBreak--;

        updateTimerSettingBreak();
        updateDisplay();
    });
    $('#startTimer').click(function() {
        if (startEngaged === 'no') {

            startEngaged = 'yes';
        myTimer = setInterval(updateClock, 1000);
        }
    });
    $('#stopTimer').click(function() {
        clearInterval(myTimer);
        startEngaged = 'no';
    });
    $('#settings').click(function() {
        $('.settings').slideToggle(250);
    });

    // Initialize App
    updateDisplay();
    updateTimerSetting();
    updateTimerSettingBreak();
    $('.settings').hide();
    $('#currentPhase').text("The Current Phase is " + phase + ".");
});
