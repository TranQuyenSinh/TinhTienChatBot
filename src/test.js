const formatNumer = num => {
    return Intl.NumberFormat('vi-VN').format(num)
}
const calculate = message => {
    let arr = message.split(' ')
    let types = arr.filter((item, index) => index % 2 != 0)
    let quantities = arr.filter((item, index) => index % 2 == 0)
    let result = ''
    let total = 0
    let amount = 0
    types.forEach((type, index) => {
        let quantity = quantities[index]
        switch (type) {
            case 'ml':
                amount = quantity * 85000
                result += `\nMè lớn: ${quantity} x ${formatNumer(85000)} = ${formatNumer(amount)}`
                break
            case 'mn':
                amount = quantity * 25000
                result += `\nMè nhỏ: ${quantity} x ${formatNumer(25000)} = ${formatNumer(amount)}`
                break
            case 't':
                amount = quantity * 50000
                result += `\nTrứng vịt: ${quantity} x ${formatNumer(50000)} = ${formatNumer(amount)}`
                break
        }
        total += amount
    })
    result += '\n=======================\nTổng: ' + formatNumer(total)
    return result
}

console.log(calculate('20 ml 50 t'))
