import Noteitem from './Noteitem';
import AddNote from './AddNote';
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "" });
    let navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token'))
        {
          getNotes();
        }
        else{
          navigate('/login')
        }
        // eslint-disable-next-line
      }, []);

    const updateNote = (curreNote) => {
        ref.current.click();
        setNote({id: curreNote._id, etitle: curreNote.title, edescription: curreNote.description, etag: curreNote.tag})
    }

    const ref = useRef(null);

     const handleClick = (e) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        e.preventDefault();
        props.showAlert("Updated Note", 'success');
     }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog modal-dialog-centered ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 fw-bold" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label ">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="tag" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5} className="btn btn-primary button" data-bs-dismiss="modal" onClick={handleClick} style={{backgroundColor:"#4682A9", color:"#f5f5f5", border:"none"}}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2 className='fw-bold'>Your Notes</h2>
                <div className="container mx-2 ">
                    {notes.length === 0 && 'No notes to diplay'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes
