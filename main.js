prediction_1 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier 
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/6Ds_eaVtN/model.json", modelLoaded);

//define function modelLoaded
function modelLoaded()
{
    console.log("Model has successfully loaded!");
}

//define function check() 
function check()
{
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResults);
}

//define function gotResult(error, results)
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("update_status").innerHTML = results[0].label;
        if(results[0].label == "Proper")
        {
            document.getElementById("update_emoji").innerHTML = "&#x1F637";
        }
        else
        {
            document.getElementById("update_emoji").innerHTML = "&#x26d4";
        }
    }
}