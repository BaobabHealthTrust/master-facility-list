import React from 'react';
import styled from 'styled-components';

export default ({ heading, view }) => {
  const CardContainer = styled.div.attrs({ className: 'z-depth-2 mfl-w-9' })`
    width: 100%;
  `
  return (
    <CardContainer>
      <div className="mfl-card-title  bg-blue">
        {heading}
      </div>
      <div className="mfl-p-2 mfl-bm-1">
        {view}
      </div>
    </CardContainer>
  );
}
