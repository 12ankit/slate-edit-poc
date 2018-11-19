import React, { Component } from 'react'
import Comments from './Comments.js'

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            selectStatusAction: "ALL"
        }
    }
    onChange = (e) => {
        switch(e.target.id){
            case "searchInput" :
                this.setState({ search: e.target.value })
                break
            case "statusSelect" :
                this.setState({ selectStatusAction: e.target.value })
                this.props.dispatch({type:"FILTER_BY_STATUS",data: e.target.value})
                break
        }

    }
    render() {
        return (
            <aside className="sidebar" style={{display : this.props.display ? "inline-block" : "none"}}>
                <input id="searchInput" type='search' name='searchComments' value={this.state.search} onChange={this.onChange} />
                <nav>
                    <ul>
                        <li>
                            <select id="statusSelect" value={this.state.select} onChange={this.onChange}>
                                <option value="ALL">All</option>
                                <option value="OPEN">Open</option>
                                <option value="RESOLVE">Resolved</option>
                            </select>
                        </li>
                    </ul>
                </nav>
                <Comments filter={this.state.selectStatusAction} searchedComment={this.state.search} comments={this.props.comments}/>
            </aside>
        )
    }
}