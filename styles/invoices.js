import styled, { css } from 'styled-components'

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
        div {
            display: flex;
            justify-content: flex-end;
        }
        button {
            border: none;
            background: none;
            cursor: pointer;
            text-decoration: underline;
        }
    }

    th {
        font-weight: 300;
    }
`;

export const Late = styled.div`
    background: #f66060;
    color: white;
    border-radius: 100px;
    padding: 2px 5px;
    margin: 0px 0px 0px 10px;
`;

export const Fetching = styled.div`
    width: 100%;
    height: 100%;
    min-height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 500;
    color: #ACACAC;
`;

export const DueDateTH = styled.th`
    cursor: pointer;
`;