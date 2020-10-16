import {Type, Context} from './Defs'
import {G, SVG} from '@svgdotjs/svg.js'
import '@svgdotjs/svg.filter.js'
import { Aux } from './Aux'

export default {
    name: 'Leaf',
    types: Type.SHOULD_BE_MASK,

    /**
     * 
     * @param {G} g 
     * @param {Context} ctx 
     */
    generate: async function(g, ctx){
        const texture = g.pattern().image('../../../static/texture_paper_10.png')
        g.rect(ctx.width, ctx.height).fill(texture)

        const dots = Aux.generateDots({
            gridSize: 30,
            minSize: 10,
            maxSize: 30
        },ctx.width, ctx.height)

        const mask = ctx.mask

        dots.forEach(dot=>{
            let show = mask.isOpacity(dot.x, dot.y)
            let color = mask.colorful ? mask.colorAt(dot.x, dot.y).hex(): ctx.colors.shades('primary').main.hex
            if (show) {
                g.text(Aux.randUpperChar()).attr({
                    'font-family': 'Leafs',
                    'font-size': `${dot.r*2.7}px`,
                    x: dot.x,
                    y: dot.y,
                    fill: color
                }).filterWith(add=>{
                    add.merge(add.gaussianBlur(5), add.$source)
                }).rotate(dot.rotation)
            }
        })
    }
}