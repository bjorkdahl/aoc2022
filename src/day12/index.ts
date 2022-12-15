import run from "aocrunner"

type Position = {
  x: number
  y: number
}

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((row) => row.split(""))

const getPosition = (grid: string[][], value: string): Position => {
  const y = grid.findIndex((row) => row.includes(value))
  const x = grid[y].indexOf(value)
  return { x, y }
}

const findStartAndEnd = (
  matrix: string[][],
): { start: Position; end: Position } => {
  const start = getPosition(matrix, "S")
  const end = getPosition(matrix, "E")
  return { start, end }
}

const findAvailablePaths = (
  current: Position,
  matrix: string[][],
): Position[] => {
  const charCode = matrix[current.y][current.x].charCodeAt(0)
  const currentHeight = charCode === 83 ? "a".charCodeAt(0) : charCode
  const allowedHeight = (position: Position) =>
    matrix[position.y][position.x].charCodeAt(0) <= currentHeight + 1
  return [
    { x: current.x + 1, y: current.y },
    { x: current.x - 1, y: current.y },
    { x: current.x, y: current.y + 1 },
    { x: current.x, y: current.y - 1 },
  ].filter(
    (position) =>
      position.y >= 0 &&
      position.x >= 0 &&
      matrix[position.y] &&
      matrix[position.y][position.x] &&
      allowedHeight(position),
  )
}

const equals = (current: Position, target: Position): boolean =>
  current.x === target.x && current.y === target.y

const getPositionKey = (position: Position): string =>
  `${position.y},${position.x}`

const bfs = (start: Position, end: Position, matrix: string[][]): number => {
  const queue: [Position, number][] = [[start, 0]]
  const visited: Map<string, number> = new Map()

  while (queue.length) {
    const [current, length] = queue.shift()!
    if (visited.has(getPositionKey(current))) continue
    visited.set(getPositionKey(current), length)

    if (equals(current, end)) {
      return length
    }

    const availablePaths = findAvailablePaths(current, matrix)
    for (const path of availablePaths) {
      queue.push([path, length + 1])
    }
  }

  return Infinity
}

const part1 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  const { start, end } = findStartAndEnd(matrix)
  return bfs(start, end, matrix)
}

const findAllStartingPositions = (matrix: string[][]): Position[] => {
  const positions: Position[] = []
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === "a") {
        positions.push({ x, y })
      }
    }
  }
  return positions
}

const part2 = (rawInput: string) => {
  const matrix = parseInput(rawInput)
  const { end } = findStartAndEnd(matrix)
  const startingPositions = findAllStartingPositions(matrix)

  return startingPositions.reduce((shortest, startingPosition) => {
    const length = bfs(startingPosition, end, matrix)
    return length < shortest ? length : shortest
  }, Infinity)
}

run({
  part1: {
    tests: [
      {
        input: `
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi`,
        expected: 31,
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
