import run from "aocrunner"

const enum Operation {
  ChangeDirectory = "cd",
  List = "ls",
}

type FileData = {
  fileName: string
  fileSize: number
}

type DirectoryData = {
  directoryName: string
}

type Output = FileData | DirectoryData

type Command = {
  operation: Operation
  argument?: string
  output?: Output[]
}

const isFileData = (data: Output): data is FileData => "fileName" in data
const isDirectoryData = (data: Output): data is DirectoryData =>
  "directoryName" in data

const parseInput = (rawInput: string): Command[] =>
  rawInput.split("$ ").map((cmd) => {
    const [commandRow, ...outputRaw] = cmd.split("\n")
    const [operation, argument] = commandRow.replace("$ ", "").split(" ")
    const output: Output[] = outputRaw
      .slice(0, outputRaw.length - 1)
      .map((row) => {
        const [first, second] = row.trim().split(" ")

        if (first === "dir") {
          return { directoryName: second }
        }

        return { fileName: second, fileSize: Number(first) }
      })

    return {
      operation: operation as Operation,
      ...(argument && { argument }),
      ...(output.length && { output }),
    }
  })

type Directory = {
  path: string
  directories: string[]
  files: FileData[]
  size?: number
}

type FileSystem = Map<string, Directory>

const buildFileSystem = (commands: Command[]) => {
  let currentDirectory = "/"
  const fileSystem: FileSystem = new Map<string, Directory>()
  for (const command of commands) {
    if (command.operation === Operation.ChangeDirectory) {
      if (command.argument === "..") {
        currentDirectory = currentDirectory.split("/").slice(0, -1).join("/")
      } else {
        currentDirectory += `/${command.argument}`
      }
    }

    if (command.operation === Operation.List && command.output) {
      for (const output of command.output) {
        if (isFileData(output)) {
          const directory = fileSystem.get(currentDirectory) ?? {
            path: currentDirectory,
            directories: [],
            files: [],
          }

          directory.files.push(output)

          fileSystem.set(currentDirectory, directory)
        }

        if (isDirectoryData(output)) {
          const directory = fileSystem.get(currentDirectory) ?? {
            path: currentDirectory,
            directories: [],
            files: [],
          }

          directory.directories.push(
            `${currentDirectory}${output.directoryName}`,
          )

          fileSystem.set(currentDirectory, directory)
        }
      }
    }
  }

  return fileSystem
}

const addFileSize = (fileSystem: FileSystem) => {
  for (const path of fileSystem.keys()) {
    const directory = fileSystem.get(path)
    if (!directory) continue

    const size = directory.files.reduce((acc, file) => acc + file.fileSize, 0)
    fileSystem.set(path, { ...directory, size })
  }

  return fileSystem
}

const addChildrensSize = (fileSystem: FileSystem) => {
  const fileSystemCopy = new Map(fileSystem)

  for (const path of fileSystem.keys()) {
    const directory = fileSystem.get(path)
    if (!directory) continue

    const childDirectoryPaths = [...fileSystemCopy.keys()].filter(
      (key) => key !== path && key.startsWith(path),
    )

    const childDirectorySizes = childDirectoryPaths.map(
      (path) => fileSystem.get(path)?.size ?? 0,
    )

    const size =
      (directory.size ?? 0) +
      childDirectorySizes.reduce((acc, size) => acc + size, 0)

    fileSystem.set(path, { ...directory, size })
  }
  return fileSystem
}

const part1 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  const fileSystem: FileSystem = buildFileSystem(commands)

  const fileSystemWithSize = addFileSize(fileSystem)

  const fileSystemWithChildrensSize = addChildrensSize(fileSystemWithSize)

  return [...fileSystemWithChildrensSize.values()].reduce((sum, directory) => {
    if (directory.size && directory.size <= 100000) {
      return sum + directory.size
    }

    return sum
  }, 0)
}

const part2 = (rawInput: string) => {
  const commands = parseInput(rawInput)
  const totalDiscSpace = 70000000
  const neededDiscSpace = 30000000

  const fileSystem: FileSystem = buildFileSystem(commands)

  const fileSystemWithSize = addFileSize(fileSystem)

  const fileSystemWithChildrensSize = addChildrensSize(fileSystemWithSize)

  const totalSizeUsed = fileSystemWithChildrensSize.get("///")?.size ?? 0
  const totalFreeSize = totalDiscSpace - totalSizeUsed
  const totalSizeNeededToBeFree = neededDiscSpace - totalFreeSize

  const [path] = [...fileSystemWithChildrensSize.entries()].reduce(
    ([p, c], [path, directory]) => {
      if (directory.size && directory.size >= totalSizeNeededToBeFree) {
        const diff = Math.abs(directory.size - totalSizeNeededToBeFree)
        if (diff < c) {
          return [path, diff]
        }
      }

      return [p, c]
    },
    ["", Infinity] as [string, number],
  )

  return fileSystem.get(path)?.size ?? 0
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
