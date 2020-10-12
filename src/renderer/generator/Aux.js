//为了让random可重现，可以用seed-random这个包，然后把种子保存下来即可
export const Aux = {
    /**
     * @param {Array} arr 
     */
    arrRand: function(arr) {
        return arr[Math.floor(Math.random()*arr.length)]
    },
    /**
     * 
     * @param {number} max 
     * @param {number} min
     */
    linearRand: function(max, min) {
        const minValue = min||0
        return Math.random()*(max-minValue)+minValue
    },

    randomColorStr: function() {
        return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6);
    }
}