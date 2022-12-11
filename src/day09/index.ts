import run from "aocrunner"

type Position = { x: number; y: number }
type Direction = "U" | "D" | "L" | "R"
type Move = (x: number, y: number) => Position
type Instruction = [Direction, number]

const parseInput = (rawInput: string): Instruction[] =>
  rawInput.split("\n").map((a) => {
    const [direction, length] = a.split(" ")
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

  return new Array(length).fill(0).map(() => movesByDirection[direction])
}

const initMatrix = (width: number, height: number): boolean[][] =>
  new Array(height).fill(false).map(() => new Array(width).fill(false))

const isNotAdjacent = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs(x1 - x2) > 1 || Math.abs(y1 - y2) > 1

const part1 = (rawInput: string) => {
  const instructions = parseInput(rawInput)
  const matrix: boolean[][] = initMatrix(400, 400)
  let headPosition: Position = { x: 200, y: 200 }
  let tailPosition: Position = { x: 200, y: 200 }

  for (const [direction, length] of instructions) {
    const moves = getMoves(direction, length)
    for (const move of moves) {
      const newHeadPosition = move(headPosition.x, headPosition.y)
      if (
        isNotAdjacent(
          newHeadPosition.x,
          newHeadPosition.y,
          tailPosition.x,
          tailPosition.y,
        )
      ) {
        tailPosition = headPosition
      }

      headPosition = newHeadPosition

      matrix[tailPosition.y][tailPosition.x] = true
    }
  }

  return matrix.flat().filter(Boolean).length
}

const part2 = (rawInput: string) => {
  const instructions = parseInput(rawInput)
  const matrix: boolean[][] = initMatrix(400, 400)
  let headPosition: Position = { x: 200, y: 200 }
  let tailPositions: Position[] = new Array(9)
    .fill({})
    .map(() => ({ x: 200, y: 200 }))

  for (const [direction, length] of instructions) {
    const moves = getMoves(direction, length)
    for (const move of moves) {
      const previousHead = headPosition
      headPosition = move(headPosition.x, headPosition.y)

      let previousKnotPositionBeforeMove = previousHead

      for (let i = 0; i < tailPositions.length; i++) {
        const previousKnotPositionAfterMove =
          i === 0 ? headPosition : tailPositions[i - 1]
        const tailPosition = tailPositions[i]
        if (
          isNotAdjacent(
            previousKnotPositionAfterMove.x,
            previousKnotPositionAfterMove.y,
            tailPosition.x,
            tailPosition.y,
          )
        ) {
          tailPositions[i] = previousKnotPositionBeforeMove
        }

        if (i === tailPositions.length - 1) {
          matrix[tailPositions[i].y][tailPositions[i].x] = true
        }

        previousKnotPositionBeforeMove = tailPosition
      }
    }
  }

  return matrix.flat().filter(Boolean).length
}

run({
  part1: {
    tests: [
      {
        input: `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`,
        expected: 36,
      },
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
