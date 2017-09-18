import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VoteList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="collection" >
                {
                    this.props.voteList.map( (item, i) => (
                        <li className="collection-item" key={i} name={i} onClick={ () => { this.props.selectVote(this.props.voteList[i]) } }>
                            <h4 name={i}>{item.title}</h4>
                            <p className="sche desc" name={i}>{item.intro ? item.intro : "Description"}</p>
                            <p className="sche date hide-on-med-and-down">{item.date}</p>
                            <p className="sche place hide-on-med-and-down">{item.place}</p>
                        </li>   
                    ))
                }
            </ul>
        )
    }
}


export default VoteList;