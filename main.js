song1 = "";
song2 = "";
song1_status = "";
song2_status = "";

leftWristY = 0;
leftWristX = 0;
rightWristY = 0;
rightWristX = 0;
leftWristScore = 0;
rightWristScore = 0;

function preload()
{
    song1 = loadSound("b.mp3");
    song2 = loadSound("ptd.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotPoses)
}

function modelloaded()
{
    console.log("Model Loaded!")
}

function draw()
{
    image(video, 0, 0 , 600, 500);
    fill(255, 0, 0);
    stroke(255, 0, 0);

    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    if(leftWristScore > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Cradles"
        }
    }

    if(rightWristScore > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "DNA";
        }
    }
}

function playmon()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function pause()
{
    song1.pause();
    song2.pause();
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        leftWristScore = results[0].pose.keypoints[9].score;
        console.log("leftWristScore = " + leftWristScore);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("rightWristScore = " + rightWristScore);
    }
}