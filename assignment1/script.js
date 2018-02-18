window.onload = function() {
    canvas = document.getElementById("canvas-line");

    try {
        gl = canvas.getContext("webgl");
    } 
    catch (e) {
        alert(e);
        alert("Unable to initialize WebGL");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
};
