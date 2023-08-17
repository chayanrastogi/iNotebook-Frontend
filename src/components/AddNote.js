import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleAdd = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""} );
        props.showAlert("Added Note", 'success');
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-3 mb-5">
            <h2 className='fw-bold'>Add Notes</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label ">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange}  value={note.description} />
                </div>
                <div className="mb-4">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} value={note.tag}/>
                </div>
                <button type="button" disabled={note.title.length<3 || note.description.length<3} className="btn fw-bold button" onClick={handleAdd} >Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
