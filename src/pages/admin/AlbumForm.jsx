import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../supabaseClient'
import ImageUpload from '../../components/admin/ImageUpload'

export default function AlbumForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    type: 'image',
    thumbnail: '',
    class_name: 'col-span-12 md:col-span-4'
  })

  useEffect(() => {
    if (id) fetchAlbum()
  }, [id])

  const fetchAlbum = async () => {
    const { data, error } = await supabase.from('albums').select('*').eq('id', id).single()
    if (error) console.error(error)
    else setFormData(data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (id) {
      const { error } = await supabase.from('albums').update(formData).eq('id', id)
      if (error) alert('Error: ' + error.message)
      else navigate('/admin/albums')
    } else {
      const { error } = await supabase.from('albums').insert([formData])
      if (error) alert('Error: ' + error.message)
      else navigate('/admin/albums')
    }
    
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">{id ? 'Edit Album' : 'Tambah Album Baru'}</h2>
        <button onClick={() => navigate('/admin/albums')} className="text-zinc-400 hover:text-white">Batal</button>
      </div>

      <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-zinc-300 mb-1">Judul Album</label>
          <input 
            type="text" 
            name="title"
            required
            value={formData.title} 
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" 
          />
        </div>

        <div>
          <label className="block text-zinc-300 mb-1">Tipe (image/video)</label>
          <select 
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div>
          <ImageUpload 
            label="Thumbnail (Upload Gambar/Video)"
            value={formData.thumbnail}
            onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg disabled:opacity-50"
        >
          {loading ? 'Menyimpan...' : 'Simpan Album'}
        </button>
      </form>
    </div>
  )
}
