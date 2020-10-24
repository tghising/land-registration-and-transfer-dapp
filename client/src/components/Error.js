import React, {Component} from 'react';

class Error extends Component{
    render() {
        return (
            // Main Container start here
            <main role="main" className="container">
                <div className="row">
                    <div>
                        <p className="text text-danger"> <b>Warnning: Unauthorized access!!!</b></p>
                    </div>
                </div>
            </main>
            // Main Container end here
        );
    }

}

export default Error;