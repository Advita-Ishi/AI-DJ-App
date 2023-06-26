function setup() {
    canvas = createCanvas(400, 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
image(video, 0, 0, 400, 400);

    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWrist= Number(leftWristY);
        removeDecimals = floor(InNumberleftWrist);
        volume = removeDecimals/500;
        document.getElementById('volume_button').innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    
}

song = " ";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);

}

function modelLoaded() {
    console.log('Model is initialised');
}

function gotPoses (results) {
if(results.length > 0) {
    console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX + " " + "leftWristY = " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + " " + "rightWristY = " + rightWristY);

    scoreLeftWrist = results[0].pose.keypoints[9].score;
}
}