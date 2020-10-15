import { Aux } from './Aux'
import { Type } from './Defs'

let allGenerators = [
    require('./City').default,
    require('./Strike').default,
    require('./Mist').default,
    require('./Leaf').default,
    require('./WaveMask').default,
]

let generatorsByType = {}
let randomPickable = []

let debug

function hasType(types, test) {
    return (types & test) === test
}

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

        if (gen.debug) {
            debug = gen
        }

        //MASK/FILTER不能被单独使用
        if (hasType(gen.types, Type.MASK) || hasType(gen.types, Type.FILTER)) {
            randomPickable.push(gen)
        }
    }
}

function randomPick() {
    let gen
    if (debug) {
        gen = debug
    } else {
        gen = Aux.randArrItem(randomPickable)
    }
    
    let result = {generator: gen, filter: undefined, mask: undefined}

    if (hasType(gen.types, Type.CAN_BE_FILTERED)) {
        if (Aux.randBool()) {
            result.filter = Aux.randArrItem(generatorsByType[Type.FILTER])
        }
    } else if (hasType(gen.types, Type.CAN_BE_MASKED)) {
        if (true||Aux.randBool()) {
            result.mask = Aux.randArrItem(generatorsByType[Type.MASK])
        }
    }

    return result
}

init()

export default {
    randomPick
}