// https://stackoverflow.com/questions/33187618/print-integers-1-20-in-groups-of-five-per-line
// ;(function() {
//     var line = ''
//     for (var i = 1; i <= 20; i++) {
//       line += i + ' '
//       if (i % 5 === 0) {
//         console.log(line)
//         line = ''
//       }
//     }
//   })()

// I'm took reference to print 5 number in one line
// and then modify the script

const total = 5

const test = (num: number) => {
    for (let i = 1; i <= num; i++) {
        let line:any = ''
        for (let j = 1; j <= num; j++) {
            line += (i*j) + ' '
            if (j % 5 === 0) {
                console.log(line)
                line = i
            }
        }
    }
}

console.log(test(total))
