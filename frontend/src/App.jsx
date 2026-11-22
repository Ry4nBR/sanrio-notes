import { useEffect, useMemo, useState } from 'react';
import { characters, getCharacter } from './data/characters';
import { createNote, deleteNote, getNotes, updateNote } from './services/noteService';
import './styles/App.css';

const emptyForm = { titulo: '', texto: '', personagem: 'cinnamoroll' };

function formatDate(value) {
  if (!value) return '';
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium' }).format(new Date(value));
}

export default function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [character, setCharacter] = useState('todos');
  const [formOpen, setFormOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState('');

  async function loadNotes() {
    setLoading(true);
    setError('');
    try {
      setNotes(await getNotes());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (!formOpen && !deleteTarget) return undefined;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setFormOpen(false);
        setDeleteTarget(null);
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [formOpen, deleteTarget]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(''), 3000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filteredNotes = useMemo(() => {
    const term = search.trim().toLowerCase();
    return [...notes]
      .filter((note) => character === 'todos' || (note.personagem || 'cinnamoroll') === character)
      .filter((note) => !term || `${note.titulo || ''} ${note.texto || ''}`.toLowerCase().includes(term))
      .sort((a, b) => new Date(b.atualizadoEm || b.criadoEm) - new Date(a.atualizadoEm || a.criadoEm));
  }, [notes, search, character]);

  function openCreate() {
    setSelected(null);
    setForm(emptyForm);
    setFormErrors({});
    setFormOpen(true);
  }

  function openEdit(note) {
    setSelected(note);
    setForm({ titulo: note.titulo, texto: note.texto, personagem: note.personagem || 'cinnamoroll' });
    setFormErrors({});
    setFormOpen(true);
  }

  async function submitForm(event) {
    event.preventDefault();
    const errors = {};
    if (!form.titulo.trim()) errors.titulo = 'Informe um titulo.';
    if (!form.texto.trim()) errors.texto = 'Informe o conteudo.';
    if (!characters.some((item) => item.id === form.personagem)) errors.personagem = 'Escolha um personagem.';
    setFormErrors(errors);
    if (Object.keys(errors).length) return;

    setSaving(true);
    try {
      const payload = { titulo: form.titulo.trim(), texto: form.texto.trim(), personagem: form.personagem };
      if (selected) {
        const updated = await updateNote(selected.id, payload);
        setNotes((current) => current.map((note) => (note.id === updated.id ? updated : note)));
        setToast('Nota atualizada com sucesso!');
      } else {
        const created = await createNote(payload);
        setNotes((current) => [created, ...current]);
        setToast('Nota criada com sucesso!');
      }
      setFormOpen(false);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setSaving(true);
    try {
      await deleteNote(deleteTarget.id);
      setNotes((current) => current.filter((note) => note.id !== deleteTarget.id));
      setDeleteTarget(null);
      setToast('Nota excluida.');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="header">
        <div>
          <p className="eyebrow">Seu cantinho pastel</p>
          <h1>Sanrio Notes</h1>
        </div>
        <button className="primary-button" type="button" onClick={openCreate}>+ Nova nota</button>
      </header>

      <main className="main-layout">
        <section className="welcome" aria-labelledby="welcome-title">
          <div>
            <h2 id="welcome-title">Boas-vindas!</h2>
            <p>Organize lembrancas, ideias e pequenos momentos.</p>
          </div>
        </section>

        <section className="toolbar" aria-label="Filtros de notas">
          <label className="search-box">
            <span>Pesquisar</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Titulo ou conteudo" />
          </label>
          <div className="character-filter" role="group" aria-label="Filtrar por personagem">
            <button type="button" className={character === 'todos' ? 'active' : ''} onClick={() => setCharacter('todos')}>Todos</button>
            {characters.map((item) => (
              <button type="button" key={item.id} className={`${item.className} ${character === item.id ? 'active' : ''}`} onClick={() => setCharacter(item.id)}>{item.name}</button>
            ))}
          </div>
        </section>

        {error && <div className="error-banner" role="alert">{error}<button type="button" onClick={loadNotes}>Tentar novamente</button></div>}

        {loading ? (
          <div className="loading-state" role="status">Carregando suas notas...</div>
        ) : filteredNotes.length === 0 ? (
          <div className="empty-state">
            <h2>{notes.length ? 'Nenhuma nota encontrada' : 'Ainda nao existe nenhuma nota'}</h2>
            <p>{notes.length ? 'Limpe a pesquisa ou escolha outro personagem.' : 'Crie a primeira nota para comecar.'}</p>
            {notes.length ? (
              <button type="button" className="secondary-button" onClick={() => { setSearch(''); setCharacter('todos'); }}>Limpar filtros</button>
            ) : (
              <button type="button" className="primary-button" onClick={openCreate}>Criar primeira nota</button>
            )}
          </div>
        ) : (
          <section className="notes-grid" aria-label="Lista de notas">
            {filteredNotes.map((note) => {
              const item = getCharacter(note.personagem);
              return (
                <article className={`note-card ${item.className}`} key={note.id}>
                  <img className="character-art" src={item.image} alt="" aria-hidden="true" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
                  <div className="note-content">
                    <div className="note-meta"><span>{item.name}</span><time>{formatDate(note.atualizadoEm || note.criadoEm)}</time></div>
                    <h3>{note.titulo}</h3>
                    <p>{note.texto}</p>
                    <div className="note-actions">
                      <button type="button" className="secondary-button" onClick={() => openEdit(note)}>Editar</button>
                      <button type="button" className="danger-button" onClick={() => setDeleteTarget(note)}>Excluir</button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>

      {formOpen && (
        <div className="modal-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setFormOpen(false); }}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
            <button className="close-button" type="button" aria-label="Fechar" onClick={() => setFormOpen(false)}>x</button>
            <h2 id="form-title">{selected ? 'Editar nota' : 'Nova nota'}</h2>
            <form onSubmit={submitForm} noValidate>
              <label>Titulo<input value={form.titulo} onChange={(event) => setForm({ ...form, titulo: event.target.value })} required />{formErrors.titulo && <small>{formErrors.titulo}</small>}</label>
              <label>Conteudo<textarea value={form.texto} onChange={(event) => setForm({ ...form, texto: event.target.value })} required />{formErrors.texto && <small>{formErrors.texto}</small>}</label>
              <fieldset>
                <legend>Personagem</legend>
                <div className="character-options">
                  {characters.map((item) => (
                    <label key={item.id}>
                      <input type="radio" name="personagem" value={item.id} checked={form.personagem === item.id} onChange={(event) => setForm({ ...form, personagem: event.target.value })} />
                      {item.name}
                    </label>
                  ))}
                </div>
                {formErrors.personagem && <small>{formErrors.personagem}</small>}
              </fieldset>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setFormOpen(false)}>Cancelar</button>
                <button type="submit" className="primary-button" disabled={saving}>{saving ? 'Salvando...' : 'Salvar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-overlay" role="presentation">
          <div className="modal confirmation" role="alertdialog" aria-modal="true" aria-labelledby="delete-title">
            <h2 id="delete-title">Excluir nota?</h2>
            <p>A nota "{deleteTarget.titulo}" sera removida permanentemente.</p>
            <div className="modal-actions">
              <button type="button" className="secondary-button" onClick={() => setDeleteTarget(null)}>Cancelar</button>
              <button type="button" className="danger-button" disabled={saving} onClick={confirmDelete}>{saving ? 'Excluindo...' : 'Excluir'}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}
