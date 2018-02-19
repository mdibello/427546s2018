window.onload = function() {
  canvasWidth  = Math.trunc($(window).width() * (2.0/3.0));
  canvasHeight = Math.trunc($(window).height() * (2.0/3.0));

  views = ['line', 'circle', 'ellipse', 'rect', 'polygon', 'polyline'];
  currentPoints = [];
  currentView = 'line';

  switchTo('line');

  // for (var i = 0; i < views.length; i++) {
  //   var canvas = document.getElementById('canvas-' + views[i]);
  //   canvas.setAttribute('width',  canvasWidth);
  //   canvas.setAttribute('height', canvasHeight);
  // }

  pixelsPerCoord = Math.min(canvasWidth, canvasHeight) / 2;
  function pixelsToCoord(c) {
    return [(c[0] - (canvasWidth/2))  / pixelsPerCoord,
            ((canvasHeight/2) - c[1]) / pixelsPerCoord];
  }

  function switchTo(view) {
    for (var i = 0; i < views.length; i++) {
      if (view.localeCompare(views[i]) == 0) {
        document.getElementById('tab-' + views[i]).classList.add('active');
        document.getElementById('div-' + views[i]).style['display'] = 'inline-block';
        draw(view);
      }
      else {
        document.getElementById('tab-' + views[i]).classList.remove('active');
        document.getElementById('div-' + views[i]).style['display'] = 'none';
      }
    }
  }

  document.getElementById('canvas-' + currentView).onclick = function(event) {
    var rect = this.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    currentPoints.push(pixelsToCoord([x, y]));
    if (currentView.localeCompare('line') == 0 && currentPoints.length == 2) {
      constructLine();
    }
    else if (currentView.localeCompare('circle') == 0 && currentPoints.length == 2) {
      constructCircle();
    }
    else if (currentView.localeCompare('ellipse') == 0 && currentPoints.length == 3) {
      constructEllipse();
    }
    else if (currentView.localeCompare('rect') == 0 && currentPoints.length == 2) {
      constructRect();
    }
    else {
      // draw all current points
    }
    //alert("x: " + x + " y: " + y);
    //alert(pixelsToCoord([x,y]));
  }

  function constructLine() {
    //
  }

  $('#tab-line').click(function() {
    switchTo('line');
    return false;
  })
  $('#tab-circle').click(function() {
    switchTo('circle');
    return false;
  })
  $('#tab-ellipse').click(function() {
    switchTo('ellipse');
    return false;
  })
  $('#tab-rect').click(function() {
    switchTo('rect');
    return false;
  })
  $('#tab-polygon').click(function() {
    switchTo('polygon');
    return false;
  })
  $('#tab-polyline').click(function() {
    switchTo('polyline');
    return false;
  })
}

