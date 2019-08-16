import React from 'react';
import '../../assets/css/main.css';
import vic from '../../assets/images/myheadshot.jpg';
import babe from '../../assets/images/babe.jpg';
import Robert from '../../assets/images/Robert.png';
//
 function Testimonials() {
    return (
        <React.Fragment>
        <div className="testimonials">
            <div className="inner">
                <h1>TESTIMONIALS</h1>
                    <div className="border"></div>
                    <div className="row">

                        <div className="col">
                            <div className="testimonial">
                                <img src={vic} alt="client" />
                                <div className="name">Victor Umezuruike</div>
                                <div className="stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <p>
                                    Cheta helps me remember all my tasks for the day. It's Simply amazing
                                </p>
                            </div>

                        </div>

                        <div className="col">
                            <div className="testimonial">
                                <img src={babe} alt="client" />
                                <div className="name">Precious Bosah</div>
                                <div className="stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                </div>
                                <p>
                                   With Cheta, I get to complete my tasks each day. I love the way the reminders 
                                   come in real time.
                                </p>
                            </div>

                        </div>

                        <div className="col">
                            <div className="testimonial">
                                <img src={Robert} alt="client" />
                                <div className="name">Robert Asibor</div>
                                <div className="stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star-o"></i>
                                    <i className="fa fa-star-o"></i>
                                </div>
                                <p>
                                   Kudos team, you guys really did an awesome job.
                                </p>
                            </div>

                        </div>

                    </div>

            </div>
           
        </div>
        <div className="footer">
            <p className="copyright"> <span>Cheta</span>, All rights reserved, 2019</p>
        </div>

        </React.Fragment>
    )
}

export default Testimonials;