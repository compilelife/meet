import {G} from '@svgdotjs/svg.js'
require('@svgdotjs/svg.filter.js') //install filter

import {Context, Type} from './Defs'

class DrawCity {
    /**
     * 
     * @param {G} g 
     * @param {Context} ctx
     */
    constructor(g, ctx) {
        this.g = g
        this.ctx = ctx

        this.sunColor = ctx.colors.shades('secondary').main.hex
        this.buildingColor = ctx.colors.shades('primary').light.hex
        this.groundColor = ctx.colors.accents('primary').A200.hex

        this.groundHeight = Math.round(this.ctx.height/10)
        this.groundY = this.ctx.height - this.groundHeight

        this.skyLine = this.ctx.height * 0.38
        this.sunSize = this.ctx.height * 0.15
    }

    generate() {
        this.ground()
        this.sun()
        this.buildings()
    }

    buildings() {
        const up = this.skyLine
        const down = this.groundY
        const wide = this.ctx.width / 8
        const narrow = this.ctx.width / 10
        let x = 0

        const flavors = [this.buildingA, this.buildingB, this.buildingC]

        while (x < this.ctx.width) {
            const h = Math.random() * (down - up)
            const w = Math.round(Math.random() * (wide - narrow) + narrow)
            const i = Math.floor(Math.random()*flavors.length)
            flavors[i].bind(this)(x,w,h)
            x+=w
        }
    }

    /**
     *  ---
     * |   |
     * |   |
     */
    buildingA(x, w, h) {
        this.g.rect(w,h).attr({
            fill: this.buildingColor,
            y: this.groundY - h,
            x: x,
        })
    }

    /**
     *   |
     *  ---
     * |   |
     * |   |
     */
    buildingB(x, w, h) {
        const topH = h/7
        h -= topH
        const building = this.g.rect(w,h).attr({
            fill: this.buildingColor,
            y: this.groundY - h,
            x: x,
        }).bbox()
        this.g.line(building.cx, building.y, building.cx, building.y - topH).attr({
            stroke: this.buildingColor,
            'stroke-width': 4
        })
    }

    /**
     * |\
     * |  |
     * |  |
     */
    buildingC(x,w,h) {
        const roofH = h/5
        const bodyH = h - roofH
        const y = this.groundY
        this.g.path(`M${x} ${y} L${x} ${y-h} L${x+w} ${y-bodyH} L${x+w} ${y} Z`)
            .fill(this.buildingColor)
    }

    ground() {
        const gradient = this.g.gradient('linear', add=>{
            add.stop(0, this.buildingColor)
            add.stop(1, this.groundColor)
        }).attr({
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
        })
        
        this.g.rect(this.ctx.width, this.groundHeight).attr({
            y: this.groundY,
            fill: gradient
        })
    }

    sun() {
        this.g.circle(this.sunSize).attr({
            cx: this.ctx.width*0.618,
            cy: this.skyLine - this.sunSize,
            fill: this.sunColor
        })
    }
}

export default {
    name: 'City',
    types: Type.NORMAL,
    generate: (g, ctx)=>new DrawCity(g, ctx).generate()
}