import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import { eslint } from 'rollup-plugin-eslint';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default {
    input: './src/index.jsx',
    external: [ 
        'react', 
        'react-dom', 
        'react-router-dom'
    ],
    output: [
        {
            file: pkg.main,
            format: 'cjs'
        },
        {
            file: pkg.module,
            format: 'esm'
        }
    ],
    plugins: [
        nodeResolve({
            browser : true,
            modulesOnly : true
        }),
        external(),
        eslint(),
        babel({
            babelHelpers : 'runtime',
            exclude : 'node_modules/**',
            extensions: [ 
                '.js', 
                '.jsx' 
            ]
        }),
        commonjs({
            include: [ 
                'node_modules/**' 
            ],
            extensions: [ 
                '.js', 
                '.jsx' 
            ]
        })
    ]
};