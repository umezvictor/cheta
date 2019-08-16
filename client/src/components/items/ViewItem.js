import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSingleItem } from '../../actions/itemActions';
import Spinner from '../common/Spinner';
import '../../assets/css/admin.css';

 class ViewItem extends Component {

    constructor(props){
        super(props);
        /*k
        this component receives the item id as a url parameter
        which is then retrieved below and used to fetch the particular item
        the id is added to the route of this component in in app.js
        */
        this.itemId = props.match.params.id;
        
    }

   componentDidMount(){
       //display item details as soon as component loads
     this.props.getSingleItem(this.itemId);
    }

    openSideMenu(){
        
        //side menu
        const sideMenu = document.getElementById('side-menu'); 
        sideMenu.style.width = '250px';
        sideMenu.style.backgroundColor = '#04A777';
        //close-btn
       const closeBtn = document.getElementById('close-btn');
       closeBtn.style.display = 'block';
       closeBtn.style.position = 'static';
       closeBtn.style.top = '0';
       closeBtn.style.rigth = '22px';
       closeBtn.style.fontSize = '20px';
       closeBtn.style.marginLeft = '120px';
       closeBtn.style.color = '#fff';
       closeBtn.style.opacity = '0.9';
       
        //home link
        const homeLink = document.getElementById('home-link');
        homeLink.style.display = 'block';
        homeLink.style.padding = ' 10px 10px 10px 30px';
        homeLink.style.textDecoration = 'none';
        homeLink.style.fontSize = '14px';
        homeLink.style.color = '#fff';
        homeLink.style.transition = '0.3s';

        //create-item-link
        const createItemLink = document.getElementById('create-item-link');
        createItemLink.style.display = 'block';
        createItemLink.style.padding = ' 10px 10px 10px 30px';
        createItemLink.style.textDecoration = 'none';
        createItemLink.style.fontSize = '14px';
        createItemLink.style.color = '#fff';
        createItemLink.style.transition = '0.3s';

        //view item link
        const viewItemLink =  document.getElementById('view-item-link');
        viewItemLink.style.display = 'block';
        viewItemLink.style.padding = ' 10px 10px 10px 30px';
        viewItemLink.style.textDecoration = 'none';
        viewItemLink.style.fontSize = '14px';
        viewItemLink.style.color = '#fff';
        viewItemLink.style.transition = '0.3s';

      }

      closeSideMenu(){
            const sideMenu =  document.getElementById('side-menu');
            sideMenu.style.width = '0';
            sideMenu.style.transition = '0.5s';
            document.getElementById('main').style.marginLeft = '0';
      }

    render() {
        const { isAuthenticated} = this.props.auth;

        //redirect to login page if user is not logged in  -- restricting page access
        if(isAuthenticated === false){
            window.location.href = "/login";
        }


       const { todo, loading } = this.props.items;
       
       let itemDetails;

       if(todo === null || loading){
           itemDetails = <Spinner />
       }else{
           if(Object.keys(todo).length > 0){
               itemDetails = (
                   <ul>
                       <li className="item-detail"><span className="item-data">Title:</span>  {todo.title}</li>
                       <li className="item-detail"><span className="item-data">Date created:</span>  {todo.createdAt}</li>
                       <li className="item-detail"><span className="item-data">Details:</span>  {todo.details}</li>
                       <li className="item-detail"><span className="item-data">Created by:</span>  {todo.createdBy}</li>
                       <li className="item-detail"><span className="item-data">Due date:</span>  {todo.remindMeBy}</li>
                       <li className="item-detail"><span className="item-data">Recipient email:</span>  {todo.creatorEmail}</li>
                       <li className="item-detail"><span className="item-data">Recipient phone:</span>  0{todo.creatorPhoneNumber}</li><br />
                       <li><a className="back-link" href="/dashboard/get_items">Back</a></li>
                   </ul>
               );
           }else{
               //no item available
               itemDetails = (
                <p>item not found. Create a new one
                    <Link to="/dashboard/get_items">Back</Link>
                </p>
                
                );
              
           }
       }
        
        return (
            <React.Fragment>
<nav className="navbar">
<span className="open-slide">
    <button className="open-menu-btn" onClick={this.openSideMenu}>
                <svg width="30" height="30">
                    <path d="M0,5 30,5" stroke="#D78521" strokeWidth="3"/>
                    <path d="M0,14 30,14" stroke="#D78521" strokeWidth="3" />
                    <path d="M0,23 30,23" stroke="#D78521" strokeWidth="3" />
                </svg>
            </button>
        </span>

        
</nav>

<div id="display" className="display-area">
    <div id="side-menu" className="side-nav ">
    
        <button href="#" id="close-btn" className="btn-close" onClick={this.closeSideMenu}>&times;</button>
        <a href="/dashboard" id="home-link"><i className="fa fa-home" aria-hidden="true"></i> Dashboard</a>
        <a href="/dashboard/add_item" id="create-item-link"><i className="fa fa-plus" aria-hidden="true"></i> Add Item</a>
        <a href="/dashboard/get_items" id="view-item-link"><i className="fa fa-eye" aria-hidden="true"></i> View Items</a>
        
    </div>
   
   

    <div id="main" className="main-content">
       
        <ul> 
                {itemDetails}  
        </ul>                   
         
    </div>
</div>

</React.Fragment>
                
        );             
    }
}

ViewItem.propTypes = {
    getSingleItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.items,
    errors: state.errors
});

export default connect(mapStateToProps, { getSingleItem })(ViewItem);

