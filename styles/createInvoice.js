import styled from 'styled-components'

export const Outer = styled.div`
    position: fixed;
    top: 0px;
    width: 80vw;
    max-width: 600px;
    right: calc(100vw - 100% - 15px);
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