var color = "#000000";
var size = 4;
var colorPicked = 'black';
var pen = 1;

var canvas = document.getElementById("draw");


var ctx = canvas.getContext("2d");
resize();


function resize() {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
}


window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);


var pos = {
    x: 0,
    y: 0
};


    function setPosition(e) {
        pos.x = e.clientX;
        pos.y = e.clientY;
    }

    function colorChange() {
        colorPicked = arguments[0];
        document.getElementById("PencilIcon").click();
        if(pen == 1)
        {
            color = colorPicked;
        }
    }

    function Pencil() {
        pen = 1;
        color = colorPicked;
        size = 4;
    }

    function Eraser() {
        pen = 0;
        color = "#fafafa";
        size = 25;
    }

    function Clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function draw(e) {
        if (e.buttons !== 1) return;
        ctx.beginPath();

        ctx.lineWidth = size;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;

        ctx.moveTo(pos.x, pos.y);
        setPosition(e);
        ctx.lineTo(pos.x, pos.y);

        ctx.stroke(); 
    }
