
import * as React from "react"

// Define breakpoints for different screen sizes with buffer zones
export const BREAKPOINTS = {
  MOBILE: 768,  // Changed to match Tailwind's md breakpoint
  TABLET: 1024,  // lg in tailwind
  DESKTOP: 1280 // xl in tailwind
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.MOBILE - 1}px)`)
    
    const onChange = () => {
      const newIsMobile = window.innerWidth < BREAKPOINTS.MOBILE
      console.log('Mobile detection changed:', newIsMobile, 'width:', window.innerWidth)
      setIsMobile(newIsMobile)
    }
    
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth
      return width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.DESKTOP
    }
    
    const mql = window.matchMedia(
      `(min-width: ${BREAKPOINTS.MOBILE}px) and (max-width: ${BREAKPOINTS.DESKTOP - 1}px)`
    )
    
    const onChange = () => {
      setIsTablet(checkTablet())
    }
    
    mql.addEventListener("change", onChange)
    setIsTablet(checkTablet())
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isTablet
}

export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.DESKTOP}px)`)
    
    const onChange = () => {
      setIsDesktop(window.innerWidth >= BREAKPOINTS.DESKTOP)
    }
    
    mql.addEventListener("change", onChange)
    setIsDesktop(window.innerWidth >= BREAKPOINTS.DESKTOP)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isDesktop
}

export function useBreakpoint() {
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()
  const isDesktop = useIsDesktop()

  return {
    isMobile,
    isTablet,
    isDesktop,
    current: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
  }
}
