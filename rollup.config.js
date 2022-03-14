import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default {
    input : './src/index.ts',
    external : [ 
        'react', 
        'react-router'
    ],
    output : [
        {
            sourcemap : false,
            file : pkg.main,
            format : 'cjs'
        },
        {
            sourcemap : false,
            file : pkg.module,
            format : 'esm'
        }
    ],
    plugins : [
        nodeResolve({
            browser : true,
            modulesOnly : true
        }),
        external(),
        babel({
            babelHelpers : 'runtime',
            exclude : 'node_modules/**',
            extensions: [ 
                '.js', 
                '.jsx',
                '.ts',
                '.tsx'
            ]
        }),
        commonjs({
            include: [ 
                'node_modules/**' 
            ],
            extensions: [ 
                '.js', 
                '.jsx',
                '.ts',
                '.tsx'
            ]
        }),
        typescript({ 
            tsconfig : './tsconfig.json' 
        })
    ]
};