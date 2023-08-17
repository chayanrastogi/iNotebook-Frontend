import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {

    const host = "https://inotebook-backend-kr4e.onrender.com"

    const initialNotes = [];

    const [notes, setNotes] = useState(initialNotes);

    //Get All Notes
    const getNotes = async () => {

        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    //Add Notes
    const addNote = async (title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });


        //Logic to add notes
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Delete Notes
    const deleteNote = async (id) => {

        //API call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });
        // const json = response.json();

        const newNote = notes.filter((note) => { return note._id !== id });
        setNotes(newNote);
    }

    //Edit Notes
    const editNote = async (id, title, description, tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = response.json;

        //Creating new clone note for updation
        let newNotes = JSON.parse(JSON.stringify(notes));

        //Logic to edit notes
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;


