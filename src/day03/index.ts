import run from "aocrunner"

// Parse input
const parseInputP1 = (rawInput: string) =>
  rawInput.split("\n").map((row) => {
    const middle = Math.floor(row.length / 2)
    const first = row.slice(0, middle)
    const second = row.slice(middle)
    return [first, second] as [string, string]
  })

const parseInputP2 = (rawInput: string) => {
  const rucksacks = rawInput.split("\n")
  const groups: string[][] = []
  for (let i = 0; i < rucksacks.length; i += 3) {
    groups.push(rucksacks.slice(i, i + 3))
  }

  return groups
}

// Helpers
const findCommonItem = (group: string[]) => {
  const [first, ...rest] = group
  for (const item of first) {
    if (rest.every((rucksack) => rucksack.includes(item))) {
      return item
    }
  }

  throw new Error("No common item found")
}

const getPriority = (item: string) => {
  return item.charCodeAt(0) - 96 < 0
    ? item.charCodeAt(0) - 38
    : item.charCodeAt(0) - 96
}

// Solve
const part1 = (rawInput: string) => {
  const rucksacks = parseInputP1(rawInput)

  return rucksacks.reduce((totalPriority, rucksack) => {
    const item = findCommonItem(rucksack)
    return totalPriority + getPriority(item)
  }, 0)
}

const part2 = (rawInput: string) => {
  const groups = parseInputP2(rawInput)

  return groups.reduce((totalPriority, group) => {
    const item = findCommonItem(group)
    return totalPriority + getPriority(item)
  }, 0)
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
