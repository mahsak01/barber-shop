"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react"

type BubbleColors = {
  first: string
  second: string
}

type BubbleBackgroundProps = React.ComponentProps<"div"> & {
  interactive?: boolean
  transition?: SpringOptions
  colors?: BubbleColors
}

function BubbleBackground({
                            ref,
                            className,
                            children,
                            interactive = false,
                            transition = { stiffness: 100, damping: 20 },
                            colors = {
                              first: "192,132,252", // purple-400 (بنفش)
                              second: "249,168,212", // pink-300 (صورتی)
                            },
                            ...props
                          }: BubbleBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, transition)
  const springY = useSpring(mouseY, transition)

  const rectRef = React.useRef<DOMRect | null>(null)
  const rafIdRef = React.useRef<number | null>(null)

  React.useLayoutEffect(() => {
    const updateRect = () => {
      if (containerRef.current) {
        rectRef.current = containerRef.current.getBoundingClientRect()
      }
    }

    updateRect()

    const el = containerRef.current
    const ro = new ResizeObserver(updateRect)
    if (el) ro.observe(el)

    window.addEventListener("resize", updateRect)
    window.addEventListener("scroll", updateRect, { passive: true })

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", updateRect)
      window.removeEventListener("scroll", updateRect)
    }
  }, [])

  React.useEffect(() => {
    if (!interactive) return

    const el = containerRef.current
    if (!el) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = rectRef.current
      if (!rect) return
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = requestAnimationFrame(() => {
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
      })
    }

    el.addEventListener("mousemove", handleMouseMove as EventListener, {
      passive: true,
    })
    return () => {
      el.removeEventListener("mousemove", handleMouseMove as EventListener)
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [interactive, mouseX, mouseY])

  const containerClassName = `relative size-full overflow-hidden bg-white ${className || ""}`.trim()

  return (
      <div ref={containerRef} data-slot="bubble-background" className={containerClassName} {...props}>
        <style>
          {`
            :root {
              --first-color: ${colors.first};
              --second-color: ${colors.second};
            }
          `}
        </style>

        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0" style={{ filter: "url(#goo) blur(40px)" }}>
          <motion.div
              className="absolute inset-0 flex justify-center items-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <div
                className="absolute rounded-full size-[80%] bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.3)_0%,rgba(var(--first-color),0)_50%)]"
                style={{ top: "10%", left: "10%" }}
            />
          </motion.div>

          <motion.div
              className="absolute inset-0 flex justify-center items-center"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
              style={{ transform: "translateZ(0)", willChange: "transform" }}
          >
            <div
                className="absolute rounded-full size-[75%] bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.3)_0%,rgba(var(--second-color),0)_50%)]"
                style={{ top: "40%", left: "30%" }}
            />
          </motion.div>

          {interactive && (
              <motion.div
                  className="absolute rounded-full size-full bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.2)_0%,rgba(var(--first-color),0)_50%)] opacity-50"
                  style={{
                    x: springX,
                    y: springY,
                    transform: "translateZ(0)",
                    willChange: "transform",
                  }}
              />
          )}
        </div>

        {children}
      </div>
  )
}

export { BubbleBackground, type BubbleBackgroundProps }
