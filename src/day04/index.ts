import run from "aocrunner"

const parseInput = (rawInput: string): Pairs[] =>
  rawInput.split("\n").map((row) => {
    const [left, right] = row.split(",")

    const [leftStart, leftEnd] = left.split("-").map(Number)
    const leftAssignment: Assignment = []
    for (let i = leftStart; i <= leftEnd; i++) {
      leftAssignment.push(i)
    }

    const [rightStart, rightEnd] = right.split("-").map(Number)
    const rightAssignment: Assignment = []
    for (let i = rightStart; i <= rightEnd; i++) {
      rightAssignment.push(i)
    }

    return [leftAssignment, rightAssignment] as Pairs
  })

type Assignment = number[]
type Pairs = [Assignment, Assignment]

const part1 = (rawInput: string) => {
  const assignments = parseInput(rawInput)
  return assignments.reduce((fullyOverlapping, assignment) => {
    const [left, right] = assignment
    const overlapping = left.every((number) => right.includes(number))

    return overlapping ? fullyOverlapping + 1 : fullyOverlapping
  }, 0)
}

const part2 = (rawInput: string) => {
  const assignments = parseInput(rawInput)
  return assignments.reduce((partiallyOverlapping, assignment) => {
    const [left, right] = assignment
    const overlapping = left.some((number) => right.includes(number))

    return overlapping ? partiallyOverlapping + 1 : partiallyOverlapping
  }, 0)
}

run({
  part1: {
    tests: [
      {
        input: `2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2-4,6-8
      2-3,4-5
      5-7,7-9
      2-8,3-7
      6-6,4-6
      2-6,4-8`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
