import type { Directive, DirectiveBinding } from 'vue'

const vLazy: Directive = {
  beforeMount(el: HTMLImageElement, binding: DirectiveBinding) {
    const loadImage = () => {
      const src = binding.value

      if (typeof src === 'string' && src.startsWith('@/')) {
        const modules = import.meta.glob('/src/assets/icons/**')
        const resolvedPath = src.replace('@/', '/src/')

        if (modules[resolvedPath]) {
          modules[resolvedPath]().then((mod: any) => {
            el.src = mod.default
          })
        } else {
          console.error(`Image not found: ${src}`)
        }
      } else {
        el.src = src
      }
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(el)
        }
      })
    })

    observer.observe(el)
  }
}

export default vLazy
