Peter_pan_song="";
Harry_potter_theme_song="";
leftWristx =0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreleftWrist=0;
scorerightWrist=0;
song_Peter_pan = "";
song_Harry_potter_theme = "";

function setup(){
    canvas= createCanvas(500,400);
    canvas.center();
    canvas.position(450,160);
    
    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function preload(){
    Peter_pan_song = loadSound("music2.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,600,530);
    fill("#FF0000");
    stroke("#FF0000");
    song_name = Peter_pan_song.isPlaying();
    console.log(song_Peter_pan);
    song_Harry_potter_theme = Harry_potter_theme_song.isPlaying();
    console.log(song_Harry_potter_theme);

     if(scoreleftWrist > 0.2)
     {
        circle(leftWristx,leftWristy,20);
        Harry_potter_theme_song.stop();
        if(song_Peter_pan == false){
            Peter_pan_song.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }
    if(scorerightWrist > 0.2)
    {
        circle(rightWristx,rightWristy,20);
        Peter_pan_song.stop();
        if(song_Harry_potter_theme == false)
        {
            Harry_potter_theme_song.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}
function modelLoaded(){
    console.log('poseNet is Initialized');
}
function gotPoses(results)
{
    if(results.length > 0){
        console.log(results);
         scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx);
        console.log("leftWristy="+leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx);
        console.log("rightWristy = "+rightWristy);
    }
}

