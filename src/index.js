// function eval() {
//     // Do not use eval!!!
//     return;
// }

function expressionCalculator(expr) {
    try {
        let err = new TypeError('Division by zero.')
        let numStack = [], strStack = []
        let priority = {'(': 0, ')': 0, '+': 1, '-': 1, '*': 2, '/': 2}

        function counting(a, c) {
            if (c === '+') return a[0] + a[1]
            if (c === '-') return a[0] - a[1]
            if (c === '*') return a[0] * a[1]
            if (a[1] === 0) throw err
            return a[0] / a[1]
        }

        function validation(str) {
            let c = str.replace(/(\(\))/, '')
            return c.length < 1 ? true : c === str && c.length > 0 ? false : validation(c)
        }

        function converting(str) {
            let b = str.replace(/ /g, '')
            let a = b.replace(/(\d+)|([)(/*+-])/g, '$& ')
            b = b.replace(/(\d+)|([/*+-])/g, '')
            return !validation(b) ? false : a.trim().split(' ').map(u => +u || u === '0' ? +u : u)
        }

        function calculation(u) {
            const str = strStack.length
            if (numStack.length < 1 && u === '-' || numStack.length < 1 && u === '+') numStack.push(0)
            if (str < 1 && u === null) return
            if (str < 1 || u === '(' || priority[u] > priority[strStack[str - 1]]) return strStack.push(u)
            if (u === ')' && strStack[str - 1] === '(') return strStack.pop()
            let res = counting(numStack.slice(-2), strStack[str - 1])
            numStack.pop()
            strStack.pop()
            numStack[numStack.length - 1] = res
            calculation(u)
        }
        let arr = converting(expr)
        if (!arr || expr.length < 1) return false
        arr.forEach(u => +u || u === 0 ? numStack.push(u) : calculation(u))
        calculation(null)
        return numStack[0]
    } catch (e) {
        return e.message
    }
}
console.log(expressionCalculator('1+2*(3+4/2-(1+2))*2+1'))
console.log(expressionCalculator('1 / 0'))
console.log(expressionCalculator('4/(5-5)+5+5'))
console.log(expressionCalculator('31 * 21 + 14 / (  (  18 * 52 / (  43 - 74 / 89 - 12  ) + 8  ) + 3 / 0 + (  9 + 81 + 19 * 94 / (  0 * 71 + 53 - 20 * 94  )  )  )'))

module.exports = {
    expressionCalculator
}