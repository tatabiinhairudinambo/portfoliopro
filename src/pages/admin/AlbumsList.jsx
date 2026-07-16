import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabaseClient'

export default function AlbumsList() {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    const { data, error } = await supabase.from('albums').select('*').order('created_at', { ascending: false })
    if (error) console.error(error)
    else setAlbums(data)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus album ini?')) return
    
    const { error } = await supabase.from('albums').delete().eq('id', id)
    if (error) alert('Error: ' + error.message)
    else fetchAlbums()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Albums & Media Management</h2>
        <Link to="/admin/albums/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold">
          + Tambah Album
        </Link>
      </div>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <p className="text-zinc-400 mb-4">
          Data album visual Anda akan dikelola di sini. Anda bisa mengubah foto, video, dan thumbnail untuk setiap seksi portfolio.
        </p>
        {loading ? (
          <div className="text-white">Loading albums...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {albums.map(album => (
              <div key={album.id} className="bg-zinc-800 p-4 rounded-lg flex items-center space-x-4">
                <img src={album.thumbnail} alt={album.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="text-white font-bold">{album.title}</h3>
                  <p className="text-zinc-400 text-sm text-capitalize">{album.type}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <Link to={`/admin/albums/${album.id}`} className="text-blue-500 hover:text-blue-400 text-sm">Edit</Link>
                  <button onClick={() => handleDelete(album.id)} className="text-red-500 hover:text-red-400 text-sm">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
