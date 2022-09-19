export const vertexShader = `
  varying vec2 varyingUv;
  uniform float uniformTime;
  uniform float uniformHover;

  uniform vec2 uniformPosition;
  uniform vec2 uniformGridSize;
  uniform vec2 uniformMousePosition;

  void main(){
    varyingUv = uv;
    vec3 pos = position;

    // wave characteristics
    vec2 noiseFreq = vec2(1.5, 1.0); // frequency of wave
    vec2 noiseAmp = vec2(0.05, 0.04); // amplitude of wave

    // check wheather the cursor stays near to the image 
    bool inArea = uniformMousePosition.x < uniformPosition.x + uniformGridSize.x / 1.25 &&
                  uniformMousePosition.x > uniformPosition.x - uniformGridSize.x / 1.25 &&
                  uniformMousePosition.y < uniformPosition.y + uniformGridSize.y / 1.25 &&
                  uniformMousePosition.y > uniformPosition.y - uniformGridSize.y / 1.25;

    if(inArea && uniformHover == 0.0) {
      pos.z += sin(pos.x * noiseFreq.x - uniformMousePosition.x) * noiseAmp.x;
      pos.z += sin(pos.y * noiseFreq.y - uniformMousePosition.y) * noiseAmp.y;
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    // vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    // modelPosition.z += sin(modelPosition.x * noiseFreq + uniformTime) * noiseAmp;
    // gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`
