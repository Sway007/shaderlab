# Galacean-Shader-Lab

[Galacean](https://galacean.antgroup.com/) Shader Lab DSL Parser Based on [chevrotain
](https://github.com/Chevrotain/chevrotain)

## Usage

```ts
import { parseShader } from 'galacean-shader-parser';

const result = parseShader(input);
console.dir(result.shader, { depth: null });
```
