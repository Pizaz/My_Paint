  tool = "pencil";
 var canvas, ctx,
  brush = {
    x: 0,
    y: 0,
    color: '#000000',
    size: 10,
    down: false,
  },
  strokes = [],
  currentStroke = null;

function redraw () {
  ctx.clearRect(0, 0, canvas.width(), canvas.height());
  ctx.lineCap = "round";
  for (var i = 0; i < strokes.length; i++) {
    var s = strokes[i];
    ctx.strokeStyle = s.color;
    ctx.lineWidth = s.size;
    ctx.beginPath();
    ctx.moveTo(s.points[0].x, s.points[0].y);
    for (var j = 0; j < s.points.length; j++) {
      var p = s.points[j];
      ctx.lineTo(p.x, p.y);
    }
    ctx.stroke();
  }
}

function init () {
  canvas = $('#draw');
  canvas.attr({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  ctx = canvas[0].getContext('2d');

  function mouseEvent (e) {
    brush.x = e.pageX;
    brush.y = e.pageY;

    currentStroke.points.push({
      x: brush.x,
      y: brush.y,
    });
    if(tool == "pencil"){
    redraw();
  }
  }

  canvas.mousedown(function (e) {
    brush.down = true;

    currentStroke = {
      color: brush.color,
      size: brush.size,
      points: [],
    };



    $("#rect-btn").click(function(event){
      tool = "rectangle";
    });

    $("#draw").click(function(event){
      ctx.beginPath();
      if(tool == "rectangle"){
        currentStroke != null;
        ctx.rect(brush.x, brush.y, 200, 200);
        ctx.stroke();
        ctx.closePath();
      }
    });


    $("#rect-filled-btn").click(function(event){
      tool = "rectangle2";
    });

    $("#draw").click(function(){
      ctx.beginPath();
      if(tool == "rectangle2"){
        currentStroke != null;
        ctx.rect(brush.x,brush.y, 200, 200)
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }
    });

    $("#circle-btn").click(function(event){
      tool = "circle1";
    });

    $("#draw").click(function(){
      ctx.beginPath();
      if(tool == "circle1"){
        currentStroke != null;
        ctx.arc(brush.x, brush.y, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
      }
    });

    $("#circle-filled-btn").click(function(event){
      tool = "circle2";
    });

    $("#draw").click(function(){
        ctx.beginPath();
      if(tool == "circle2"){
        currentStroke != null;
        ctx.arc(brush.x, brush.y, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
      }
    });

    strokes.push(currentStroke);

    mouseEvent(e);
  }).mouseup(function (e) {
    brush.down = false;

    mouseEvent(e);

    currentStroke = null;
  }).mousemove(function (e) {
    if (brush.down)
      mouseEvent(e);
  });

  $('#save-btn').click(function () {
    window.open(canvas[0].toDataURL());
  });

  $('#undo-btn').click(function () {
    strokes.pop();
    redraw();
  });

  $('#clear-btn').click(function () {
    strokes = [];
    redraw();
  });

  $("#pencil-btn").click(function(){
     brush.color = "black";
  });

  $('#color-picker').on('input', function() {
    brush.color = this.value;
  });

  $('#brush-size').on('input', function() {
    brush.size = this.value;
  });

  $("#eraser-btn").click(function(){
     brush.color = "white";
  });




}

$(init);
