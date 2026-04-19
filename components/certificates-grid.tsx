"use client"

import { motion } from "framer-motion"
import { Certificate } from "@/data/mock-data"
import Image from "next/image"

const ease = [0.22, 1, 0.36, 1]

interface CertificatesGridProps {
  certificates: Certificate[]
}

export function CertificatesGrid({ certificates }: CertificatesGridProps) {
  if (!certificates.length) return null

  const featured = certificates.slice(0, 1)
  const others = certificates.slice(1)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Featured certificate - larger left column */}
      {featured.map((cert, idx) => (
        <motion.a
          key={cert.id}
          href={cert.url || "#"}
          target={cert.url ? "_blank" : undefined}
          rel={cert.url ? "noopener noreferrer" : undefined}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1, ease }}
          className="lg:col-span-1 group cursor-pointer"
        >
          <div className="relative h-96 lg:h-full overflow-hidden border-2 border-foreground bg-background">
            {cert.image_url && (
              <Image
                src={cert.image_url}
                alt={cert.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
            <div className="absolute inset-0 flex flex-col justify-between p-4">
              <div className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-mono">
                FEATURED
              </div>
              <div className="text-white font-mono text-sm">
                <p className="font-bold text-balance">{cert.title}</p>
                <p className="text-xs text-white/70 mt-2">
                  {new Date(cert.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </motion.a>
      ))}

      {/* Other certificates - right column grid */}
      <div className="lg:col-span-2 grid grid-cols-2 gap-4">
        {others.map((cert, idx) => (
          <motion.a
            key={cert.id}
            href={cert.url || "#"}
            target={cert.url ? "_blank" : undefined}
            rel={cert.url ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: (idx + 1) * 0.1, ease }}
            className="group cursor-pointer"
          >
            <div className="relative h-48 overflow-hidden border-2 border-foreground bg-background">
              {cert.image_url && (
                <Image
                  src={cert.image_url}
                  alt={cert.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-3">
                <p className="text-white font-mono text-xs font-bold text-balance line-clamp-2">
                  {cert.title}
                </p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
