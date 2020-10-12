import { Type } from './Defs'

let allGenerators = [
    require('./City').default,
    require('./Strike').default,
    require('./Mist').default
]

let generatorsByType = {}

function init() {
    console.log('init Picker')
    for (const gen of allGenerators) {
        if (!gen.types) {
            gen.types = Type.NORMAL
        }

        for (const key in Type) {
            if (Type.hasOwnProperty(key)) {
                const type = Type[key];
                if ((gen.types & type) === type) {
                    if (!generatorsByType[type]){
                        generatorsByType[type] = []
                    }
                    generatorsByType[type].push(gen)
                }
            }
        }
    }
    console.log(generatorsByType)
}

/**
 * 
 * @param {number} type 
 */
function pick(type) {
    let arr = allGenerators
    if (type !== undefined) {
        arr = generatorsByType[type]
    }

    const i = Math.floor(Math.random()*arr.length)
    const gen = arr[i]
    let ret = [gen]

    if ((gen.types & Type.FILTER) === Type.FILTER) {
        //过滤器需要前置生成器
        const pre = pick(Type.CAN_BE_FILTERED)
        ret = pre.concat(ret)
    }

    return ret
}

init()

export default {
    pickOne: ()=>pick()
}