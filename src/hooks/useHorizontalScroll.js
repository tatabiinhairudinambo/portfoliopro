import { useState, useEffect, useRef, useCallback } from 'react'

const SECTION_IDS = ['hero', 'about', 'experience', 'portfolio', 'skills', 'testimonials', 'contact']

export function useHorizontalScroll() {
  const containerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollTo = useCallback((index) => {
    if (isAnimating) return
    setIsAnimating(true)
    const id = SECTION_IDS[index]
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
    }
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isDragging.current) return
      const index = Math.round(container.scrollLeft / window.innerWidth)
      setActiveIndex(Math.min(index, SECTION_IDS.length - 1))
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e) => {
      let target = e.target;
      let canScrollY = false;

      while (target && target !== container) {
        const style = window.getComputedStyle(target);
        if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
          const isAtTop = target.scrollTop <= 0;
          const isAtBottom = target.scrollTop >= target.scrollHeight - target.clientHeight - 1;
          
          if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            canScrollY = true;
            break;
          }
        }
        target = target.parentElement;
      }

      if (canScrollY) {
        // Biarkan browser melakukan scroll vertikal secara default
        return;
      }

      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (Math.abs(delta) < 5) return
      e.preventDefault()
      container.scrollBy({ left: delta, behavior: 'auto' })
    }

    // Gunakan passive: false agar kita bisa memanggil e.preventDefault()
    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    if (!container) return

    const onMouseDown = (e) => {
      isDragging.current = true
      dragStart.current = { x: e.pageX - container.offsetLeft, scrollLeft: container.scrollLeft }
      container.style.cursor = 'grabbing'
    }

    const onMouseUp = () => {
      isDragging.current = false
      container.style.cursor = 'grab'
    }

    const onMouseMove = (e) => {
      if (!isDragging.current) return
      e.preventDefault()
      const x = e.pageX - container.offsetLeft
      const walk = (x - dragStart.current.x) * 1.5
      container.scrollLeft = dragStart.current.scrollLeft - walk
    }

    container.addEventListener('mousedown', onMouseDown)
    container.addEventListener('mouseleave', onMouseUp)
    container.addEventListener('mouseup', onMouseUp)
    container.addEventListener('mousemove', onMouseMove)
    container.style.cursor = 'grab'

    return () => {
      container.removeEventListener('mousedown', onMouseDown)
      container.removeEventListener('mouseleave', onMouseUp)
      container.removeEventListener('mouseup', onMouseUp)
      container.removeEventListener('mousemove', onMouseMove)
      container.style.cursor = ''
    }
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    if (!container) return

    let touchStartX = 0
    let touchScrollLeft = 0

    const onTouchStart = (e) => {
      touchStartX = e.touches[0].pageX
      touchScrollLeft = container.scrollLeft
    }

    const onTouchMove = (e) => {
      const x = e.touches[0].pageX
      const walk = (x - touchStartX) * 1.5
      container.scrollLeft = touchScrollLeft - walk
    }

    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
    }
  }, [isMobile])

  useEffect(() => {
    if (!isMobile) return

    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isMobile])

  return { containerRef, activeIndex, scrollTo, isMobile, sectionIds: SECTION_IDS }
}
