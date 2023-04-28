import styled from 'styled-components'

export const Outer = styled.div`
    position: fixed;
    top: 0px;
    width: 80vw;
    max-width: 600px;
    right: calc(100vw - 100% - 0px);
    box-shadow: -4px 0px 10px rgba(0,0,0,0.25);
    height: 100vh;
    background: #FFFFFF;
    padding: 10px;
`;

export const Backing = styled.div`
    background: rgba(0,0,0,0.25);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
`;

export const ChargesHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    button {
        background: none;
        text-decoration: underline;
        border: none;
        cursor: pointer;
    }
`;

export const Input = styled.input`
    border: 1px solid #333333;
    border-radius: 5px;
    background: none;
    padding: 5px;
`;
export const Select = styled.select`
    border: 1px solid #333333;
    border-radius: 5px;
    background: none;
    padding: 5px;
`;

export const Charge = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    padding-bottom: 0px;
    margin-bottom: 10px;
    :not(:last-child) {
        border-bottom: 1px solid #ACACAC;
    }

    button {
        border: none;
        background: none;
        position: absolute;
        top: 5px;
        right: 0px;
        cursor: pointer;
        text-decoration: underline;
    }

    input {
        max-width: min(400px, calc(100% - 40px));
        :first-child {
            margin-bottom: 10px;
        }
    }
`;

export const Confirm = styled.button`
    position: absolute;
    bottom: 10px;
    left: 10px;
    width: calc(100% - 20px);
    padding: 10px;
    font-weight: 500;
    color: #FFFFFF;
    background: #6060F6;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

export const Cancel = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    text-decoration: underline;
`;

export const BasicInfo = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    
    input, select {
        margin: 10px 0px 0px 0px;
    }

    label {
        font-size: 14px;
        margin: 10px 0px -5px 0px;
    }
`;