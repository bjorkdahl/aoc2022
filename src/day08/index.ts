import run from "aocrunner"

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split("").map(Number))

type Position = { x: number; y: number }

const findClosestDirectionToEdge = (
  x: number,
  y: number,
  height: number,
  width: number,
): ((x: number, y: number) => Position)[] => {
  const lengthByDirection: [number, (x: number, y: number) => Position][] = [
    [y, (x, y) => ({ x, y: y + 1 })], // down
    [height - y, (x, y) => ({ x, y: y - 1 })], // up
    [x, (x, y) => ({ x: x + 1, y })], // right
    [width - x, (x, y) => ({ x: x - 1, y })], // left
  ]
  return lengthByDirection.sort((a, b) => a[0] - b[0]).map((a) => a[1])
}

const isWithinMatrix = (x: number, y: number, matrix: number[][]) =>
  y >= 0 && y < matrix.length && x >= 0 && x < matrix[0].length

const checkDirection = (
  matrix: number[][],
  x: number,
  y: number,
  direction: (x: number, y: number) => Position,
): boolean => {
  const original = matrix[y][x]

  while (true) {
    const { x: nextX, y: nextY } = direction(x, y)

    if (!isWithinMatrix(nextX, nextY, matrix)) {
      return true
    }

    const next = matrix[nextY][nextX]

    if (next >= original) {
      return false
    }

    x = nextX
    y = nextY
  }

  return true
}

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  const height = matrix.length
  const width = matrix[0].length

  let amount = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const directionOrder = findClosestDirectionToEdge(x, y, height, width)
      const visible = directionOrder.some((direction) =>
        checkDirection(matrix, x, y, direction),
      )

      if (visible) {
        amount++
      }
    }
  }

  return amount
}

const countTrees = (
  matrix: number[][],
  x: number,
  y: number,
  direction: (x: number, y: number) => Position,
): number => {
  const original = matrix[y][x]
  let trees = 0

  while (true) {
    const { x: nextX, y: nextY } = direction(x, y)

    if (!isWithinMatrix(nextX, nextY, matrix)) {
      return trees
    }

    const next = matrix[nextY][nextX]

    if (original > next) {
      trees += 1
    } else {
      return trees + 1
    }

    x = nextX
    y = nextY
  }
}

const part2 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  const height = matrix.length
  const width = matrix[0].length

  let bestScenicScore = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const directionOrder = findClosestDirectionToEdge(x, y, height, width)
      const scenicScore = directionOrder
        .map((direction) => countTrees(matrix, x, y, direction))
        .reduce((a, b) => a * b, 1)

      if (scenicScore > bestScenicScore) {
        bestScenicScore = scenicScore
      }
    }
  }

  return bestScenicScore
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
