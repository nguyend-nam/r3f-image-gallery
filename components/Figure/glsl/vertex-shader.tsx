export const vertexShader = `
  varying vec2 vUv;
  void main() {
    // pass uv coords into fragment shader
    vUv = uv;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
