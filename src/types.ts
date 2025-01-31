import type {MatchImageSnapshotOptions} from 'jest-image-snapshot'

declare global {
  namespace Cypress {
    interface Chainable {
      matchImageSnapshot(
        nameOrCommandOptions?: CypressImageSnapshotOptions | string,
      ): Chainable<DiffSnapshotResult>
      matchImageSnapshot(
        name: string,
        commandOptions: CypressImageSnapshotOptions,
      ): Chainable<DiffSnapshotResult>
    }
  }
}

type CypressScreenshotOptions = Partial<Cypress.ScreenshotOptions>

// The options that are passed around internally from command to plugin
export type SnapshotOptions = {
  screenshotsFolder: string
  isUpdateSnapshots: boolean
  isSnapshotDebug: boolean
  specFileRelativeToRoot: string
  currentTestTitle: string
  e2eSpecDir: string
  snapFilenameExtension: string
  diffFilenameExtension: string
  useRelativeSnapshotsDir: boolean
} & CypressScreenshotOptions &
  MatchImageSnapshotOptions

// The options that are exposed to the user via `matchImageSnapshot`
// Prevents the private properties above from showing up in autocomplete
// Merges both Cypress and jest-image-snapshot options together. Not ideal
// if one day they choose a clashing key, but this way it keeps the public
// API non breaking
export type CypressImageSnapshotOptions = Partial<
  CypressScreenshotOptions & MatchImageSnapshotOptions
> & {
  e2eSpecDir?: string
  snapFilenameExtension?: string
  diffFilenameExtension?: string
  useRelativeSnapshotsDir?: boolean;
}

export type Subject =
  | void
  | Document
  | Window
  | Cypress.JQueryWithSelector<HTMLElement>

export type DiffSnapshotResult = {
  added?: boolean
  receivedSnapshotPath?: string
  updated?: boolean
  imgSrcString: string
  imageDimensions: {
    baselineHeight: number
    baselineWidth: number
    receivedWidth: number
    receivedHeight: number
  }
  pass: boolean
  diffSize: boolean
  diffOutputPath: string
  diffRatio: number
  diffPixelCount: number
}

export type DiffSnapshotOptions = {
  receivedImageBuffer: Buffer
  snapshotIdentifier: string
  snapshotsDir: string
  storeReceivedOnFailure?: boolean
  receivedDir?: string
  diffDir?: string
  updateSnapshot?: boolean
  updatePassedSnapshot?: boolean
  customDiffConfig?: Record<string, unknown>
} & Pick<
  MatchImageSnapshotOptions,
  | 'comparisonMethod'
  | 'blur'
  | 'allowSizeMismatch'
  | 'diffDirection'
  | 'onlyDiff'
  | 'failureThreshold'
  | 'failureThresholdType'
>
