vec4 gammaToLinear(vec4 srgbIn){
    return vec4( pow(srgbIn.rgb, vec3(2.2)), srgbIn.a);
}

vec4 linearToGamma(vec4 linearIn){
    return vec4( pow(linearIn.rgb, vec3(1.0 / 2.2)), linearIn.a);
}

vec4 UnityObjectToClipPos(vec4 vertex) {
    return vertex;
}

vec3 UnityObjectToWorldNormal(vec3 normal) {
    return normal;
}

vec4 mul(mat4 m1, vec4 m2) {
    return m1 * m2;
}

mat4 unity_ObjectToWorld;

vec2 TRANSFORM_TEX(vec2 coord, sampler2D tex) {
    return coord;
}

vec3 UnityWorldSpaceLightDir(vec3 pos) {
    return pos;
}

vec4 UNITY_LIGHTMODEL_AMBIENT;

vec3 _LightColor0;