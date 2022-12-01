import run from "aocrunner"

// Split by two newlines
const parseInput = (rawInput: string) =>
  rawInput.split(/\r?\n\r?\n/).reduce((map, group, i) => {
    const calories = group.split(/\r?\n/).map(Number)
    map.set(i, calories)
    return map
  }, new Map<number, number[]>())

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return [...input.values()].reduce((largestTotal, group) => {
    const sumOfGroup = group.reduce((sum, num) => sum + num, 0)
    return sumOfGroup > largestTotal ? sumOfGroup : largestTotal
  }, 0)
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const sortedTotals = [...input.values()]
    .map((group) => group.reduce((sum, num) => sum + num, 0))
    .sort((a, b) => b - a)

  return sortedTotals.slice(0, 3).reduce((sum, num) => sum + num, 0)
}

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
