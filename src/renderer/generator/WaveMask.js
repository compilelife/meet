import { Type, Context } from "./Defs";
import {G} from '@svgdotjs/svg.js'

export default {
    name: 'WaveMask',
    types: Type.MASK,
    /**
     * @param {G} g
     * @param {Context} ctx
     */
    generate: (g, ctx)=>{
        g.remember('colorful', true)

        const gradiant = g.gradient('radial', add=>{
            add.stop(0, ctx.colors.shades('primary').main.hex)
            add.stop(1, ctx.colors.shades('secondary').main.hex)
        })
        g.circle(ctx.height).cx(ctx.width/2).cy(ctx.height/2).fill(gradiant)
    }
}