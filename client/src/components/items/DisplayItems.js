import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItems, deleteItem, editItem } from '../../actions/itemActions';
import Spinner from '../common/Spinner';

import '../../assets/css/admin.css';
//import '../../assets/js/modal.js';
 class DisplayItems extends Component {

    constructor(props){
        super(props);
        this.userId = this.props.auth.user.id; 
        //this component will receive props once it renders 
         //state of edit form input field
        this.state = {
            id: '',
            title: ''
            
        }
       //input form
       this.changeInput = this.changeInput.bind(this);

        this.openSideMenu = this.openSideMenu.bind(this);
        this.closeSideMenu = this.closeSideMenu.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);

        //modal
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.updateItem = this.updateItem.bind(this);
        
        
    }

    

    //when component mounts, it uses the user id to execute the getItems function in itemActions.js
    //user id is received as a props from redux within the constructor
   componentDidMount(){
     this.props.getItems(this.userId);
    }

    //delete item
    onDeleteItem(e){
      if(window.confirm('Are you sure you want to delete this item?')){
        this.props.deleteItem(e.target.id); 
      }
      
    }
 

    //layout
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

      //listen for open modal click
      openModal(e){
          //get modal element
          const modal = document.getElementById('itemModal');
          modal.style.display = 'block';//show modal which is hidden by default in css
          
          //change state of edit form input to current item clicked
          this.setState({
              id: e.target.id,
              title: e.target.title
             
          })
       
        }

        updateItem(e){
            e.preventDefault();
         
           const newItem = {
                title: this.state.title
           };
           //the id is in the state is set to that
           //of the current item clicked -- see openModal()
           //that id is used here
            this.props.editItem(newItem, this.state.id);
        }
      //close modal
      closeModal(){
        const modal = document.getElementById('itemModal');
       

        modal.style.display = 'none';//show modal which is hidden by default in css
      }

      changeInput(e){
        this.setState({[e.target.name]: e.target.value});
    }

    //mark completed items
    // checkCompleted(e){
    //     e.preventDefault();
    //    const itemStatus = {
    //         completed: 'finished'
    //     };

    //     this.props.markCompleted(itemStatus, e.target.id);
    // }

    render() {

        const { isAuthenticated} = this.props.auth;

        //redirect to login page if user is not logged in  -- restricting page access
        if(isAuthenticated === false){
            window.location.href = "/login";
        }
        
       //use destructuring to fetch data from state provided by redux store
       //as defined in mapstatetoprops below
       const { todos, loading } = this.props.items;
       //todos and loading are coming from items as defined in redux 
       
       //init itemlist
       let itemsList;

       if(todos === null || loading){
           //show spinner while items are still loading from database
           itemsList = <Spinner />
       }else{
           if(Object.keys(todos).length > 0){
               //loop through items array and display on page
               itemsList = (todos.map((todo) => 
                   <React.Fragment key={todo._id}>
                       <ul>
                       <li> 
                       
                            {todo.title} {' '}
                           <Link className="view-item-link" to={`/dashboard/view_item/${todo._id}`}>  view details</Link> 
                             <button className="delete-item-btn" onClick={this.onDeleteItem} 
                            id={todo._id}>Delete</button>
                             <button id={todo._id}  title={todo.title}  className="edit-item-btn" 
                             onClick={this.openModal}  
                            > Edit </button></li>
                       </ul>
                    
                    <div id="itemModal" className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <span id="close-btn" className="close-modal-btn" onClick={this.closeModal}>&times;</span>
                                <h2 className="modal-h2">Edit item</h2>
                            </div>

                            <div className="modal-body">
                                    
                                <form>
                                    <input className="edit-item-input" name="title" type="text" value={this.state.title} onChange={this.changeInput} />
                                    <input className="update-btn" type="submit" value="Update item" onClick={this.updateItem} />
                                </form>
                            </div>

                           
                        </div>
                     </div>
                            
                    </React.Fragment>
               
               ) ) 
           }else{
               itemsList = (
                       <p> You have not created any item, create an item</p> 
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
                    <h1 className="item-header">View your items</h1>
                            {itemsList }  
                </div>
            </div>
           
            </React.Fragment>
                                 
        );           
    }
}

DisplayItems.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    editItem: PropTypes.func.isRequired
    //markCompleted: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    auth: state.auth,//accessible via this.props.auth
    items: state.items,
    errors: state.errors
});

export default connect(mapStateToProps, { getItems, deleteItem, editItem })(DisplayItems);
