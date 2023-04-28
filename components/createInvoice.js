import React, { useEffect, useState } from 'react'
import { 
    Outer, 
    Backing, 
    ChargesHeader, 
    Input, 
    Charge, 
    Confirm, 
    Cancel,
    BasicInfo,
    Select
} from '../styles/createInvoice'
import _ from 'lodash'

export default function CreateInvoice({
    visible,
    createInvoice,
    updateInvoice,
    editing,
    existingInvoice,
    cancel
}) {

    useEffect(() => {
        if(editing)
            setInvoice(existingInvoice);
        else
            setInvoice({
                name: '',
                due_date: '',
                status: '',
                charges: [{"": ""}]
            });
    },[visible])

    const [invoice, setInvoice] = useState({
        name: '',
        due_date: '',
        status: '',
        charges: [{"": ""}]
    });

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
    return <>
    <Backing onClick={cancel}/>
    <Outer>
        <Cancel onClick={cancel}>Cancel</Cancel>

        <h1>{editing ? 'Edit':'New'} Invoice</h1>

        <div>

            <BasicInfo>

                <label for="name">Invoice name</label>
                <Input value={invoice.name} id="name"
                onChange={e => setInvoice({...invoice, name: e.target.value})} 
                placeholder='Name'/>

                <label for="status">Status</label>
                <Select value={invoice.status} id="status"
                onChange={e => setInvoice({...invoice, status: e.target.value.toLowerCase()})}>
                    <option disabled defaultValue={!editing}>Status</option>
                    <option value='draft'>Draft</option>
                    <option value='paid'>Paid</option>
                    <option value='outstanding'>Outstanding</option>
                </Select>

                <label for="due-date">Due date</label>
                <Input id="due-date" value={toYYYYMMDD(invoice.due_date)}
                onChange={e => setInvoice({
                    ...invoice, 
                    due_date: toMMDDYYYY(e.target.value)
                })} 
                placeholder='Due date' type='date'/>
            </BasicInfo>

            <ChargesHeader>
                <h2>Charges</h2>
                <button onClick={() => setInvoice({
                ...invoice, 
                charges: invoice.charges.concat([{"":""}])})}>
                    + Add charge
                </button>
            </ChargesHeader>
            <div>
            {invoice.charges.map((item,index) => {
                const key = Object.keys(item)[0];
                const value = parseInt(Object.values(item)[0]);
                return <Charge key={`key_${index}`}>
                    <Input placeholder='Name' value={key}
                    onChange={e => updateCharge(index, {[e.target.value]:value})}/>
                    <div>
                        $<Input placeholder="100" type='number' value={value} 
                        onChange={e => updateCharge(index, {[key]:e.target.value.toString()})}/>
                    </div>
                    <button onClick={() => deleteCharge(index)}>Delete</button>
                </Charge>
            })}
            </div>

            <Confirm onClick={() => {
                if(editing)
                    updateInvoice(invoice);
                else
                    createInvoice(invoice);
            }}>{editing ? 'Save changes' : 'Create invoice'}</Confirm>
        </div>
    </Outer></>;
}

function toMMDDYYYY(d) {
    const arr = d.split('-');
    return `${arr[1]}/${arr[2]}/${arr[0]}`;
}
function toYYYYMMDD(d) {
    const arr = d.split('/');
    return `${arr[2]}-${arr[0]}-${arr[1]}`;
}