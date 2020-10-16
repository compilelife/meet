import { Color } from '@svgdotjs/svg.js'

let cachedDist = undefined
let cachedDistWidth = 0
let cachedDistHeight = 0
let cachedMaxDistance = 0

function nextInt(bound) {
    return Math.floor(Math.random() * bound)
}

function getRandomInt(paramInt1, paramInt2) {
    let i = paramInt2;
    if (paramInt2 < paramInt1)
        i = paramInt1;
    if (paramInt1 < 0) {
        paramInt1 = -paramInt1;
        return nextInt(i + paramInt1 + 1) - paramInt1;
    }
    return nextInt(i - paramInt1 + 1) + paramInt1;
}

function randDegree() {
    return Math.floor(Math.random() * 360)
}

function randArrItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function randUpperChar() {
    return randArrItem([
        'A', 'B', 'C', 'D', 'E', 'F', 'G',
        'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U',
        'V', 'W', 'X', 'Y', 'Z'
    ])
}

/**
 * @param {number} paramInt1 width
 * @param {number} paramInt2 height
 * @param {number} paramInt3 gridSize
 */
function getDotsArray(paramInt1, paramInt2, paramInt3) {
    if (cachedDist == undefined || cachedDistWidth != paramInt1 || cachedDistHeight != paramInt2) {
        let m = Math.floor(paramInt1 / paramInt3);
        let n = Math.floor(paramInt2 / paramInt3);
        cachedDist = new Array(m * n);
        cachedDistWidth = paramInt1;
        cachedDistHeight = paramInt2;
        let i = Math.floor(paramInt3 / 2);
        let k = i;
        let j;
        for (j = 0; j < n; j++) {
            let i1;
            for (i1 = 0; i1 < m; i1++)
                cachedDist[j * m + i1] = Math.min(k, paramInt2 - k);
            k += paramInt3;
        }
        for (paramInt2 = 0; paramInt2 < m; paramInt2++) {
            for (j = 0; j < n; j++) {
                k = j * m + paramInt2;
                let i1 = Math.min(cachedDist[k], Math.min(i, paramInt1 - i));
                cachedDist[k] = i1;
                if (cachedMaxDistance < i1)
                    cachedMaxDistance = i1;
            }
            i += paramInt3;
        }
    }
    return cachedDist.slice();
}

class DotOption{
    constructor(){
        this.character = ''
        this.color = 0
        this.r = 0
        this.rotation = 0
        this.x = 0
        this.y = 0
    }
}

/**
 * @param {{gridSize:number, minSize:number, maxSize: number}}} paramDotsOptions 参数
 * @param {number} paramInt1 宽
 * @param {number} paramInt2 高
 * @returns {Array<DotOption>}
 */
function generateDots(paramDotsOptions, paramInt1, paramInt2) {
    const arrayList = new Array() //DotOption
    let i1 = paramDotsOptions.gridSize;
    let j = paramDotsOptions.minSize;
    let k = paramDotsOptions.maxSize
    let m = Math.floor(paramInt1 / i1);
    let n = Math.floor(paramInt2 / i1);
    let arrayOfInt = getDotsArray(paramInt1, paramInt2, i1);
    paramInt2 = Math.floor(k / 2);
    let f = cachedMaxDistance;
    let i = k;
    paramInt1 = j;
    while (paramInt2 <= i) {
        let i7 = getRandomInt(paramInt2, i);
        let i5 = 0;
        i = 0;
        j = 0;
        let i4 = 0;
        let i2 = 0;
        while (true) {
            i3 = 1;
            if (i5 === 0 && i < n) {
                i3 = j;
                let b = 0;
                j = i2;
                for (i2 = b; i5 === 0 && i2 < m; i2++) {
                    if (f <= arrayOfInt[j]) {
                        i4 = i;
                        i3 = i2;
                        i5 = 1;
                    }
                    j++;
                }
                i++;
                i2 = j;
                j = i3;
                continue;
            }
            break;
        }
        i2 = Math.min(k, Math.floor(f));
        i = paramInt2;
        if (i2 <= paramInt2)
            i = paramInt1;
        if (i7 > f) {
            paramInt2 = i;
            i = i2;
            continue;
        }
        i5 = Math.floor(i1 / 2);
        let i6 = Math.floor(j * i1 + i5);
        let i8 = Math.floor(i4 * i1 + i5);
        paramInt2 = i3;
        if (i7 > 100)
            paramInt2 = 2;
        let dotOption = new DotOption();
        dotOption.x = i6;
        dotOption.y = i8;
        dotOption.r = i7 - paramInt2;
        dotOption.rotation = randDegree();
        dotOption.character = randUpperChar();
        arrayList.push(dotOption);
        let f1 = i5;
        let f2 = f1;
        j = 0;
        f = 0.0;
        i5 = 0;
        i4 = n;
        n = m;
        let i3 = paramInt1;
        paramInt1 = i;
        paramInt2 = k;
        while (j < i4) {
            let f3 = f1;
            i = 0;
            m = i5;
            let f4 = f;
            i5 = i;
            i = i4;
            k = n;
            while (i5 < k) {
                let f5 = arrayOfInt[m];
                if (f5 >= 0.0) {
                    f = f3 - i6;
                    let f6 = f2 - i8;
                    let d1 = Math.sqrt((f * f + f6 * f6));
                    let d2 = i7;
                    n = Math.floor(d1 - d2);
                    if (n <= 0)
                        arrayOfInt[m] = -1;
                    f6 = n;
                    if (f5 > f6) {
                        arrayOfInt[m] = n;
                        f = f4;
                        if (f6 > f4)
                            f = f6;
                    } else {
                        f = f4;
                        if (f5 > f4)
                            f = f5;
                    }
                } else {
                    f = f4;
                }
                f3 += i1;
                m++;
                i5++;
                f4 = f;
            }
            f2 += i1;
            j++;
            n = k;
            i4 = i;
            f = f4;
            i5 = m;
        }
        i = i2;
        k = paramInt2;
        paramInt2 = paramInt1;
        paramInt1 = i3;
        m = n;
        n = i4;
    }
    return arrayList;
}

//为了让random可重现，可以用seed-random这个包，然后把种子保存下来即可
export const Aux = {
    /**
     * @param {Array} arr 
     */
    randArrItem,

    /**
     * 
     * @param {number} max 
     * @param {number} min
     */
    randLinearValue: function (max, min) {
        const minValue = min || 0
        return Math.random() * (max - minValue) + minValue
    },

    randColor: function () {
        return Color.random().toHex()
    },

    randBool: function () {
        return Math.round(Math.random()) === 1
    },

    randUpperChar,

    randDegree,

    generateDots
}