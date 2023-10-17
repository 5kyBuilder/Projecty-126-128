song1 = "";
song2 = "";

function preload()
{
    song1 = loadSound("music1.mp3");
    song2 = loadSound("music2.mp3");

}

current_song = 0;

score_rightwrist = 0;
score_leftwrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup()
{
    canvas = createCanvas(700,500);
    canvas.position(500,200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelReady);
    poseNet.on('pose' , gotPoses);
}

function gotPoses(results, err)
{
   if(results.length > 0)
       {
            console.log(results);
            
            score_rightwrist = results[0].pose.keypoints[10].score;
            score_leftwrist = results[0].pose.keypoints[9].score;
            console.log("score of left wrist: " + score_leftwrist + ", Score of right wrist: " + score_rightwrist);

            rightWristX = results[0].pose.rightWrist.x;
            rightWristY = results[0].pose.rightWrist.y;
            console.log("X: " + rightWristX  + ", Y: " + rightWristY);

            leftWristX = results[0].pose.leftWrist.x;
            leftWristY = results[0].pose.leftWrist.y;
            console.log("X: " + leftWristX  + ", Y: " + leftWristY );
    }else{
        console.error(err);
    }
}

function modelReady()
{
    console.log("model is loaded");
}

function draw()
{
    image(video, 0, 0, 500, 500);

    stroke("black");
    fill("red");

    if((score_rightwrist > .2) && (current_song != 1))
    {
        circle(rightWristX, rightWristY, 20); 

        current_song = 1

        song1.play();
        song1.setVolume(1);
        song1.rate(1); 
        
        stop(song2);
    }

    if((score_leftwrist > .2) && (current_song != 2))
    {   
        circle(leftWristX, leftWristY, 20); 
        current_song = 2

        song2.play();
        song2.setVolume(1);
        song2.rate(1); 

        stop(song1);
    }
}

function stop(song)
{
    song.stop();
}
