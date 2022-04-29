export function getUniqueId(prefix = 'jot-id'): string {
  let i = 1

  while (document.querySelector(`#${prefix}${i}`)) {
    i += 1
  }

  return `${prefix}${i}`
}

export function focusElement(idOrElement: string | HTMLElement): void {
  // Note: nextTick() doesn't work
  let element: HTMLElement | null

  if (typeof idOrElement === 'string') {
    element = document.getElementById(idOrElement)
  } else {
    element = idOrElement
  }

  setTimeout(() => element?.focus(), 0)
}
