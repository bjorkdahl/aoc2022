import run from "aocrunner"

type Position = { x: number; y: number }
type Direction = "U" | "D" | "L" | "R"
type Move = (x: number, y: number) => Position
type Instruction = [Direction, number]

const parseInput = (rawInput: string): Instruction[] =>
  rawInput.split("\n").map((a) => {
    const [direction, length] = a.split("")
    return [direction as Direction, Number(length)]
  })

const getMoves = (
  direction: Direction,
  length: number,
): ((x: number, y: number) => Position)[] => {
  const movesByDirection: Record<Direction, Move> = {
    D: (x, y) => ({ x, y: y + 1 }),
    U: (x, y) => ({ x, y: y - 1 }),
    R: (x, y) => ({ x: x + 1, y }),
    L: (x, y) => ({ x: x - 1, y }),
  }

  return new Array({ length }).map(() => movesByDirection[direction])
}

const initMatrix = (width: number, height: number): boolean[][] =>
  new Array(height).fill(false).map(() => new Array(width).fill(false))

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput)
  const matrix: boolean[][] = initMatrix(1000, 1000)
  let currentPosition: Position = { x: 500, y: 500 }

  for (const [direction, length] of instructions) {
    const moves = getMoves(direction, length)
    for (const move of moves) {
      const { x, y } = move(currentPosition.x, currentPosition.y)
      matrix[y][x] = true
    }
  }
  return
}

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  return
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
