

/**
 * 初始化着色器程序
 * @param {WebGLRenderingContext} gl - WebGL 上下文对象
 * @param {string} vertexShaderSource - 顶点着色器源码
 * @param {string} fragmentShaderSource - 片元着色器源码
 * @returns {WebGLProgram} - 创建的着色器程序对象
 */
function initShader(gl, vertexShaderSource, fragmentShaderSource) {
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


/**
 * 旋转矩阵
 * @param {number} deg
 * @returns {Float32Array}
 */
const getRotateMatrix = (deg) => {
  const cos = Math.cos(deg)
  const sin = Math.sin(deg)

  return new Float32Array([
      cos,  sin, 0, 0,
     -sin,  cos, 0, 0,
        0,    0, 1, 0,
        0,    0, 0, 1
  ])
}

/**
 * 缩放矩阵
 * @param {number} x=1
 * @param {number} y=1
 * @param {number} z=1
 * @returns {Float32Array}
 */
const getScaleMatrix = (x = 1, y = 1, z = 1) => {
  return new Float32Array([
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  ])
}

/**
 * 平移矩阵
 * @param {number} x=0
 * @param {number} y=0
 * @param {number} z=0
 * @returns {Float32Array}
 */
const getTranslateMatrix = (x = 0, y = 0, z = 0) => {
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    x, y, z, 1
  ])
}


/**
 * 矩阵复合
 * @param {Float32Array} m1
 * @param {Float32Array} m2
 * @returns {Float32Array}
 */
const multiplyMatrix = (m1, m2) => {
  const result = new Float32Array(16)
  
  for (let i = 0; i < 4; i++) {
    result[i] = m1[i] * m2[0] + m1[i + 4] * m2[1] + m1[i + 8] * m2[2] + m1[i + 12] * m2[3]
    result[i + 4] = m1[i] * m2[4] + m1[i + 4] * m2[5] + m1[i + 8] * m2[6] + m1[i + 12] * m2[7]
    result[i + 8] = m1[i] * m2[8] + m1[i + 4] * m2[9] + m1[i + 8] * m2[10] + m1[i + 12] * m2[11]
    result[i + 12] = m1[i] * m2[12] + m1[i + 4] * m2[13] + m1[i + 8] * m2[14] + m1[i + 12] * m2[15]
  }

  return result
}

