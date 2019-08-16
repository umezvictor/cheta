import React from 'react';
import '../../assets/css/main.css';
//
 function Features() {
    return (
        <div className="features">
            <h1>Features</h1>
            <div className="cen">

                <div className="feature">
                <i className="fa fa-envelope" aria-hidden="true"></i>
                    <h2>Email notifications</h2>
                    <p>
                        Get real time email notifications.
                    </p>
                </div>

                <div className="feature">
                <i className="fa fa-comments" aria-hidden="true"></i>
                    <h2>SMS notifications</h2>
                    <p>
                        Cheta sends you real time SMS notifications.
                    </p>
                </div>
                
                <div className="feature">
                <i className="fa fa-bell-o" aria-hidden="true"></i>
                    <h2>Push notifications</h2>
                    <p>
                        Get real time Push notifications accross all your devices
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Features;