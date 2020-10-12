import { Context, Type } from "./Defs";
import {G} from '@svgdotjs/svg.js'
import '@svgdotjs/svg.filter.js'

export default {
    name: 'Mist',
    types: Type.FILTER,
    /**
     * @param {G} g
     * @param {Context} ctx
     */
    generate: (g, ctx)=>{
        g.filterWith(add=>{
            add.gaussianBlur(40)
        })
    }
}