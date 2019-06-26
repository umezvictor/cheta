import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItems, deleteItem } from '../../actions/itemActions';
import Spinner from '../common/Spinner';
import EditItemModal from '../items/EditItemModal';


 class DisplayItems extends Component {

    constructor(props){
        super(props);
        this.userId = this.props.auth.user.id; 
        //this component will receive props once it renders 
         
        //state for the modal 
        this.state = {
            isOpen: false,
            title: '',
            details: ''
        };
    }

    /*
    toggle modal, handles opening and closing of modal, 
    the isopen state determines whether the modal renders or not
    see EditItemModal.js, toggleModal is referenced using the show prop passed into
    the EditItemModal component called below
    */
    toggleModal = e => {
        // const title = e.target.title;
        // const details = e.target.details;
        // console.log(details);
        this.setState({
            isOpen: !this.state.isOpen,
            title:e.target.title,
            details: e.target.details
        });
        //console.log(e.target.details);
    };

    //when component mounts, it uses the user id to execute the getItems function in itemActions.js
    //user id is received as a props from redux within the constructor
   componentDidMount(){
     this.props.getItems(this.userId);
    }

    //delete item
    onDeleteClick(e){
       // console.log(e.target.id);
        this.props.deleteItem(e.target.id);
    }
//components must never modify its own props
    //onchange
    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }


    render() {
        
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
                            <li>{todo.title}</li>
                            <li>{todo.details}</li>
                            <li>{todo.creatorEmail}</li>
                            <li>{todo.createdBy}</li>
                            <li>{todo.remindMeBy}</li>
                            <li><Link to={`/dashboard/view_item/${todo._id}`}>View Details</Link></li>
                            <li><button className="btn btn-danger" onClick={this.onDeleteClick.bind(this)} 
                            id={todo._id}>Delete</button></li>
                            <li><button className="btn btn-primary" id={todo._id} title={todo.title} details={todo.details} onClick={this.toggleModal.bind(this)} 
                     >Edit Item</button></li>
                    </React.Fragment>
               
               ) ) 
           }else{
               itemsList = (
                       <li>You have not created any item, create an item</li> 
               );
           }
       }
        
        return (
               <div>
                   <ul> 
                   {itemsList }  
                 </ul>                   
                    
                    <EditItemModal show={this.state.isOpen} onClose={this.toggleModal}>
                        <form> 
                            <input name="title" type="text" value={this.state.title} onChange={this.handleChange.bind(this)}/> <br /><br />
                            <input name="details" type="text" value={this.state.details} onChange={this.handleChange.bind(this)} /> <br /><br />
                            <button type="submit">Edit Item</button>
                        </form>
                    </EditItemModal>       
               </div>                    
        );           
    }
}

DisplayItems.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.items
});

export default connect(mapStateToProps, { getItems, deleteItem })(DisplayItems);

