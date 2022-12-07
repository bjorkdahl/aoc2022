import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput.split("")

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput)

  for (let i = 3; i < input.length; i += 1) {
    const [a, b, c, d] = input.slice(i - 4, i)
    if (new Set([a, b, c, d]).size === 4) {
      return i
    }
  }
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  for (let i = 13; i < input.length; i += 1) {
    const data = input.slice(i - 14, i)
    if (new Set(data).size === 14) {
      return i
    }
  }
}

run({
  part1: {
    tests: [
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 5,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 6,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 10,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
      {
        input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
        expected: 23,
      },
      {
        input: `nppdvjthqldpwncqszvftbrmjlhg`,
        expected: 23,
      },
      {
        input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
        expected: 29,
      },
      {
        input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
        expected: 26,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
