declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean
    }
  }
  var UnicornStudio: {
    init: () => void
  } | undefined
}

export {}

