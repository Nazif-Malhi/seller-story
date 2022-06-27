import React from 'react'
import styled from "styled-components";
import { AccountBox } from './AccountBox';

const AppContaineri = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AppContainer = ({handleRoute}) => {
    return (
        <AppContaineri>
            <AccountBox handleRoute = {handleRoute}/>
        </AppContaineri>
    )
}

export default AppContainer
