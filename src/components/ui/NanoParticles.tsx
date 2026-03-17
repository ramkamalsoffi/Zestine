'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
  offsetX: number
  offsetY: number
  speedFactor: number
  rangeFactor: number
}

export default function NanoParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mousePos = useRef({ x: -999, y: -999 })
  const prevMousePos = useRef({ x: -999, y: -999 })

  // Initialize particles
  useEffect(() => {
    const particleCount = 300
    const initialParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => {
      const x = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)
      const y = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
      return {
        id: i,
        x: x,
        y: y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3, // Much slower random drift
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2.0 + 1.0, // Larger for visibility
        opacity: Math.random() * 0.4 + 0.4, // More opaque base
        offsetX: 0,
        offsetY: 0,
        speedFactor: Math.random() * 0.5 + 0.5,
        rangeFactor: Math.random() * 0.8 + 0.6,
      }
    })
    particlesRef.current = initialParticles
  }, [])

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const particleCount = 450
      particlesRef.current = Array.from({ length: particleCount }, (_, i) => {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        return {
          id: i,
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2.0 + 1.0,
          opacity: Math.random() * 0.4 + 0.4,
          offsetX: 0,
          offsetY: 0,
          speedFactor: Math.random() * 0.5 + 0.5,
          rangeFactor: Math.random() * 0.8 + 0.6,
        }
      })
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const time = Date.now() * 0.001
      const mouseDx = mousePos.current.x - prevMousePos.current.x
      const mouseDy = mousePos.current.y - prevMousePos.current.y

      particlesRef.current.forEach((particle) => {
        // ── Autonomous Flow ──
        particle.baseX += particle.vx
        particle.baseY += particle.vy

        // ── Smooth Mouse Reaction ──
        const baseMultiplier = 10 // Reduced for gentler response
        const baseLerpFactor = 0.0005 // Slower follow

        const targetOffsetX = mouseDx * baseMultiplier * particle.rangeFactor
        const targetOffsetY = mouseDy * baseMultiplier * particle.rangeFactor

        particle.offsetX += (targetOffsetX - particle.offsetX) * baseLerpFactor * particle.speedFactor
        particle.offsetY += (targetOffsetY - particle.offsetY) * baseLerpFactor * particle.speedFactor

        // ── Constant Circular "Swim" ──
        // Much slower (0.4) and smaller (15) motion
        const swimX = Math.sin(time * 0.4 + particle.id) * 15 * particle.rangeFactor
        const swimY = Math.cos(time * 0.4 + particle.id) * 15 * particle.rangeFactor

        const x = particle.baseX + particle.offsetX + swimX
        const y = particle.baseY + particle.offsetY + swimY

        // Wrap around screen
        if (x < -100) particle.baseX += canvas.width + 200
        if (x > canvas.width + 100) particle.baseX -= canvas.width + 200
        if (y < -100) particle.baseY += canvas.height + 200
        if (y > canvas.height + 100) particle.baseY -= canvas.height + 200

        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      prevMousePos.current = { x: mousePos.current.x, y: mousePos.current.y }
      requestAnimationFrame(animate)
    }

    const animReq = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animReq)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
