

/**
 * 初始化着色器程序
 * @param {WebGLRenderingContext} gl - WebGL 上下文对象
 * @param {string} vertexShaderSource - 顶点着色器源码
 * @param {string} fragmentShaderSource - 片元着色器源码
 * @returns {WebGLProgram} - 创建的着色器程序对象
 */
export function initShader(gl, vertexShaderSource, fragmentShaderSource) {
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);
  gl.useProgram(program);

  return program;
}