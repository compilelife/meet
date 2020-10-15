import { Context, Type } from "./Defs";
import {G} from '@svgdotjs/svg.js'
import '@svgdotjs/svg.filter.js'
import { Aux } from "./Aux";

export default {
    name: 'Strike',
    types: Type.CAN_BE_FILTERED,
    /**
     * @param {G} g
     * @param {Context} ctx
     */
    generate: (g,ctx)=>{
        //因为矩形绘制后要旋转，无论怎么旋转，对角线最长
        const n = Math.ceil(Math.sqrt(ctx.width * ctx.width + ctx.height * ctx.height))
        const maxCount = 5
        const minWidth = n / maxCount
        const drift = minWidth / 2

        const wrap = g.group()
        let x = 0
        const primary = ctx.colors.shades('primary')
        const secondary = ctx.colors.shades('secondary')
        const colors = [
            primary.light.hex,
            primary.main.hex,
            primary.main.contrastText,
            secondary.main.hex,
            secondary.dark.hex
        ]
        let i = 0
        while (x < n) {
            let w = Math.floor(Aux.randLinearValue(minWidth+drift, minWidth))
            if (w > n - x) {
                w = n - x
            }
            wrap.rect(w, n).attr({
                x: x,
                fill: colors[i++]
            }).filterWith(add=>{
                const blur = add.offset(0, 8).in(add.$sourceAlpha).gaussianBlur(8)
                add.blend(add.$source, blur)
            })
            x+=w
        }

        const angles = [30,45,60,120,150]

        wrap.x((ctx.width - n) / 2)
        wrap.y((ctx.height - n) / 2)

        wrap.rotate(Aux.randArrItem(angles))
    }
}