Shader "DemoShader"
{ 
  // -------------------- 编辑器属性样式反射区（可选）-------------------
  // Pro code 用户可不写，Editor 用户用于快速反射 Inspector,
  // 适用于简单 UI 反射显示和默认值设置，想做的比较极致还需要编辑器开放 Shader UI 编辑定制能力
  EditorProperties 
  { 
    material_BaseColor("Offset unit scale", vec4) = (1,1,1,1);
    material_AlphaCutoff("Alpha cut off", Range(1,100)) = 10;
  }
  // ------------------------------------------------------------

  
  SubShader "SubShaderName" 
  {
    // -------------------- SubShader Tag 区（可选）--------
    // 对应引擎 SubShader tags
    Tags { ReplacementTag = "Opaque",PipelineStage = "test" } 
    // ---------------------------------------------------

    
    Pass "PassName" 
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
      FragmentShader = customFragment;
      // -------------------------------------------

      
      // -------------------- 着色器内容示范 ---------
      // #include 为引用关键字，可用路径描述，例如： "Asset/Light.glsl" 直接对应用户资产管理器路径
      // TODO!
      // #include "Light.glsl"

      struct Attributes
      {
        vec4 position;
        vec2 uv;
      }

      struct Varyings
      {
        vec2f uv;
        float fogCoord;
      }

      vec4 material_BaseColor;
      float material_AlphaCutoff;
      sampler2D material_BaseTexture;
  
      BlendFactor material_SrcBlend;
      BlendFactor material_DstBlend;

      // 值可以固定，也可以通过属性传入
      BlendState customBlendState
      {
        Enabled = true;
        SrcColorBlendFactor = material_SrcBlend;
        DestColorBlendFactor = material_DstBlend;
      }

      Varyings customVertex(Attributes input, int arg2){
        Varyings varying;
        varying.uv = vec2(1.0,2.0);
        gl_Position = vec4(1.0,1.0,1.0,1.0);
        return varying;
      }

      void unlitFragment(Varyings input)
      {
        vec4 baseColor = material_BaseColor;

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
    
        #include "FogFragment.glsl"
    
        #ifndef ENGINE_IS_COLORSPACE_GAMMA
            gl_FragColor = linearToGamma(gl_FragColor);
        #endif
      }
      // -----------------------------------------
    }
  }
}
