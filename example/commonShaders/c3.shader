vec4 linearToGamma(vec4 linearIn){
  return vec4( pow(linearIn.rgb, vec3(1.0 / 2.2)), linearIn.a);
}