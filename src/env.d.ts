/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IMAGE_FALLBACK: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}