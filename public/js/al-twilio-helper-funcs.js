function changeState(state) {
    console.log("trying to change state to state " + state);
    var activitySid = WAd66cf5b6af64709c0ca3cf2734c56662;
    switch (state) {
        case "Idle":
            activitySid = WAd66cf5b6af64709c0ca3cf2734c56662;
            break;
        case "Offline":
            activitySid = WA6e6f917c63efcbc912c2c84f4187f618;
            break;
        case "Busy":
            activitySid = WAf0b881ff45e162bf0b9e3c6ae60d5ee0;
            break;
    }
    console.log(activitySid);
    worker.update("ActivitySid", activitySid, function(error, worker) {
        if (error) {
            console.log(error.code);
            console.log(error.message);
        } else {
            console.log(worker.activityName); // "Offline"
        }
    });
}

function sendSMS(from, to, sid, body) {
    $.ajax({
        url: 'sendSMS',
        data: { 'from': from, 'to': to, 'sid': sid, 'body': body },
        type: 'get',
        success: function(output) {
            console.log("SMS sent OK");

        }
    });
}

function updateCapacity(number, workerSid) {
    $.ajax({
        url: 'updateCapacity',
        data: { 'capacity': number, 'workerSid': workerSid },
        type: 'get',
        success: function(output) {
            console.log("received OK from request to update capacity");

        }
    });
}

function acceptTask(tasksid, reservationsid, channel) {
    $.ajax({
        url: 'acceptTask',
        data: { 'tasksid': tasksid, 'reservationsid': reservationsid, 'channel':channel },
        type: 'get',
        success: function(output) {
            console.log("received OK to accept task" + output);

        }
    });
}

function completeTask(sid) {
    console.log("completing task");
    $.ajax({
        url: 'completeTask',
        data: { 'sid': sid },
        type: 'get',
        success: function(output) {
            console.log("task completed OK");

        }
    });
    //used to do firebase update here but moved server side for security
    //myFirebase.child(sid).remove();
    var element = $("#taskDiv" + sid);
    element.fadeOut(function() {
        element.remove();
    });
}

function setVolumes(inputVolume, outputVolume) {
  micIndicator.setVolume(inputVolume);
  speakerIndicator.setVolume(outputVolume);
}
