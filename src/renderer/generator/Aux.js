import {Color} from '@svgdotjs/svg.js'
//为了让random可重现，可以用seed-random这个包，然后把种子保存下来即可
export const Aux = {
    /**
     * @param {Array} arr 
     */
    randArrItem: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    },
    /**
     * 
     * @param {number} max 
     * @param {number} min
     */
    randLinearValue: function(max, min) {
        const minValue = min||0
        return Math.random()*(max-minValue)+minValue
    },

    randColor: function() {
        return Color.random().toHex()
    },

    randBool: function() {
        return Math.round(Math.random()) === 1
    },

    randUpperChar: function() {
        return this.randArrItem([
            'A','B','C','D','E','F','G',
            'H','I','J','K','L','M','N',
            'O','P','Q','R','S','T','U',
            'V','W','X','Y','Z'
        ])
    },
}