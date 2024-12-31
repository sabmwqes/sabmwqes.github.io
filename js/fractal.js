const canvas = document.getElementById("fractal");
const gl = canvas.getContext("webgl");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// GLSLフラグメントシェーダー
const fragmentShaderSource = `
precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 uv = 3.0 * (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    float cx = -1.32 + 0.08 * cos(u_time + 3.14);
    float cy = 0.08 * sin(u_time + 3.14);
    vec2 c = vec2(cx, cy);

    vec2 z = uv;
    float iterations = 0.0;

    for (int i = 0; i < 100; i++) {
        if (length(z) > 2.0) break;
        z = vec2(
            z.x * z.x - z.y * z.y + c.x,
            2.0 * z.x * z.y + c.y
        );
        iterations += 1.0;
    }

    float blue = 0.5 * sin(u_time * 3.1) + 1.0;
    float green = 0.5 * cos(u_time * 3.1) + 1.0;
    vec3 color = (iterations - 5.0) * vec3(0.0, green, blue) / 320.0;
    gl_FragColor = vec4(color, 1.0);
}
`;

// GLSL頂点シェーダー（フルスクリーンの四角形を描画）
const vertexShaderSource = `
attribute vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

// シェーダーのコンパイル
function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

// WebGLプログラムのセットアップ
const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
}

gl.useProgram(program);

// 頂点バッファ（フルスクリーンの四角形を描画）
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1, // 左下
    1, -1,  // 右下
    -1,  1, // 左上
    -1,  1, // 左上
    1, -1,  // 右下
    1,  1   // 右上
]), gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "a_position");
gl.enableVertexAttribArray(positionLocation);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// ユニフォームの設定
const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
const timeLocation = gl.getUniformLocation(program, "u_time");

// 描画ループ
function render(time) {
    time *= 0.0001; // 速度

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(timeLocation, time);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
}
render();
