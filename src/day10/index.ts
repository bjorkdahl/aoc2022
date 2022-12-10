import run from "aocrunner"

type Operation = "addx" | "noop"
type Instruction = [Operation, number]

const parseInput = (rawInput: string): Instruction[] =>
  rawInput.split("\n").map((a) => {
    const [operation, argument] = a.split(" ")
    return [operation, Number(argument)] as Instruction
  })

const part1 = (rawInput: string) => {
  const cycles = [20, 60, 100, 140, 180, 220]
  const instructions = parseInput(rawInput)
  let cycle = 0
  let X = 1

  const signalStrengths = []

  for (const [operation, argument] of instructions) {
    if (operation === "addx") {
      cycle += 1
      if (cycles.includes(cycle)) {
        signalStrengths.push(X * cycle)
      }
      cycle += 1
      if (cycles.includes(cycle)) {
        signalStrengths.push(X * cycle)
      }
      X += argument
    }

    if (operation === "noop") {
      cycle += 1
      if (cycles.includes(cycle)) {
        signalStrengths.push(X * cycle)
      }
    }
  }

  return signalStrengths.reduce((a, b) => a + b, 0)
}

const showScreen = (screen: string[][]) => {
  console.clear()
  for (const row of screen) {
    console.log(row.join(""))
  }
}

const part2 = (rawInput: string) => {
  const screen = new Array(6).fill("").map(() => new Array(40).fill("."))
  const instructions = parseInput(rawInput)
  let cycle = 0
  let X = 1
  let spritePosition = new Array(40)
    .fill(false)
    .map((_, i) => (Math.abs(i - X) < 2 ? true : false))

  for (const [operation, argument] of instructions) {
    let screenX = cycle % 40
    let screenY = Math.floor(cycle / 40)

    if (operation === "addx") {
      screenX = cycle % 40
      screenY = Math.floor(cycle / 40)
      cycle += 1
      screen[screenY][screenX] = spritePosition[screenX] ? "#" : "."

      screenX = cycle % 40
      screenY = Math.floor(cycle / 40)
      cycle += 1
      screen[screenY][screenX] = spritePosition[screenX] ? "#" : "."
      X += argument
      spritePosition = new Array(40)
        .fill(false)
        .map((_, i) => (Math.abs(i - X) < 2 ? true : false))
    }

    if (operation === "noop") {
      screenX = cycle % 40
      screenY = Math.floor(cycle / 40)
      cycle += 1
      screen[screenY][screenX] = spritePosition[screenX] ? "#" : "."
    }
  }

  showScreen(screen)
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
