import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, X, Upload, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function ImageUpload({ 
  type = "profile", // or "cover"
  currentImage,
  onImageChange 
}) {
  const [preview, setPreview] = useState(currentImage)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageChange?.(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageChange?.(file)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div 
      className={cn(
        "relative group",
        type === "cover" && "w-full h-48",
        type === "profile" && "h-32 w-32"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <motion.div 
        className={cn(
          "relative overflow-hidden",
          type === "cover" && "w-full h-full",
          type === "profile" && "h-32 w-32 rounded-xl ring-4 ring-background shadow-xl",
          isDragging && "ring-2 ring-primary"
        )}
      >
        {preview ? (
          <>
            <img 
              src={preview} 
              alt={`${type} image`}
              className={cn(
                "w-full h-full object-cover",
                type === "profile" && "rounded-xl"
              )}
            />
            <motion.button
              onClick={() => setPreview(null)}
              className={cn(
                "absolute top-2 right-2 p-1.5 rounded-full",
                "bg-red-500/10 text-red-500",
                "hover:bg-red-500/20 transition-colors"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-4 w-4" />
            </motion.button>
          </>
        ) : (
          <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center",
            "bg-gradient-to-br from-primary/5 to-primary/10",
            isDragging && "bg-primary/20"
          )}>
            <motion.div
              animate={{ 
                y: isDragging ? -5 : 0,
                scale: isDragging ? 1.1 : 1
              }}
              className="text-center"
            >
              <Upload className={cn(
                "h-8 w-8 mx-auto mb-2",
                isDragging ? "text-primary" : "text-muted-foreground"
              )} />
              <p className="text-sm font-medium text-muted-foreground">
                {isDragging ? "Drop image here" : "Drag & drop or click to upload"}
              </p>
            </motion.div>
          </div>
        )}

        <motion.button
          onClick={() => inputRef.current?.click()}
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-black/50 opacity-0 group-hover:opacity-100",
            "transition-opacity backdrop-blur-sm"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Camera className="h-6 w-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Upload Progress Indicator */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className={cn(
              "absolute -bottom-2 left-1/2 -translate-x-1/2",
              "bg-primary text-white px-3 py-1 rounded-full text-xs",
              "shadow-lg shadow-primary/20"
            )}
          >
            Image uploaded
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 