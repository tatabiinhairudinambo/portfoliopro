import { useState } from 'react'
import { supabase } from '../../supabaseClient'

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0]
      if (!file) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio-media')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data } = supabase.storage.from('portfolio-media').getPublicUrl(filePath)
      
      // Update the parent component
      onChange(data.publicUrl)

    } catch (error) {
      alert('Error uploading image: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="w-full">
      {label && <label className="block text-zinc-300 mb-1 font-mono text-sm">{label}</label>}
      <div className="flex flex-col gap-3">
        {value && (
          <img src={value} alt="Preview" className="h-24 w-auto object-contain bg-zinc-800 rounded border border-zinc-700" />
        )}
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 px-4 py-2 rounded-lg text-sm text-white transition-colors">
            {uploading ? 'Mengupload...' : 'Pilih Gambar'}
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleUpload}
              disabled={uploading}
              className="hidden" 
            />
          </label>
          <input 
            type="text" 
            value={value || ''} 
            onChange={(e) => onChange(e.target.value)}
            placeholder="Atau paste URL gambar di sini"
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white text-sm" 
          />
        </div>
      </div>
    </div>
  )
}
