import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

const socket = io('http://localhost:3333');
let update = false;

function App() {
    const [note, setNote] = useState({title: '', description: ''})
    const [notes, setNotes] = useState([{title: '', description: ''}])

    useEffect(() => {
        socket.on('server:loadNotes', (notesTemp) => { setNotes(notesTemp); })

        socket.on('server:selectedNote', (noteTemp) => { setNote(noteTemp); })
    }, [])

    useEffect(() => {
        socket.on('server:newNote', (note) => { setNotes([...notes, note]) })

        return () => socket.off('server:newNote')
    }, [notes])
    
    const handleSend = (e) => {
        e.preventDefault()
        if(note.title.trim() && note.description.trim()) {
            update ? socket.emit('client:updateNote', {_id: note['_id'], data: {title: note.title, description: note.description}}) : socket.emit('client:saveNote', note);
            setNote({title: '', description: ''});
            update = false;
        }
    }

    const handleDelete = (e) => {
        socket.emit('client:deleteNote', e._id);
    }

    const hanbleUpdate = (e) => {
        socket.emit('client:getNote', e._id);
        update = true;
    }

    const handleChange = (e) => {
        setNote((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    return (
        <div className="App">
            <form className='container-form' id="noteForm">
                <div className='container-horizontal'>
                    <label className='tag'>Titulo: </label>
                    <input className='input-form' id="title" value={note.title} onChange={handleChange} type="text"/>
                </div>
                <div className='container-horizontal'> 
                    <label className='tag'>Descripcion: </label>
                    <textarea className='text-form' id="description" value={note.description} onChange={handleChange} rows={3}></textarea>
                </div>
                <button className='button-form' onClick={handleSend}>Enviar</button>
            </form>

            <div className='container-notes'>
                {notes.map((note, index) => (
                    <div className='container-note' key={index}>
                        <h3 className='tag-note'>{note.title}</h3>
                        <p className='tag-note'>{note.description}</p>
                        <div className='container-button-note'>
                            <button className='button-note' onClick={() => hanbleUpdate(note)}>Editar</button>
                            <button className='button-note' onClick={() => handleDelete(note)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
