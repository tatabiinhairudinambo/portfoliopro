import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { useParams, useNavigate } from 'react-router-dom'
import ImageUpload from '../../components/admin/ImageUpload'

export default function ProjectForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    full_desc: '',
    tags: '',
    category: '',
    image: '',
    gradient: 'from-transparent to-transparent',
    live_url: '',
    github_url: ''
  })
  const [loading, setLoading] = useState(isEditing)

  useEffect(() => {
    if (isEditing) {
      fetchProject()
    }
  }, [id])

  const fetchProject = async () => {
    const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
    if (data) {
      setFormData({
        ...data,
        tags: data.tags ? data.tags.join(', ') : ''
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    }

    if (isEditing) {
      const { error } = await supabase.from('projects').update(payload).eq('id', id)
      if (error) alert(error.message)
      else navigate('/admin/projects')
    } else {
      const { error } = await supabase.from('projects').insert([payload])
      if (error) alert(error.message)
      else navigate('/admin/projects')
    }
    setLoading(false)
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? 'Edit Project' : 'Tambah Project'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-zinc-300 mb-1">Title</label>
          <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" />
        </div>

        <div>
          <label className="block text-zinc-300 mb-1">Short Description</label>
          <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" rows="2" />
        </div>

        <div>
          <label className="block text-zinc-300 mb-1">Full Description (bisa pakai HTML)</label>
          <textarea required value={formData.full_desc} onChange={e => setFormData({...formData, full_desc: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" rows="4" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-300 mb-1">Category</label>
            <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" placeholder="e.g. Web, Mobile, Branding" />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">Tags (pisahkan dengan koma)</label>
            <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" placeholder="React, Tailwind, Figma" />
          </div>
        </div>

        <div>
          <ImageUpload 
            label="URL Gambar Cover"
            value={formData.image}
            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-zinc-300 mb-1">Live URL (opsional)</label>
            <input type="text" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" />
          </div>
          <div>
            <label className="block text-zinc-300 mb-1">GitHub URL (opsional)</label>
            <input type="text" value={formData.github_url} onChange={e => setFormData({...formData, github_url: e.target.value})} className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2 text-white" />
          </div>
        </div>

        <div className="pt-4 flex space-x-3">
          <button type="button" onClick={() => navigate('/admin/projects')} className="px-4 py-2 text-zinc-400 hover:text-white">Batal</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Simpan</button>
        </div>
      </form>
    </div>
  )
}
