import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TopRow } from '../styles/invoices'

export default function Invoices() {

    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        getInvoices();
    },[])

    const getInvoices =async ()=> {
        setInvoices((await axios.get('https://takehome.api.bidsight.io/v2/invoices')).data);
    }

    return <div>
        <TopRow>
            <h1>Invoices</h1>
            <button>+ Create invoice</button>
        </TopRow>
        <table>
            <tbody>
            {invoices.map((item,index) => {
                return <tr>
                    <td>{item.name}</td>
                    <td>{item.due_date}</td>
                    <td>{item.status}</td>
                </tr>
            })}
            </tbody>
        </table>
    </div>;
}