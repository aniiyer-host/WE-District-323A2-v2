import React, { useState, useEffect } from 'react';
import { Save, RefreshCw, AlertCircle, CheckCircle, ChevronDown, ChevronRight, FileText, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import api, { uploadImageToSupabase } from '../../utils/api';
import { useToast } from '../Toast';

// ── Generic Sub-components ────────────────────────────────────────────────────
const FormRow = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder, multiline = false }) => {
  const baseClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";
  if (multiline) {
    return <textarea value={value || ''} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className={baseClass} />;
  }
  return <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={baseClass} />;
};

const StringArrayManager = ({ items, onChange, itemName = 'Item' }) => (
  <div className="space-y-2">
    {items.map((item, i) => (
      <div key={i} className="flex items-center gap-2">
        <input
          type="text"
          value={item}
          onChange={e => {
            const next = [...items];
            next[i] = e.target.value;
            onChange(next);
          }}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all">
          <Trash2 size={16} />
        </button>
      </div>
    ))}
    <button onClick={() => onChange([...items, ''])} className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 font-semibold mt-1">
      <Plus size={16} /> Add {itemName}
    </button>
  </div>
);

const ImageUploadInput = ({ value, onChange, folder = 'cms', onUploadSuccess, onUploadError }) => {
  const [uploading, setUploading] = useState(false);
  
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    try {
      const res = await uploadImageToSupabase(file, folder);
      onChange(res.url);
      onUploadSuccess?.('Image uploaded successfully!');
    } catch (err) {
      onUploadError
        ? onUploadError('Failed to upload image. Please try again.')
        : alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      e.target.value = ''; 
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {value && (
        <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-purple-200 shadow-sm">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <button 
            onClick={() => onChange('')} 
            className="absolute top-1 right-1 bg-white/90 text-red-500 p-1.5 rounded-lg shadow-sm hover:bg-red-50 transition-colors"
            title="Remove Image"
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-xl cursor-pointer hover:bg-purple-100 transition-colors text-sm font-semibold border border-purple-100 shadow-sm">
            {uploading ? <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" /> : <ImageIcon size={16} />}
            {uploading ? 'Uploading...' : (value ? 'Change Image' : 'Upload Image')}
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" disabled={uploading} />
          </label>
          <span className="text-xs text-gray-400 font-medium">or paste URL below</span>
        </div>
        <input 
          type="text" 
          value={value || ''} 
          onChange={e => onChange(e.target.value)} 
          placeholder="https://..." 
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" 
        />
      </div>
    </div>
  );
};

// ── Key-Specific Editors ──────────────────────────────────────────────────────

const LandingHeroEditor = ({ data, onChange, onUploadSuccess, onUploadError }) => (
  <div className="grid gap-4">
    <FormRow label="Hero Title">
      <TextInput value={data?.title} onChange={v => onChange({ ...data, title: v })} />
    </FormRow>
    <FormRow label="Hero Subtitle">
      <TextInput value={data?.subtitle} onChange={v => onChange({ ...data, subtitle: v })} multiline />
    </FormRow>
  </div>
);

const LandingPresidentEditor = ({ data, onChange, onUploadSuccess, onUploadError }) => (
  <div className="grid gap-4 md:grid-cols-2">
    <FormRow label="Name">
      <TextInput value={data?.name} onChange={v => onChange({ ...data, name: v })} />
    </FormRow>
    <FormRow label="Role">
      <TextInput value={data?.role} onChange={v => onChange({ ...data, role: v })} />
    </FormRow>
    <div className="md:col-span-2">
      <FormRow label="Title (Heading)">
        <TextInput value={data?.title} onChange={v => onChange({ ...data, title: v })} />
      </FormRow>
    </div>
    <div className="md:col-span-2">
      <FormRow label="Photo">
        <ImageUploadInput value={data?.photo} onChange={v => onChange({ ...data, photo: v })} onUploadSuccess={onUploadSuccess} onUploadError={onUploadError} />
      </FormRow>
    </div>
    <div className="md:col-span-2">
      <FormRow label="Bio Paragraphs">
        <StringArrayManager items={data?.bio || []} onChange={v => onChange({ ...data, bio: v })} itemName="Paragraph" />
      </FormRow>
    </div>
    <div className="md:col-span-2">
      <FormRow label="Tags / Highlights">
        <StringArrayManager items={data?.tags || []} onChange={v => onChange({ ...data, tags: v })} itemName="Tag" />
      </FormRow>
    </div>
  </div>
);

const AboutAreasEditor = ({ data, onChange }) => (
  <FormRow label="Areas of Work">
    <StringArrayManager items={Array.isArray(data) ? data : []} onChange={onChange} itemName="Area" />
  </FormRow>
);

const AboutEmblemEditor = ({ data, onChange, onUploadSuccess, onUploadError }) => (
  <div className="grid gap-4">
    <FormRow label="Emblem Image">
      <ImageUploadInput value={data?.image} onChange={v => onChange({ ...data, image: v })} onUploadSuccess={onUploadSuccess} onUploadError={onUploadError} />
    </FormRow>
    <FormRow label="Emblem Highlights">
      <div className="space-y-4">
        {(data?.items || []).map((item, i) => (
          <div key={i} className="flex gap-2 items-start border border-gray-100 p-3 rounded-xl bg-gray-50">
            <div className="flex-1 space-y-2">
              <input type="text" placeholder="Label (e.g. Center)" value={item.label} onChange={e => {
                const next = [...data.items]; next[i].label = e.target.value; onChange({ ...data, items: next });
              }} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-400 outline-none" />
              <textarea placeholder="Description" value={item.text} onChange={e => {
                const next = [...data.items]; next[i].text = e.target.value; onChange({ ...data, items: next });
              }} className="w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-400 outline-none" rows={2} />
            </div>
            <button onClick={() => {
              const next = data.items.filter((_, idx) => idx !== i); onChange({ ...data, items: next });
            }} className="p-2 text-red-400 hover:bg-red-100 rounded-lg shrink-0 mt-1"><Trash2 size={16} /></button>
          </div>
        ))}
        <button onClick={() => onChange({ ...data, items: [...(data?.items || []), { label: '', text: '' }] })} className="flex items-center gap-1 text-sm text-purple-600 font-semibold">
          <Plus size={16} /> Add Highlight
        </button>
      </div>
    </FormRow>
  </div>
);

const ObjectArrayEditor = ({ data, onChange, fields, itemName, onUploadSuccess, onUploadError }) => {
  const items = Array.isArray(data) ? data : [];
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 p-4 rounded-2xl bg-gray-50 relative">
          <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="absolute top-4 right-4 p-1.5 text-red-400 hover:bg-red-100 rounded-lg"><Trash2 size={16} /></button>
          <div className="grid gap-4 md:grid-cols-2 pr-10">
            {fields.map(f => (
              <div key={f.key} className={f.fullWidth ? "md:col-span-2" : ""}>
                <label className="block text-[11px] font-bold text-gray-400 mb-1 uppercase">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea value={item[f.key] || ''} onChange={e => {
                    const next = [...items]; next[i] = { ...next[i], [f.key]: e.target.value }; onChange(next);
                  }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none" rows={3} />
                ) : f.type === 'boolean' ? (
                  <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                    <input type="checkbox" checked={!!item[f.key]} onChange={e => {
                      const next = [...items]; next[i] = { ...next[i], [f.key]: e.target.checked }; onChange(next);
                    }} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                    {f.label}
                  </label>
                ) : f.type === 'image' ? (
                  <ImageUploadInput value={item[f.key] || ''} onChange={val => {
                    const next = [...items]; next[i] = { ...next[i], [f.key]: val }; onChange(next);
                  }} onUploadSuccess={onUploadSuccess} onUploadError={onUploadError} />
                ) : (
                  <input type="text" value={item[f.key] || ''} placeholder={f.placeholder || ''} onChange={e => {
                    const next = [...items]; next[i] = { ...next[i], [f.key]: e.target.value }; onChange(next);
                  }} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={() => {
        const newItem = fields.reduce((acc, f) => ({ ...acc, [f.key]: f.type === 'boolean' ? false : '' }), {});
        onChange([...items, newItem]);
      }} className="flex items-center gap-1 text-sm text-purple-600 font-semibold bg-purple-50 px-4 py-2 rounded-xl hover:bg-purple-100 transition-colors w-max">
        <Plus size={16} /> Add {itemName}
      </button>
    </div>
  );
};


// ── Registry ──────────────────────────────────────────────────────────────────
const CMS_KEYS = [
  { key: 'landing_hero',        label: 'Landing Page — Hero Section',        editor: LandingHeroEditor },
  { key: 'landing_president',   label: 'Landing Page — President Spotlight', editor: LandingPresidentEditor },
  { key: 'about_areas',         label: 'About Page — Areas of Work',         editor: AboutAreasEditor },
  { key: 'about_emblem',        label: 'About Page — Emblem Details',        editor: AboutEmblemEditor },
  { key: 'about_founders',      label: 'About Page — Founders',              editor: p => <ObjectArrayEditor {...p} itemName="Founder" fields={[{key:'name', label:'Name'}, {key:'role', label:'Role'}, {key:'club', label:'Club'}, {key:'image', label:'Image', type:'image', fullWidth:true}, {key:'bio', label:'Bio', type:'textarea', fullWidth:true}]} /> },
  { key: 'about_presidents',    label: 'About Page — Past Presidents',       editor: p => <ObjectArrayEditor {...p} itemName="President" fields={[{key:'name', label:'Name'}, {key:'role', label:'Role (e.g. Year)'}, {key:'club', label:'Club'}, {key:'image', label:'Image', type:'image', fullWidth:true}, {key:'bio', label:'Bio', type:'textarea', fullWidth:true}]} /> },
  { key: 'about_slogan',        label: 'About Page — Slogan Quotes',         editor: p => <ObjectArrayEditor {...p} itemName="Quote" fields={[{key:'text', label:'Text', fullWidth:true}, {key:'label', label:'Attribution/Label'}, {key:'bold', label:'Make text bold?', type:'boolean'}]} /> },
  { key: 'about_team',          label: 'About Page — Leadership Team',       editor: p => <ObjectArrayEditor {...p} itemName="Member" fields={[{key:'name', label:'Name'}, {key:'role', label:'Role'}, {key:'image', label:'Image', type:'image', fullWidth:true}]} /> },
];

const StatusBadge = ({ status }) => {
  if (!status) return null;
  const isOk = status === 'saved';
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full ${isOk ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {isOk ? <CheckCircle size={12} /> : <AlertCircle size={12} />}
      {isOk ? 'Saved' : 'Error'}
    </span>
  );
};

const CmsKeyRow = ({ entry }) => {
  const toast = useToast();
  const [expanded, setExpanded] = useState(false);
  const [data, setData]         = useState(null);
  const [original, setOriginal] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [status, setStatus]     = useState(null);

  const load = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await api.get(`/content/${entry.key}`);
      if (res.data.success) {
        const val = res.data.data.content?.value;
        setData(val);
        setOriginal(JSON.stringify(val));
      } else {
        setData(null);
        setOriginal(null);
      }
    } catch {
      setData(null);
      setOriginal(null);
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = () => {
    const next = !expanded;
    setExpanded(next);
    if (next && original === null) load();
  };

  const handleChange = (newData) => {
    setData(newData);
    setStatus(null);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/content/${entry.key}`, { value: data });
      setStatus('saved');
      setOriginal(JSON.stringify(data));
      toast.success(`"${entry.label}" saved successfully!`);
    } catch {
      setStatus('error');
      toast.error(`Failed to save "${entry.label}". Please try again.`);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    load();
    toast.info('Changes discarded.');
  };

  const isDirty = original !== null && JSON.stringify(data) !== original;
  const EditorComponent = entry.editor;

  return (
    <div className={`border rounded-2xl overflow-hidden mb-4 transition-all duration-300 ${expanded ? 'border-purple-200 shadow-lg' : 'border-gray-200 hover:border-purple-300'}`}>
      <button
        onClick={handleExpand}
        className={`w-full flex items-center gap-3 px-5 py-4 transition-colors text-left ${expanded ? 'bg-purple-50' : 'bg-white hover:bg-gray-50'}`}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${expanded ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-bold text-sm ${expanded ? 'text-purple-900' : 'text-gray-800'}`}>{entry.label}</p>
          <p className="text-[11px] text-gray-400 font-mono mt-0.5">{entry.key}</p>
        </div>
        {status && <StatusBadge status={status} />}
        {isDirty && !status && (
          <span className="text-xs text-orange-500 font-bold bg-orange-100 px-2 py-1 rounded-full">Unsaved Changes</span>
        )}
      </button>

      {expanded && (
        <div className="p-6 bg-white border-t border-purple-100">
          {loading ? (
            <div className="flex items-center gap-2 text-purple-500 py-8 justify-center">
              <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              <span className="font-medium text-sm">Loading content...</span>
            </div>
          ) : (
            <div className="animate-fade-in">
              <EditorComponent
                data={data || {}}
                onChange={handleChange}
                onUploadSuccess={(msg) => toast.success(msg)}
                onUploadError={(msg) => toast.error(msg)}
              />
              
              <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
                <button onClick={handleDiscard} className="flex items-center gap-2 px-5 py-2.5 text-sm border border-gray-300 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-all">
                  <RefreshCw size={16} /> Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:transform-none transform hover:-translate-y-0.5 transition-all"
                >
                  {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
                  Save Section
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CmsEditor = () => (
  <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">Site Content Manager</h2>
      <p className="text-gray-500 text-sm max-w-2xl">
        Easily update text, images, and lists across the website. Click any section below to expand and edit its content. Don't forget to save your changes!
      </p>
    </div>
    <div className="space-y-1">
      {CMS_KEYS.map(entry => (
        <CmsKeyRow key={entry.key} entry={entry} />
      ))}
    </div>
  </div>
);

export default CmsEditor;
