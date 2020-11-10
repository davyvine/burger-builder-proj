import React from 'react';

// a function that returns a functional component

const withClass = (WrappedComponent, className) => {
    return props => (
        <div className={className}>
            <WrappedComponent {...props}/>
        </div>
    );
}

export default withClass;

// sets up a class on a div that wraps up a component