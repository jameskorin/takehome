import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Outer, Table, TopRow } from '../styles/invoices'
import CreateInvoice from '../components/createInvoice'

export default function Invoices() {

    const [invoices, setInvoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getInvoices();
    },[])

    useEffect(() => {
        console.log(invoices.filter(e => e.status === 'draft'));
    },[invoices])

    const getInvoices =async ()=> {
        setInvoices((await axios.get('https://takehome.api.bidsight.io/v2/invoices')).data);
    }

    const createInvoice =(invoice)=> {
        setInvoices(invoices.concat([invoice]));
    }

    const d = new Date();
    let displayInvoices = invoices.sort((a,b) => 
        a.due_date === "" ? -1 :(
        (new Date(a.due_date)) > (new Date(b.due_date))
    ? -1 : 1));
    
    // Search by name
    if(search !== '')
        displayInvoices = invoices.filter(e => e.name.toLowerCase().indexOf(search) > -1);
    
    // Filter
    switch(filter) {
        case 'all': { break; }
        case 'outstanding':
        case 'paid':
        case 'draft': {
            displayInvoices = displayInvoices.filter(e => e.status === filter);
            break;
        }
        case 'late': {
            displayInvoices = displayInvoices.filter(e => 
                e.status === 'outstanding' &&
                (new Date(e.due_date) < d)
            );
            break;
        }
        default: { break; }
    }

    return <Outer>
        <TopRow>
            <h1>Invoices</h1>
            <button onClick={() => setShowForm(!showForm)}>+ Create invoice</button>
        </TopRow>

        <TopRow>
            <input placeholder='🔍 Search'
            onChange={e => setSearch(e.target.value.trim().toLowerCase())}/>
            <select onChange={e => setFilter(e.target.value.toLowerCase())}>
                <option>All</option>
                <option>Outstanding</option>
                <option>Paid</option>
                <option>Draft</option>
                <option>Late</option>
            </select>
        </TopRow>

        <Table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Due date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {displayInvoices.map((item,index) => {
                return <tr>
                    <td>{item.name}</td>
                    <td>{item.due_date}</td>
                    <td>{item.status}</td>
                </tr>
            })}
            </tbody>
        </Table>
        <CreateInvoice createInvoice={createInvoice} visible={showForm}/>
    </Outer>;
}