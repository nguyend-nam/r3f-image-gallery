export const fragmentShader = `
  uniform vec3 uniformColor;
  uniform vec2 uniformPosition;
  uniform vec2 uniformGridSize;
  uniform vec2 uniformMousePosition;

  uniform float uniformTime;
  uniform sampler2D uniformTexture;

  varying vec2 varyingUv;


  void main(){
    // load img as three.js texture
    vec3 texture = texture2D(uniformTexture, varyingUv).rgb;
    gl_FragColor = vec4(texture, 1.0);
  }
`
