import Matercolor from "matercolors"

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
    }
}

export const Type = {
    NORMAL: 0x0,
    FILTER: 0x1,
    CAN_BE_FILTERED: 0x2,
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