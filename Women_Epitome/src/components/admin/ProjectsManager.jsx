import React, { useState, useEffect } from 'react';
import {
  Plus, Trash2, Edit, Save, X, ChevronDown, ChevronRight,
  FolderOpen, Image, AlertCircle, CheckCircle, RefreshCw
} from 'lucide-react';
import api from '../../utils/api';

// ── Project Item Row ──────────────────────────────────────────────────────────
const ItemRow = ({ item, projectSlug, onDeleted, onUpdated }) => {
  const [editing, setEditing]   = useState(false);
  const [desc, setDesc]         = useState(item.description || '');
  const [imgUrl, setImgUrl]     = useState(item.imageUrl || '');
  const [saving, setSaving]     = useState(false);
  const [deleting, setDeleting] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/projects/items/${item.id}`, { description: desc, imageUrl: imgUrl });
      onUpdated({ ...item, description: desc, imageUrl: imgUrl });
      setEditing(false);
    } catch { alert('Failed to save item'); }
    finally { setSaving(false); }
  };

  const del = async () => {
    if (!window.confirm('Delete this project item?')) return;
    setDeleting(true);
    try {
      await api.delete(`/projects/items/${item.id}`);
      onDeleted(item.id);
    } catch { alert('Failed to delete item'); }
    finally { setDeleting(false); }
  };

  return (
    <div className="border border-gray-100 rounded-xl p-4 mb-2 bg-gray-50">
      {editing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1"><Image size={12} /> Image URL</label>
            <input
              type="text"
              value={imgUrl}
              onChange={e => setImgUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="https://..."
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setEditing(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-all flex items-center gap-1">
              <X size={14} /> Cancel
            </button>
            <button onClick={save} disabled={saving} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg flex items-center gap-1 disabled:opacity-50 hover:bg-purple-700 transition-all">
              {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />}
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          {item.imageUrl && (
            <img src={item.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0 border border-gray-200" />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-700 line-clamp-2">{item.description || <em className="text-gray-400">No description</em>}</p>
            {item.clubId && <p className="text-xs text-gray-400 mt-1">Club: {item.clubId}</p>}
          </div>
          <div className="flex gap-1 shrink-0">
            <button onClick={() => setEditing(true)} className="p-2 text-purple-500 hover:bg-purple-100 rounded-lg transition-all">
              <Edit size={15} />
            </button>
            <button onClick={del} disabled={deleting} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all">
              {deleting ? <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin" /> : <Trash2 size={15} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Add Item Form ─────────────────────────────────────────────────────────────
const AddItemForm = ({ projectSlug, onAdded }) => {
  const [open, setOpen]   = useState(false);
  const [desc, setDesc]   = useState('');
  const [img, setImg]     = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.post(`/projects/${projectSlug}/items`, { description: desc, imageUrl: img || null });
      onAdded(res.data.data.item);
      setDesc(''); setImg(''); setOpen(false);
    } catch { alert('Failed to add item'); }
    finally { setSaving(false); }
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-semibold mt-2 transition-all">
      <Plus size={16} /> Add item
    </button>
  );

  return (
    <form onSubmit={submit} className="border border-dashed border-purple-300 rounded-xl p-4 mt-2 bg-purple-50 space-y-3">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Description *</label>
        <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1"><Image size={12} /> Image URL (optional)</label>
        <input type="text" value={img} onChange={e => setImg(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="https://..." />
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">Cancel</button>
        <button type="submit" disabled={saving} className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg flex items-center gap-1 disabled:opacity-50 hover:bg-purple-700 transition-all">
          {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={14} />}
          Add
        </button>
      </div>
    </form>
  );
};

// ── Project Category Row ──────────────────────────────────────────────────────
const ProjectRow = ({ project, onProjectUpdated }) => {
  const [expanded, setExpanded]   = useState(false);
  const [items, setItems]         = useState(project.items || []);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle]         = useState(project.title);
  const [subtitle, setSubtitle]   = useState(project.subtitle || '');
  const [saving, setSaving]       = useState(false);
  const [toggling, setToggling]   = useState(false);

  const saveTitle = async () => {
    setSaving(true);
    try {
      await api.put(`/projects/${project.slug}`, { title, subtitle });
      onProjectUpdated({ ...project, title, subtitle });
      setEditingTitle(false);
    } catch { alert('Failed to update project'); }
    finally { setSaving(false); }
  };

  const toggleActive = async () => {
    setToggling(true);
    try {
      await api.put(`/projects/${project.slug}`, { isActive: !project.isActive });
      onProjectUpdated({ ...project, isActive: !project.isActive });
    } catch { alert('Failed to toggle project status'); }
    finally { setToggling(false); }
  };

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gray-50">
        <button onClick={() => setExpanded(!expanded)} className="text-gray-400 hover:text-purple-500 transition-colors">
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        <FolderOpen size={16} className="text-purple-400 shrink-0" />

        {editingTitle ? (
          <div className="flex-1 flex items-center gap-2">
            <input value={title} onChange={e => setTitle(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" placeholder="Subtitle (optional)" />
            <button onClick={saveTitle} disabled={saving} className="p-1.5 text-purple-600 hover:bg-purple-100 rounded-lg transition-all">
              {saving ? <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
            </button>
            <button onClick={() => { setEditingTitle(false); setTitle(project.title); setSubtitle(project.subtitle || ''); }} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-all">
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm">{project.title}</p>
            {project.subtitle && <p className="text-xs text-gray-400">{project.subtitle}</p>}
          </div>
        )}

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${project.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
            {project.isActive ? 'Active' : 'Hidden'}
          </span>
          <button onClick={toggleActive} disabled={toggling} title="Toggle visibility" className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-all">
            {toggling ? <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" /> : <RefreshCw size={14} />}
          </button>
          {!editingTitle && (
            <button onClick={() => setEditingTitle(true)} className="p-1.5 text-gray-400 hover:text-purple-500 hover:bg-purple-50 rounded-lg transition-all">
              <Edit size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Items */}
      {expanded && (
        <div className="p-4 border-t border-gray-100 bg-white">
          <p className="text-xs text-gray-500 mb-3 font-mono">slug: {project.slug} — {items.length} item(s)</p>
          {items.map(item => (
            <ItemRow
              key={item.id}
              item={item}
              projectSlug={project.slug}
              onDeleted={id => setItems(prev => prev.filter(i => i.id !== id))}
              onUpdated={updated => setItems(prev => prev.map(i => i.id === updated.id ? updated : i))}
            />
          ))}
          <AddItemForm projectSlug={project.slug} onAdded={newItem => setItems(prev => [...prev, newItem])} />
        </div>
      )}
    </div>
  );
};

// ── Add Category Form ─────────────────────────────────────────────────────────
const AddCategoryForm = ({ onAdded }) => {
  const [open, setOpen]     = useState(false);
  const [slug, setSlug]     = useState('');
  const [title, setTitle]   = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.post('/projects', { slug, title, subtitle: subtitle || null });
      onAdded(res.data.data.project);
      setSlug(''); setTitle(''); setSubtitle(''); setOpen(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create category');
    } finally { setSaving(false); }
  };

  if (!open) return (
    <button onClick={() => setOpen(true)} className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
      <Plus size={18} /> New Category
    </button>
  );

  return (
    <form onSubmit={submit} className="border-2 border-dashed border-green-300 rounded-2xl p-5 mb-4 bg-green-50 space-y-4">
      <h3 className="font-semibold text-gray-800">Add Project Category</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Slug * <span className="text-gray-400">(URL-safe, e.g. women-welfare)</span></label>
          <input value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} required pattern="[a-z0-9-]+" className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs text-gray-500 mb-1">Subtitle (optional)</label>
          <input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button type="button" onClick={() => setOpen(false)} className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-600 text-sm hover:bg-gray-100 transition-all">Cancel</button>
        <button type="submit" disabled={saving} className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-50 hover:bg-green-700 transition-all">
          {saving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Plus size={14} />}
          Create
        </button>
      </div>
    </form>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]  = useState(true);
  const [error, setError]      = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/projects');
      // Include inactive projects in admin view — fetch all
      setProjects(res.data.data.projects || []);
    } catch {
      setError('Failed to load projects from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Projects Manager</h2>
          <p className="text-gray-500 text-sm">Manage project categories and their items. Toggle active/hidden to control visibility on the public site.</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-gray-600 text-sm hover:bg-gray-50 transition-all">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <AddCategoryForm onAdded={newProject => setProjects(prev => [...prev, { ...newProject, items: [] }])} />

      {loading && (
        <div className="flex items-center gap-2 text-gray-500 py-8 justify-center">
          <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
          Loading projects…
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 text-red-600 py-4">
          <AlertCircle size={18} /> {error}
        </div>
      )}
      {!loading && !error && projects.length === 0 && (
        <p className="text-gray-400 text-center py-8">No project categories yet. Create one above.</p>
      )}
      {!loading && projects.map(proj => (
        <ProjectRow
          key={proj.id}
          project={proj}
          onProjectUpdated={updated => setProjects(prev => prev.map(p => p.id === updated.id ? { ...p, ...updated } : p))}
        />
      ))}
    </div>
  );
};

export default ProjectsManager;
