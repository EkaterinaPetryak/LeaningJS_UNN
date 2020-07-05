import React from 'react';
import ReactDom from 'react-dom';

const h1 = React.createElement(
    'h1',
    {},
    'Тра-та-та-ту'
);
ReactDom.render(
    h1,
    document.getElementById('app')
);
