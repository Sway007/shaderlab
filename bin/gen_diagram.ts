#! /usr/bin/env ts-node

import genDiagram from '../src/scripts/gen_diagram';

genDiagram({ pattern: /^Rule(Fn|Variable)/ });
