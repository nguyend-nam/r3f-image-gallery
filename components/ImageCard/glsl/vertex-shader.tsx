export const vertexShader = `
  varying vec2 varyingUv;
  uniform float uniformTime;
  uniform float uniformHover;
  uniform vec2 uniformMousePosition;

  void main(){
    varyingUv = uv;

    vec3 pos = position;

    vec2 noiseFreq = vec2(2, 1.5); // frequency of wave
    vec2 noiseAmp = vec2(0.15, 0.1); // amplitude of wave

    if(uniformHover == 1.0) {
      pos.z += sin(pos.x * noiseFreq.x - uniformMousePosition.x) * noiseAmp.x;
      pos.z += sin(pos.y * noiseFreq.y - uniformMousePosition.y) * noiseAmp.y;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    // vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    // modelPosition.z += sin(modelPosition.x * noiseFreq + uniformTime) * noiseAmp;
    // gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`
