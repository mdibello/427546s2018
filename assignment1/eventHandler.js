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

  function linearGeneration(points, pt2) {
    if (pt2[0] < points[0]) {
      [points[0], pt2[0]] = [pt2[0], points[0]];
      [points[1], pt2[1]] = [pt2[1], points[1]];
    }
    var m = (pt2[1] - points[1]) / (pt2[0] - points[0]);
    var b = pt2[1] - (m * pt2[0]);
    for (var i = points[0]; i < pt2[0]; i+=0.01) {
      points.push(i);
      points.push(points[points.length - 2]);
      var actualPoint = (m * i) + b;
      if (Math.abs(actualPoint - points[points.length - 1]) >
          Math.abs(actualPoint - (points[points.length - 1] + 0.01))) {
            points[points.length - 1] += 0.01;
      }
    }
    points.push(pt2[0]);
    points.push(pt2[1]);
    return points;
  }

  function pixelize(points) {
    positions = [];
    for (var i = 0; i < points.length; i+=2) {
      x = points[i];
      y = points[i+1];
      x1 = x + 0.01;
      y1 = y + 0.01;
      positions = positions.concat([x1, y1, x, y1, x1, y, x, y]);
    }
    return positions;
  }
      
  function constructLine() {
    var x1 = currentPoints[2];
    var y1 = currentPoints[5];
    var x2 = currentPoints[10];
    var y2 = currentPoints[13];
    var m = (y2 - y1) / (x2 - x1);
    var b = y2 - (m * x2);
    var points = [];
    if (m > 0) {
      if (m > 1) {
        [x1, y1] = [y1, x1];
        [x2, y2] = [y2, x2];
        points = linearGeneration([x1, y1], [x2, y2]);
        for (var i = 0; i < points.length; i+=2) {
          [points[i], points[i+1]] = [points[i+1], points[i]];
        }
      }
      else {
        points = linearGeneration([x1, y1], [x2, y2]);
      }
    }
    else {
      if (m < -1) {
        [x1, y1] = [-y1, x1];
        [x2, y2] = [-y2, x2];
        points = linearGeneration([x1, y1], [x2, y2]);
        for (var i = 0; i < points.length; i+=2) {
          [points[i], points[i+1]] = [points[i+1], -points[i]];
        }
      }
      else {
        [x1, y1] = [-x1, y1];
        [x2, y2] = [-x2, y2];
        points = linearGeneration([x1, y1], [x2, y2]);
        for (var i = 0; i < points.length; i+=2) {
          points[i] *= -1;
        }
      }
    }
    positions = pixelize(points);
    currentPoints = [];
    draw(currentView, positions);
  }

  function constructRect() {
    var x1 = currentPoints[2];
    var y1 = currentPoints[5];
    var x2 = currentPoints[10];
    var y2 = currentPoints[13];
    var points = [];
    points = points.concat(linearGeneration([y1, x1], [y2, x1]));
    points = points.concat(linearGeneration([y2, x2], [y1, x2]));
    for (var i = 0; i < points.length; i+=2) {
      [points[i], points[i+1]] = [points[i+1], points[i]];
    }
    points = points.concat(linearGeneration([x1, y2], [x2, y2]));
    points = points.concat(linearGeneration([x2, y1], [x1, y1]));
    positions = pixelize(points);
    currentPoints = [];
    draw(currentView, positions);
  }

  function addCurrentPoint(elmt, evnt) {
    var rect = elmt.getBoundingClientRect();
    var x = evnt.clientX - rect.left;
    var y = evnt.clientY - rect.top;
    currentPoints = currentPoints.concat(pixelsToCoord([x, y]));
  }

  document.getElementById('canvas-line').onclick = function(event) {
    addCurrentPoint(this, event);
    if (currentPoints.length == 16) {
      constructLine();
    }
    else {
      draw(currentView, currentPoints);
    }
  }

  document.getElementById('canvas-circle').onclick = function(event) {
    addCurrentPoint(this, event);
    if (currentPoints.length == 16) {
      constructCircle();
    }
    else {
      draw(currentView, currentPoints);
    }
  }

  document.getElementById('canvas-ellipse').onclick = function(event) {
    addCurrentPoint(this, event);
    if (currentPoints.length == 24) {
      constructEllipse();
    }
    else {
      draw(currentView, currentPoints);
    }
  }

  document.getElementById('canvas-rect').onclick = function(event) {
    addCurrentPoint(this, event);
    if (currentPoints.length == 16) {
      constructRect();
    }
    else {
      draw(currentView, currentPoints);
    }
  }

  document.getElementById('canvas-polygon').onclick = function(event) {
    addCurrentPoint(this, event);
    draw(currentView, currentPoints);
  }

  document.getElementById('canvas-polyline').onclick = function(event) {
    addCurrentPoint(this, event);
    draw(currentView, currentPoints);
  }

  var clears = document.querySelectorAll('#clear');
  for (var i = 0; i < clears.length; i++) {
    clears[i].onclick = function() {
      currentPoints = [];
      draw(currentView, currentPoints);
    }
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
