import { Type, Context } from "./Defs";
import {G} from '@svgdotjs/svg.js'
import { Aux } from "./Aux";

export default {
    name: 'WaveMask',
    types: Type.MASK,
    /**
     * @param {G} g
     * @param {Context} ctx
     */
    generate: (g, ctx)=>{
        g.remember('colorful', true)

        const gradiant = g.gradient('linear', add=>{
            add.stop(0, ctx.primaryColor().hex())
            add.stop(1, ctx.secondaryColor().hex())
        })
        
        g.path(`M-100 ${ctx.height/2} C${ctx.width/3} -300 ${ctx.width*2/3} ${ctx.height+300} ${ctx.width+100} ${ctx.height/2} S${ctx.width/2} ${ctx.height} -100 ${ctx.height/2} Z`)
            .fill(gradiant)
            .rotate(Aux.randDegree())
    }
}