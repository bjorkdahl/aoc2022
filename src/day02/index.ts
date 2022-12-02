import run from "aocrunner"

const parseInput = (rawInput: string): Game[] =>
  rawInput.split("\n").map((row: string) => row.split(" ") as Game)

/* Types
/* A is Rock, B is Paper, C is Scissors */
/* X is Rock, Y is Paper, Z is Scissors */

type Move = "A" | "B" | "C"
type Response = "X" | "Y" | "Z"
type Game = [Move, Response]

const scoreMatrix: Record<Move, Record<Response, number>> = {
  A: { X: 4, Y: 8, Z: 3 },
  B: { X: 1, Y: 5, Z: 9 },
  C: { X: 7, Y: 2, Z: 6 },
}

const part1 = (rawInput: string) => {
  const games = parseInput(rawInput)

  return games.reduce(
    (totalScore, game) => totalScore + scoreMatrix[game[0]][game[1]],
    0,
  )
}

/* Outcome wanted */
/* X means needs to lose, Y means needs to draw, Z means needs to win */

const responseMatrix: Record<Move, Record<Response, Response>> = {
  A: { X: "Z", Y: "X", Z: "Y" },
  B: { X: "X", Y: "Y", Z: "Z" },
  C: { X: "Y", Y: "Z", Z: "X" },
}

const part2 = (rawInput: string) => {
  const games = parseInput(rawInput)

  return games.reduce((totalScore, game) => {
    const [move, neededOutcome] = game
    const response = responseMatrix[move][neededOutcome]
    return totalScore + scoreMatrix[move][response]
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
