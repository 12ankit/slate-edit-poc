import React, { Component } from 'react'
import Comments from './Comments.js'

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            selectStatusAction: ""
        }
    }
    onChange = (e) => {
        switch(e.target.id){
            case "searchInput" :
                this.setState({ search: e.target.value })
                break
            case "statusSelect" :
                this.setState({ selectStatusAction: e.target.value })
                break
        }
    }
    render() {
        return (
            <aside className="sidebar">
                <input id="searchInput" type='search' name='searchComments' value={this.state.search} onChange={this.onChange} />
                <nav>
                    <ul>
                        <li>
                            <select id="statusSelect" value={this.state.select} onChange={this.onChange}>
                                <option value="all">All</option>
                                <option value="open">Open</option>
                                <option value="resolved">resolved</option>
                            </select>
                        </li>
                    </ul>
                </nav>
                <Comments commentActionHandler={this.props.commentActionHandler} searchedComment={this.state.search} comments={this.props.comments}/>
            </aside>
        )
    }
}