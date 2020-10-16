import Matercolor from "matercolors"
import {G} from '@svgdotjs/svg.js'
import {Canvg} from 'canvg'
const Color = require('color')

export class Mask {
    /**
     * 
     * @param {G} g 
     */
    constructor(g) {
        
    }

    /**
     * 
     * @param {G} g 
     */
    async init(g) {
        const canvas = document.createElement('canvas')
        const canvasCtx = canvas.getContext('2d')
        const canvg = Canvg.fromString(canvasCtx, new XMLSerializer().serializeToString(g.node))
        await canvg.render()
        this.width = g.width()
        this.height = g.height()
        this.imgData = canvasCtx.getImageData(0,0,this.width,this.height).data
        this.colorful = g.remember('colorful')||false
    }

    _index(x,y) {
        const index = Math.floor(x + y*this.width)
        return index * 4;
    }

    isOpacity(x, y) {
        return this.imgData[this._index(x,y)+3] !== 0
    }

    colorAt(x, y) {
        const index = this._index(x,y)
        return Color({
            r:this.imgData[index+0], 
            g:this.imgData[index+1], 
            b:this.imgData[index+2], 
        })//.alpha(this.imgData[index+3])
    }
}

export class Context {
    constructor() {
        /**
         * @type {number}
         */
        this.width = 800
        /**
         * @type {number}
         */
        this.height = 600
        /**
         * find MaterColor doc here: https://www.npmjs.com/package/matercolors
         * @type {Matercolor}
         */
        this.colors = {}
        /**
         * @type Mask
         */
        this.mask = undefined
    }

    primaryColor(type = 'main') {
        return Color(this.colors.shades('primary')[type].hex)
    }

    secondaryColor(type = 'main') {
        return Color(this.colors.shades('secondary')[type].hex)
    }
}

export const Type = {
    NORMAL: 0x0,
    FILTER: 0x1,
    CAN_BE_FILTERED: 0x2,
    MASK: 0x4,
    SHOULD_BE_MASK: 0x8,
}

/**
 * generator interface:
 * 
 * export default {
 *   name: 'xxx',
 *   types: xxx, //or combined of Type
 *   generate: function(g, ctx){}
 * }
 * 
 */