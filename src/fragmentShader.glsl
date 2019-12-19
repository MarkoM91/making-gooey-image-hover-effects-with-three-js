uniform vec2 u_mouse;
uniform vec2 u_res;

float circles(in vec2 _st, in float _radius, in float blurriness) {
  vec2 dist = _st;
  return 1.-smoothstep(_radius-(_radius*blurriness), _radius+(_radius*blurriness), dot(dist, dist)*4.0);
}

void main() {
  vec2 res = u_res * PR;
  vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
  st.y *= u_res.y / u_res.x;

  vec2 mouse = u_mouse * 0.5;
  mouse.y *= u_res.y / u_res.x;
  mouse *= -1.;

  vec2 circlePos = st + mouse;
  float c = circle(circlePos, 0.03, 2);
  gl_FragColor = vec4(vec3(c), 1);
}
