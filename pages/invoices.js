import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Outer, Table, TopRow, Fetching, Late, DueDateTH } from '../styles/invoices'
import CreateInvoice from '../components/createInvoice'

export default function Invoices() {

    const [fetched, setFetched] = useState(false);
    const [invoices, setInvoices] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [editing, setEditing] = useState(-1);
    const [chronDirection, setChronDirection] = useState(1);

    useEffect(() => {
        getInvoices();
    },[])

    useEffect(() => {
        if(editing > -1) setShowForm(true);
    },[editing])

    const getInvoices =async ()=> {
        setInvoices((await axios.get('https://takehome.api.bidsight.io/v2/invoices')).data);
        setFetched(true);
    }

    const createInvoice =(invoice)=> {
        invoice.id = (invoices.length + 1).toString();
        setInvoices(invoices.concat([invoice]));
        setShowForm(false);
    }

    const updateInvoice =(invoice)=> {
        let i = _.cloneDeep(invoices);
        i[editing] = invoice;
        setInvoices(i)
        setEditing(-1);
        setShowForm(false);
    }

    const cancel =()=> {
        setEditing(-1);
        setShowForm(false);
    }

    const d = new Date();

    // Sort invoices chronologically
    // Surface invoices without due dates to the top of the list
    let displayInvoices = invoices.filter(e => e.due_date === "").concat(
        invoices.filter(e => e.due_date !== "").sort((a,b) => 
        (new Date(a.due_date)) > (new Date(b.due_date))
    ? -chronDirection : chronDirection));
    
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
                    <DueDateTH onClick={() => setChronDirection(-chronDirection)}>
                        Due date {chronDirection > 0 ? '🔼':'🔽'}
                    </DueDateTH>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {displayInvoices.map((item,index) => {
                const late = item.status === 'outstanding' && (new Date(item.due_date) < d);
                return <tr key={`${item.name}_${index}`}>
                    <td>{item.name}</td>
                    <td>{item.due_date}</td>
                    <td><div>
                        {item.status[0].toUpperCase()}{item.status.substring(1)}{late ? 
                        <Late>Late</Late>:null}
                    </div></td>
                    <td>
                        <button onClick={() => 
                            setEditing(invoices.findIndex(e => e.id === item.id))
                        }>
                            Edit
                        </button>
                    </td>
                </tr>
            })}
            </tbody>
        </Table>}

        {fetched && displayInvoices.length === 0 &&
        <Fetching>
            No invoices
        </Fetching>}

        <CreateInvoice editing={editing > -1} 
        existingInvoice={editing > -1 ? invoices[editing] : null}
        updateInvoice={updateInvoice}
        createInvoice={createInvoice} 
        visible={showForm}
        cancel={cancel}/>
    </Outer>;
}