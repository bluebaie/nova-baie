'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Props = {
  images: string[]
  alt: string
}

export function ImageCarousel({ images, alt }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef(0)

  const prev = () =>
    setCurrentIndex((i) => (i > 0 ? i - 1 : images.length - 1))
  const next = () =>
    setCurrentIndex((i) => (i < images.length - 1 ? i + 1 : 0))

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta > 50) prev()
    else if (delta < -50) next()
  }

  if (images.length === 0) return null

  const single = images.length === 1

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden bg-nova-horizon"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Sliding strip */}
      <div
        className="flex h-full"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
          transition: 'transform 300ms ease',
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="relative h-full"
            style={{ width: `${100 / images.length}%` }}
          >
            <Image
              src={src}
              alt={`${alt} — ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Flèches — toujours visibles sur mobile, au hover sur desktop */}
      {!single && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Image précédente"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4 text-nova-navy" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Image suivante"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md backdrop-blur-sm transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4 text-nova-navy" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === currentIndex
                    ? 'h-1.5 w-4 bg-white'
                    : 'h-1.5 w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
