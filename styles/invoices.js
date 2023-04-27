import styled from 'styled-components'

export const Outer = styled.div`
    max-width: 800px;
`;

export const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
        border: none;
        color: #ffffff;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 5px;
        background: #6060F6;
        cursor: pointer;
    }

    select, input {
        border-radius: 100px;
        border: 1px solid #ACACAC;
        padding: 5px 10px;
    }

    select {
        border-radius: 5px;
    }
`;
export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    tr {
        border-bottom: 1px solid #ACACAC;
    }
    th, td {
        padding: 10px;
        text-align: right;
        :first-child {
            text-align: left;
        }
    }

    th {
        font-weight: 300;
    }
`;