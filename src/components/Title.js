import React from 'react';

import styled from 'styled-components';

function Title({title}) {
  return (
    <TitleDiv>
      {title}
    </TitleDiv>
  );
}

export default Title;

const TitleDiv = styled.div`
  font-family: 'Montserrat', sans-serif !important;
  font-size: 2rem; 
  color: #250001;
  text-transform: capitalize;
`