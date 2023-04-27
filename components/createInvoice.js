import React, { useState } from 'react'

export default function CreateInvoice({
    visible,
    createInvoice
}) {

    const [invoice, setInvoice] = useState({
        name: '',
        due_date: '',
        charges: []
    });

    if(!visible) return null;
    return <div>
        <form onSubmit={e => {
            e.preventDefault();
            createInvoice(invoice)
        }}>
            <input placeholder='Name'/>
            <input placeholder='Due date' type='date'/>
            <input placeholder='Name'/>
            <button type='submit'>Create</button>
        </form>
    </div>;
}