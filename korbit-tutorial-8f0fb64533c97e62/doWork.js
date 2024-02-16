import { processWork } from 'korbit-tutorial-8f0fb64533c97e62/util.js';

function doSomeWork(workToBeDone) {
    let finishedWork = []
    workToBeDone.forEach((workItem) => finishedWork.push(processWork(workItem)))
    return finishedWork
}

let workToBeDone = ["these", "are", "some", "words", null]
console.log(doSomeWork(workToBeDone))