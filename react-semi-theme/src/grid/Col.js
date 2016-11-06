import React, { PropTypes } from 'react';

const ModificatorType = PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]);

const Col = (props) => {
    let className = 'sg-col';
    if(props.noPadding) className += ' sg-no-pad';
    return (
        <div className={className} style={props.style} width={props.width}>
            {props.children}
        </div>
    );
};

Col.propTypes = {
    xs: ModificatorType,
    sm: ModificatorType,
    md: ModificatorType,
    lg: ModificatorType,
    xl: ModificatorType,
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array
    ])
};
export default Col;