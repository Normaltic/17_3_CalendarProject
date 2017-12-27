import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class VoteList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
		let voteList = this.props.voteList ? this.props.voteList : [];
        return (
            <ul className="collection" >
                {
                    voteList.map( (item, i) => {

                        if( item.place == '' ) item.place = '미정';

                        return (
                            <li className="collection-item" key={i} name={i} onClick={ () => { this.props.selectVote(this.props.voteList[i]) } }>
                                <h4 name={i}>{item.title}</h4>
                                <p className="sche desc" name={i}>{item.intro ? item.intro : "Description"}</p>
                                <p className="sche date hide-on-med-and-down">{moment(item.date).format('LLLL')}</p>
                                <p className="sche place hide-on-med-and-down">{item.place}</p>
                            </li>   
                        )
                    })
                }
            </ul>
        )
    }
}


export default VoteList;
