import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'
import { Link } from 'react-router-dom'

export default function ProjectsList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) console.error(error)
    else setProjects(data)
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus project ini?')) return
    
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) {
      alert('Gagal menghapus: ' + error.message)
    } else {
      fetchProjects()
    }
  }

  if (loading) return <div className="text-white">Loading...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <Link 
          to="/admin/projects/new" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
        >
          + Tambah Project
        </Link>
      </div>

      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full text-left text-zinc-300">
          <thead className="bg-zinc-800/50 text-sm uppercase">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-zinc-800">
                <td className="px-6 py-4 font-medium text-white">{project.title}</td>
                <td className="px-6 py-4">{project.category}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link to={`/admin/projects/${project.id}`} className="text-blue-400 hover:text-blue-300">Edit</Link>
                  <button onClick={() => handleDelete(project.id)} className="text-red-400 hover:text-red-300">Hapus</button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="3" className="px-6 py-8 text-center text-zinc-500">Belum ada project</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
