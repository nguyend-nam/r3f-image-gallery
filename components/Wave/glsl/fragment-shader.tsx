export const fragmentShader = `
  uniform vec3 uniformColor;
  uniform float uniformTime;
  uniform sampler2D uniformTexture;
  varying vec2 varyingUv;

  void main(){
    // gl_FragColor = vec4(sin(varyingUv.x + uniformTime) * uniformColor, 1.0);
    // gl_FragColor = vec4(varyingUv, 1.0, 1.0);
    // gl_FragColor = vec4(uniformColor, 1.0);

    vec3 texture = texture2D(uniformTexture, varyingUv).rgb;
    gl_FragColor = vec4(texture, 1.0);
  }
`
