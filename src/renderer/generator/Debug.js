import {G} from '@svgdotjs/svg.js'
import {Context} from './Context'

export default {
    name: 'Debug',
    /**
     * 
     * @param {G} g 
     * @param {Context} ctx
     */
    generate: function(g, ctx) {
        g.circle(ctx.height).attr({
            fill: 'red'
        })
    }
}