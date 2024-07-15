import {} from './data'

// Перевод размера файла в читабильный вид
export function fileSize(size) {
    return ((size/1024).toFixed(1) < 1000 ? (size/1024).toFixed(1) + ' Kb' : ((size/1024)/1024).toFixed(1) + ' Mb');
  }