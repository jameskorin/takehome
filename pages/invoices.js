import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Outer, Table, TopRow, Fetching, Late } from '../styles/invoices'
import CreateInvoice from '../components/createInvoice'

export default function Invoices() {

    const [fetched, setFetched] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        getInvoices();
    },[])

    const getInvoices =async ()=> {
        setInvoices((await axios.get('https://takehome.api.bidsight.io/v2/invoices')).data);
        setFetched(true);
    }

    const createInvoice =(invoice)=> {
        setInvoices(invoices.concat([invoice]));
    }

    const d = new Date();

    // Sort invoices chronologically
    // Surface invoices without due dates to the top of the list
    let displayInvoices = invoices.sort((a,b) => 
        a.due_date === "" ? (a.id > b.id ? -1:1) :(
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
            <button onClick={() => setShowForm(true)}>+ Create invoice</button>
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

        {!fetched && <Fetching>
            Fetching invoices...
        </Fetching>}

        {fetched &&
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
                const late = item.status === 'outstanding' && (new Date(item.due_date) < d);
                return <tr>
                    <td>{item.name}</td>
                    <td>{item.due_date}</td>
                    <td><div>{item.status} {late ? <Late>late</Late>:null}</div></td>
                </tr>
            })}
            </tbody>
        </Table>}

        {fetched && displayInvoices.length === 0 &&
        <Fetching>
            No invoices
        </Fetching>}

        <CreateInvoice createInvoice={createInvoice} visible={showForm}/>
    </Outer>;
}