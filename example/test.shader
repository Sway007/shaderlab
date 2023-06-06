Shader "DemoShader"
{ 
  // -------------------- 编辑器属性样式反射区（可选）-------------------
  // Pro code 用户可不写，Editor 用户用于快速反射 Inspector,
  // 适用于简单 UI 反射显示和默认值设置，想做的比较极致还需要编辑器开放 Shader UI 编辑定制能力
  EditorProperties 
  { 
    // TODO: 纹理属性、默认值
    MainTex ("Main Texture", sampler2D) = "white";
    _Color("Main Tint", vec4) = (1, 1, 1, 1);
    _Cutoff("Cut Off", Range(0, 1)) = 0.5;
  }
  // ------------------------------------------------------------

  
  SubShader "subshader1" 
  {
    // -------------------- SubShader Tag 区（可选）--------
    // 对应引擎 SubShader tags
    Tags { ReplacementTag = "Opaque",PipelineStage = "test" } 
    // ---------------------------------------------------

    
    Pass "pass1" 
    {
      // ---------------- Pass Tag 区（可选）---------
      // 对应引擎 ShaderPass tags（可选）
      Tags { PipelineStage = "Forward"}
      // -------------------------------------------

      
      // ---------------- RenderState 区（可选）------
      // 对应引擎 BlendState
      BlendState = customBlendState;
      // 对应引擎 DepthState
      DepthState = customDepthState;
      // 对应引擎 StencilState
      StencilState = customStencilState;
      // 对应引擎 RasterState
      RasterState = customRasterState;
      // -------------------------------------------

      
      // ------------------ 子着色器区（必选）---------
      VertexShader = vert;
      FragmentShader = frag;
      // -------------------------------------------

      
      // -------------------- 着色器内容示范 ---------
      // #include 为引用关键字，可用路径描述，例如： "Asset/Light.glsl" 直接对应用户资产管理器路径
      // TODO!
      // #include "Light.glsl"

      vec4 _Color;
      sampler2D _MainTex;
      vec4 _MainTex_ST;
      float _Cutoff;

      // pass 顶层的include不会保证文本替换顺序
      #include "c1.shader"

      struct a2v
      {
          vec4 vertex;
          vec3 normal;
          vec2 texcoord;
      }

      struct v2f
      {
          vec4 pos;
          vec3 worldNormal;
          vec3 worldPos;
          vec2 uv;
      }

      v2f vert (a2v v)
      {
          v2f o;
          o.pos = UnityObjectToClipPos(v.vertex);
          o.worldNormal = UnityObjectToWorldNormal(v.normal);
          // o.worldPos = mul(unity_ObjectToWorld, v.vertex).xyz;
          // 不支持这种写法，替换成以下写法
          vec4 tmp = mul(unity_ObjectToWorld, v.vertex);
          o.worldPos = tmp.xyz;
          o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
          
          gl_Position = o.pos;
          return o;
      }

      void frag(v2f i)
      {
        vec3 worldNormal = normalize(i.worldNormal);
        vec3 worldLightDir = normalize(UnityWorldSpaceLightDir(i.worldPos));
        vec4 texColor = texture2D(_MainTex, i.uv);

        if (texColor.a - _Cutoff < 0.0) {
          discard;
        }

        vec3 albedo = texColor.rgb * _Color.rbg;
        vec3 ambient = UNITY_LIGHTMODEL_AMBIENT.xyz * albedo;
        vec3 diffuse = _LightColor0.rgb * albedo * max(0.0, dot(worldNormal, worldLightDir));
        gl_FragColor = vec4(ambient + diffuse, texColor.a);
      }
      // -----------------------------------------
    }
  }
}
