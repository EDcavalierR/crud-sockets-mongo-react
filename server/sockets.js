import Note from './models/Note';

export default (io) => {
    io.on('connection', (socket) => {
        
        const emitNote = async () => {
            const notes = await Note.find();
            io.emit('server:loadNotes', notes);
        }
        emitNote();

        socket.on('client:saveNote', async (note) => {
            const newNote = new Note(note);
            const savedNote = await newNote.save();
            io.emit('server:newNote', savedNote);
        })

        socket.on('client:deleteNote', async (noteId) => {
            await Note.findByIdAndDelete(noteId);
            emitNote();
        })

        socket.on('client:getNote', async (noteId) => {
            const note = await Note.findById(noteId);
            io.emit('server:selectedNote', note);
        })

        socket.on('client:updateNote', async (note) => {
            await Note.findByIdAndUpdate(note._id, note.data);
            emitNote();
        })
    })

}