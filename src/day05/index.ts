import run from "aocrunner"

type Inventory = string[][]
type Instruction = {
  amount: number
  from: number
  to: number
}
type InventoryWithInstructions = {
  inventory: Inventory
  instructions: Instruction[]
}

const parseInput = (rawInput: string) => {
  const [rawInventory, rawInstructions] = rawInput.split("\n\n")

  const inventory: Inventory = rawInventory
    .split("\n")
    .filter((row) => row.includes("["))
    .reduce((inventory, row) => {
      for (let i = 1; i < row.length; i += 4) {
        if (row[i].trim() === "") continue
        const boxIndex = Number((i - 1) / 4)
        inventory[boxIndex] = [...(inventory[boxIndex] ?? []), row[i]]
      }

      return inventory
    }, [] as Inventory)

  const instructions: Instruction[] = rawInstructions.split("\n").map((row) => {
    const [amount, from, to] = row
      .replace("move ", "")
      .replace(" from ", "-")
      .replace(" to ", "-")
      .split("-")
      .map(Number)
    return { amount, from: from - 1, to: to - 1 }
  })

  return {
    inventory,
    instructions,
  } as InventoryWithInstructions
}

const part1 = (rawInput: string) => {
  const { inventory, instructions } = parseInput(rawInput)

  for (const { amount, from, to } of instructions) {
    const fromRow = inventory[from] ?? []
    const toRow = inventory[to] ?? []

    const boxesToMove = fromRow
      .slice(0, amount)
      .reduce((reversed, box) => [box, ...reversed], [] as string[])

    inventory[from] = fromRow.slice(amount)
    inventory[to] = [...boxesToMove, ...toRow]
  }

  return [...inventory.values()].map((pile) => pile[0]).join("")
}

const part2 = (rawInput: string) => {
  const { inventory, instructions } = parseInput(rawInput)

  for (const { amount, from, to } of instructions) {
    const fromRow = inventory[from] ?? []
    const toRow = inventory[to] ?? []

    const boxesToMove = fromRow.slice(0, amount)

    inventory[from] = fromRow.slice(amount)
    inventory[to] = [...boxesToMove, ...toRow]
  }

  return [...inventory.values()].map((pile) => pile[0]).join("")
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
