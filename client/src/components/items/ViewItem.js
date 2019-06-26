import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getSingleItem } from '../../actions/itemActions';
import Spinner from '../common/Spinner';


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
       
     this.props.getSingleItem(this.itemId);
    }



    render() {
        
       const { todo, loading } = this.props.items
       //test if items has finished loading
       let ItemDetails;

       if(todo === null || loading){
           ItemDetails = <Spinner />
       }else{
           if(Object.keys(todo).length > 0){
               ItemDetails = (
                   <ul>
                       <li>{todo.createdAt}</li>
                       <li>{todo.title}</li>
                       <li>{todo.details}</li>
                       <li>{todo.createdBy}</li>
                       <li>{todo.remindMeBy}</li>
                       <li>{todo.completed}</li>
                       <li>{todo.creatorEmail}</li>
                       <li>{todo.creatorPhoneNumber}</li>
                       <li><Link to="/dashboard/get_items">Back</Link></li>
                   </ul>
               );
           }else{
               //no item available
               ItemDetails = (
                <p>item not found. Create a new one
                    <Link to="/dashboard/get_items">Back</Link>
                </p>
                
                );
              
           }
       }
        
        return (
            <div>
              {ItemDetails}     
            </div>
                
        );
        
        
           
              
    }
}

ViewItem.propTypes = {
    getSingleItem: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    items: state.items
});

export default connect(mapStateToProps, { getSingleItem })(ViewItem);