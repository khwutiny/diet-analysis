export function fetch (key) {
  return JSON.parse(window.localStorage.getItem(key) || '[]')
}

export function save (key, items) {
  window.localStorage.setItem(key, JSON.stringify(items))
}
