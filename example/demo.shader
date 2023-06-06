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
      VertexShader = customVertex;
      FragmentShader = unlitFragment;
      // -------------------------------------------

      
      // -------------------- 着色器内容示范 ---------
      // #include 为引用关键字，可用路径描述，例如： "Asset/Light.glsl" 直接对应用户资产管理器路径
      // TODO!
      // #include "Light.glsl"

      struct Attributes
      {
        vec4 _position;
        vec2 _uv;
      }

      struct Varyings
      {
        vec2 uv;
        float fogCoord;
      }

      vec4 material_BaseColor;
      float material_AlphaCutoff;
      uniform sampler2D material_BaseTexture;
  
      BlendFactor material_SrcBlend;
      BlendFactor material_DstBlend;

      vec4 gammaToLinear(vec4 srgbIn){
          return vec4( pow(srgbIn.rgb, vec3(2.2)), srgbIn.a);
      }

      vec4 linearToGamma(vec4 linearIn){
          return vec4( pow(linearIn.rgb, vec3(1.0 / 2.2)), linearIn.a);
      }

      // 值可以固定，也可以通过属性传入
      BlendState customBlendState
      {
        Enabled = true;
        SrcColorBlendFactor = material_SrcBlend;
        DestColorBlendFactor = material_DstBlend;
      }

      float globalFn(float arg1, float arg2) {
        return arg1 + arg2;
      }

      uniform float factor;
      uniform mat4 _MAT_UNUSED;

      Varyings customVertex(Attributes input, float v2){
        Varyings varying;
        varying.uv = vec2(true,factor);
        varying.fogCoord = input._position.x * factor + 2.0 * input._uv.x;
        float unusedV = 1.0 + undefined;
        float unusedV2 = unused2 * undefined;
        float unused3 = func(arg1);
        gl_Position = vec4(input._position.xy, v2,globalFn(0.5, 0.5+1.0));
        return varying;
        return true;
        return "hello";
      }

      void unlitFragment(Varyings input)
      {
        vec4 baseColor = material_BaseColor ;

        #ifdef MATERIAL_HAS_BASETEXTURE
            vec4 textureColor = texture2D(material_BaseTexture, input.uv);
            #ifndef ENGINE_IS_COLORSPACE_GAMMA
                textureColor = gammaToLinear(textureColor);
            #endif
            baseColor *= textureColor;
        #endif
    
        #ifdef MATERIAL_IS_ALPHA_CUTOFF
            if( baseColor.a < material_AlphaCutoff ) {
                discard;
            }
        #endif
    
        gl_FragColor = baseColor;
    
        #ifndef MATERIAL_IS_TRANSPARENT
            gl_FragColor.a = 1.0;
        #endif
        
        #ifndef ENGINE_IS_COLORSPACE_GAMMA
            gl_FragColor = linearToGamma(gl_FragColor);
        #endif
      }
      // -----------------------------------------
    }
  }
}
