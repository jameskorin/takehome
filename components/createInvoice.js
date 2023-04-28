import React, { useEffect, useState } from 'react'
import { Outer } from '../styles/createInvoice'
import _ from 'lodash'

export default function CreateInvoice({
    visible,
    createInvoice
}) {

    const [invoice, setInvoice] = useState({
        name: '',
        due_date: '',
        status: '',
        charges: [{"": ""}]
    });

    useEffect(() => {
        console.log(invoice.charges);
    },[invoice])

    const updateCharge =(index, charge)=> {
        setInvoice(prevState => {
            let c = [...prevState.charges];
            c[index] = charge;
            return {
                ...prevState,
                charges: c
            }
        })
    }

    const deleteCharge =(index)=> {
        setInvoice(prevState => {
            const updatedCharges = [...prevState.charges];
            updatedCharges.splice(index, 1);
            return {
                ...prevState,
                charges: updatedCharges,
            };
        });
    }

    if(!visible) return null;
    return <Outer>

        <h1>New Invoice</h1>

        <form onSubmit={e => {
            e.preventDefault();
            createInvoice(invoice)
        }}>
            <input onChange={e => setInvoice({...invoice, name: e.target.value})} 
            placeholder='Name'/>
            <select onChange={e => setInvoice({...invoice, status: e.target.value.toLowerCase()})}>
                <option disabled selected>Status</option>
                <option>Draft</option>
                <option>Paid</option>
                <option>Outstanding</option>
            </select>
            <input onChange={e => setInvoice({...invoice, due_date: e.target.value})} 
            placeholder='Due date' type='date'/>

            <div>
                <h2>Charges</h2>
                <button onClick={() => setInvoice({
                ...invoice, 
                charges: invoice.charges.concat([{"":""}])})}>
                    + Add charge
                </button>
            </div>
            {invoice.charges.map((item,index) => {
                const key = Object.keys(item)[0];
                const value = parseInt(Object.values(item)[0]);
                return <div key={`key_${index}`}>
                    <input placeholder='Name' value={key}
                    onChange={e => updateCharge(index, {[e.target.value]:value})}/>
                    $<input placeholder="100" type='number' value={value} 
                    onChange={e => updateCharge(index, {[key]:e.target.value.toString()})}/>
                    <button onClick={() => deleteCharge(index)}>Delete</button>
                </div>
            })}

            <button type='submit'>Create</button>
        </form>
    </Outer>;
}