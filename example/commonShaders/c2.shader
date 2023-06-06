vec2 TRANSFORM_TEX(vec2 coord, vec4 tex_st) {
    return coord * tex_st.xy + tex_st.zw;
}