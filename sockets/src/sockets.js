// import io from 'socket.io-client';

// let socket = {}

// export const connect = () => {
//     socket = io('http://localhost:3333');
// }

// export const loadNotes = async () => {
//     return new Promise((resolve, reject) => {
//         socket.on('server:loadNotes', (notes) => {
//             resolve(notes);
//         })
//     })
// }

// export const onNewNote = () => {
//     let tempNote = {}
//     socket.on('server:newNote', (note) => {
//         tempNote = note
//     })

//     console.log(tempNote)
// }

// export const desuscribeEvent = (event) => {
//     socket.off(event);
// }