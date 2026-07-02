<template>
  <div>
    <div ref="dropZone"></div>
  </div>
</template>

<script setup lang="ts">
import Uppy from '@uppy/core'
import Tus, { type TusBody } from '@uppy/tus'
import DragDrop from '@uppy/drag-drop'
import { onMounted, onUnmounted, ref } from 'vue'

import '@uppy/core/css/style.min.css'
import '@uppy/drag-drop/css/style.min.css'

const dropZone = ref<HTMLElement | null>(null)

type MyMeta = {}

// Config Uppy ---

const uppy = new Uppy<MyMeta, TusBody>().use(Tus, { endpoint: 'http://cdn.lavageauto.fr:8081/' })

uppy.setOptions({
  autoProceed: true,
  restrictions: {
    maxNumberOfFiles: 1,
  },
})
//-----------

uppy.on('file-added', (file) => {
  console.log('Fichier ajouter: \nNom: ', file.name, '\nType :', file.type)
})

uppy.on('upload', (file) => {
  console.log('Upload commencé')
})

uppy.on('progress', (progress) => {
  console.log('Progresion du téléchargement : ', progress)
})

uppy.on('complete', (result) => {
  console.log('successful files:', result.successful)
  console.log('failed files:', result.failed)
})
onMounted(() => {
  uppy.use(DragDrop, { target: dropZone.value! })
})

onUnmounted(() => {
  uppy.cancelAll()
  uppy.destroy()
})
</script>

<style scoped></style>
