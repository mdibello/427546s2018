window.onload = function() {
  views = ['line', 'circle', 'ellipse', 'rect', 'polygon', 'polyline'];
  currentPoints = [];
  currentView = 'line';

  canvas = document.getElementById('canvas-' + currentView);
  canvasWidth  = canvas.getAttribute('width');
  canvasHeight = canvas.getAttribute('height');

  switchTo(currentView);

  pixelsPerCoord = Math.min(canvasWidth, canvasHeight) / 2;

  function pixelsToCoord(c) {
    if (c[0] > (canvasWidth/2)) {
      x = (c[0] % (canvasWidth/2.0)) / pixelsPerCoord;
    }
    else {
      x = ((c[0] % (canvasWidth/2.0)) / pixelsPerCoord) + (-1 * (canvasWidth/2) / pixelsPerCoord);
    }
    if (c[1] > (canvasHeight/2.0)) {
      y = (c[1] % (canvasHeight/2.0)) / (-1 * pixelsPerCoord);
    }
    else {
      y = ((canvasHeight/2.0) - c[1]) / pixelsPerCoord;
    }
    x1 = x + 0.01;
    y1 = y + 0.01;
    return [x1, y1, x, y1, x1, y, x, y];
  }

  function switchTo(view) {
    currentPoints = [];
    currentView = view;
    for (var i = 0; i < views.length; i++) {
      if (view.localeCompare(views[i]) == 0) {
        document.getElementById('tab-' + views[i]).classList.add('active');
        document.getElementById('div-' + views[i]).style['display'] = 'inline-block';
        draw(view, currentPoints);
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
    currentPoints = currentPoints.concat(pixelsToCoord([x, y]));
    if (currentView.localeCompare('line') == 0 && currentPoints.length == 16) {
      constructLine();
    }
    else if (currentView.localeCompare('circle') == 0 && currentPoints.length == 16) {
      constructCircle();
    }
    else if (currentView.localeCompare('ellipse') == 0 && currentPoints.length == 24) {
      constructEllipse();
    }
    else if (currentView.localeCompare('rect') == 0 && currentPoints.length == 16) {
      constructRect();
    }
    else {
      console.log(currentPoints);
      draw(currentView, currentPoints);
    }
  }

  function constructLine() {
    // Build a line
  }

  $('#clear').click(function() {
    currentPoints = [];
    draw(currentView, currentPoints);
  })

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

