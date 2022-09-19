export const fragmentShader = `
  uniform vec3 uniformColor;

  void main(){
    gl_FragColor = vec4(uniformColor, 0.6);
  }
`
