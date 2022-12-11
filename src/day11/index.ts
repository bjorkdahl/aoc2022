import run from "aocrunner"

type Monkey = {
  id: number
  items: number[]
  divisibleBy: number
  operation: (old: number) => number
  test: (worryLevel: number) => number
}

const parseInput = (rawInput: string): Monkey[] =>
  rawInput.split("\n\n").map((monkey) => {
    const rows = monkey.split("\n")
    const id = Number(rows[0].split(" ")[1].replace(":", ""))
    const items = rows[1]
      .split(": ")[1]
      .split(" ")
      .map((a) => a.replace(",", ""))
      .map(Number)

    const [operator, argument] = rows[2].split("= old ")[1].split(" ")

    let operation = (old: number) => 1
    if (operator === "*") {
      if (argument === "old") {
        operation = (old: number) => old * old
      } else {
        operation = (old: number) => old * Number(argument)
      }
    } else if (operator === "+") {
      if (argument === "old") {
        operation = (old: number) => old + old
      } else {
        operation = (old: number) => old + Number(argument)
      }
    }

    const divisibleBy = Number(rows[3].split("by ")[1])
    const testTrue = Number(rows[4].split("monkey ")[1])
    const testFalse = Number(rows[5].split("monkey ")[1])
    return {
      id,
      items,
      divisibleBy,
      operation,
      test: (worryLevel: number) =>
        worryLevel % divisibleBy === 0 ? testTrue : testFalse,
    }
  })

const part1 = (rawInput: string): number => {
  const monkeys = parseInput(rawInput)
  const inspectionsByMonkey: Record<string, number> = {}

  for (let round = 0; round < 20; round++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
      const monkey = monkeys[monkeyIndex]

      inspectionsByMonkey[monkeyIndex] =
        (inspectionsByMonkey[monkeyIndex] ?? 0) + monkey.items.length
      for (const item of monkey.items) {
        const newWorryLevel = Math.floor(monkey.operation(item) / 3)
        const targetMonkey = monkey.test(newWorryLevel)
        monkeys[targetMonkey].items.push(newWorryLevel)
      }

      monkeys[monkeyIndex].items = []
    }
  }

  const [first, second] = Object.values(inspectionsByMonkey).sort(
    (a, b) => b - a,
  )

  return first * second
}

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput)
  const inspectionsByMonkey: Record<string, number> = {}
  const productOfDivisors = monkeys
    .map((m) => m.divisibleBy)
    .reduce((acc, cur) => acc * cur, 1)

  for (let round = 0; round < 10000; round++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
      const monkey = monkeys[monkeyIndex]

      inspectionsByMonkey[monkeyIndex] =
        (inspectionsByMonkey[monkeyIndex] ?? 0) + monkey.items.length

      for (const item of monkey.items) {
        const newWorryLevel = monkey.operation(item) % productOfDivisors
        const targetMonkey = monkey.test(newWorryLevel)
        monkeys[targetMonkey].items.push(newWorryLevel)
      }

      monkeys[monkeyIndex].items = []
    }
  }

  const [first, second] = Object.values(inspectionsByMonkey).sort(
    (a, b) => b - a,
  )

  return first * second
}

run({
  part1: {
    tests: [
      {
        input: `
        Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3

      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Monkey 0:
        Starting items: 79, 98
        Operation: new = old * 19
        Test: divisible by 23
          If true: throw to monkey 2
          If false: throw to monkey 3

      Monkey 1:
        Starting items: 54, 65, 75, 74
        Operation: new = old + 6
        Test: divisible by 19
          If true: throw to monkey 2
          If false: throw to monkey 0
      
      Monkey 2:
        Starting items: 79, 60, 97
        Operation: new = old * old
        Test: divisible by 13
          If true: throw to monkey 1
          If false: throw to monkey 3
      
      Monkey 3:
        Starting items: 74
        Operation: new = old + 3
        Test: divisible by 17
          If true: throw to monkey 0
          If false: throw to monkey 1`,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
