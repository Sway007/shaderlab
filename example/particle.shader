Shader "Particle" {
  SubShader "s1" {
    Pass "default" {
      Tags { PipelineStage = "Forward"}

      struct a2v {
        vec3 POSITION;
        vec3 INDEX;
        vec2 UV;
      }

      struct v2f {
        vec2 v_uv;
        vec3 v_pos;
      }

      #define PI 3.14159265359

      mat4 u_MVPMat;
      float progress;
      sampler2D texture1;
      sampler2D texture2;

      VertexShader = vert;
      FragmentShader = frag;

      v2f vert(a2v i) {
        v2f o;

        o.v_uv = i.UV;
        vec4 position = vec4(i.POSITION , 1.0);
        float distance = length(i.INDEX.xy);
        float maxDistance = 40.0 * 1.414;
        float wait = distance / maxDistance * 0.5;

        float p = clamp(progress-wait, 0.0, 2.0);
        position.z += sin(p * PI * 6.0) * 3.0 * (maxDistance - distance * 0.5) / maxDistance * (2.0 - progress) * 0.5;

        gl_Position = u_MVPMat * position;
        return o;
      }

      vec4 transition(vec2 p, float progress) {
        vec2 dir = p - vec2(0.5);
        float dist = length(dir);

        if (dist > progress) {
          return mix(texture2D(texture1, v_uv), texture2D(texture2, v_uv), progress);
        } else {
          vec2 offset = dir * sin(dist * 30.0 - progress * 30.0);
          return mix(texture2D(texture1, v_uv + offset), texture2D(texture2, v_uv), progress);
        }
      }

      void frag(v2f i) {
        gl_FragColor = transition(i.v_uv, clamp(progress, 0.0, 1.0));
      }
    }
  }
}