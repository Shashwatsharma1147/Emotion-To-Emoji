link = "https://teachablemachine.withgoogle.com/models/ygGRAq1fu/model.json";
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src=" + data_uri + ">";

    });
}

prediction_1 = "";
prediction_2 = "";

console.log("ml5 version=" + ml5.version);

classifier = ml5.imageClassifier(link, modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakdata1 = "The first prediction is " + prediction_1;
    speakdata2 = "and The second prediction is " + prediction_2;
    console.log(speakdata1+speakdata2);
    var utterthis = new SpeechSynthesisUtterance(speakdata1 + speakdata2);
    console.log("utter this ="+utterthis.text);
    synth.speak(utterthis);
}


function check(){
img = document.getElementById("captured_image");
classifier.classify(img,getResult);
}

function getResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        document.getElementById("result_emotion_name").innerHTML = prediction_1;
        document.getElementById("result_emotion_name1").innerHTML = prediction_2;
        speak();
        if(prediction_1 =="Happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522";
        }
        else if(prediction_1 =="Sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532";
        }
        else if(prediction_1 =="Angry"){
            document.getElementById("update_emoji").innerHTML = "&#128548";
        }
        if(prediction_2 =="Happy"){
            document.getElementById("update_emoji1").innerHTML = "&#128522";
        }
        else if(prediction_2 =="Sad"){
            document.getElementById("update_emoji1").innerHTML = "&#128532";
        }
        else if(prediction_2 =="Angry"){
            document.getElementById("update_emoji1").innerHTML = "&#128548";
        }
    }
}
