import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import ImageUpload from '../../components/admin/ImageUpload'

export default function SiteSettings() {
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    const { data, error } = await supabase.from('site_content').select('*').order('section')
    if (error) console.error(error)
    else setContent(data)
    setLoading(false)
  }

  const handleChange = (id, newValue) => {
    setContent(content.map(item => item.id === id ? { ...item, value: newValue } : item))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    
    // Update each changed item
    for (const item of content) {
      await supabase.from('site_content').update({ value: item.value }).eq('id', item.id)
    }
    
    alert('Pengaturan teks berhasil disimpan!')
    setSaving(false)
  }

  if (loading) return <div className="text-white">Loading...</div>

  // Group by section
  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = []
    acc[item.section].push(item)
    return acc
  }, {})

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-bold text-white mb-6">Pengaturan Teks Website</h2>
      <p className="text-zinc-400 mb-6">Ubah teks dan link gambar untuk halaman utama website Anda di sini.</p>
      
      <form onSubmit={handleSave} className="space-y-8">
        {Object.entries(groupedContent).map(([section, items]) => (
          <div key={section} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white capitalize mb-4 border-b border-zinc-800 pb-2">{section} Section</h3>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.id}>
                  {item.key.includes('img') || item.key.includes('image') || item.key.includes('thumbnail') ? (
                    <ImageUpload 
                      label={item.key.replace(/_/g, ' ')}
                      value={item.value}
                      onChange={newValue => handleChange(item.id, newValue)}
                    />
                  ) : (
                    <>
                      <label className="block text-zinc-300 mb-1 font-mono text-sm">{item.key.replace(/_/g, ' ')}</label>
                      {item.value.length > 50 || item.key.includes('text') ? (
                        <textarea 
                          value={item.value} 
                          onChange={e => handleChange(item.id, e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" 
                          rows="3"
                        />
                      ) : (
                        <input 
                          type="text" 
                          value={item.value} 
                          onChange={e => handleChange(item.id, e.target.value)}
                          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white" 
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4 sticky bottom-6 z-10 flex justify-end">
          <button 
            type="submit" 
            disabled={saving || content.length === 0} 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg disabled:opacity-50"
          >
            {saving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
          </button>
        </div>
      </form>
    </div>
  )
}
