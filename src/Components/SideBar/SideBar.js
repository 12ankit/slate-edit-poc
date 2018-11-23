import React, { Component } from 'react'
import Comments from './Comments.js'

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            selectStatusAction: "ALL",
            sortSelect: "OLDESTFIRST"
        }
    }
    onChange = (e) => {
        let elementId
        switch (e.target.id) {
            case "searchInput":
                this.setState({ search: e.target.value })
                break
            case "sortSelect":
                this.setState({ sortSelect: e.target.value })
                elementId = this.props.tempSelectedElementId
                if (!elementId) {
                    return null
                }
                this.props.dispatch({
                    type: "SORT_ORDER",
                    data: {
                        status: e.target.value,
                        elementId: elementId
                    }
                })
                break
            case "statusSelect":
                this.setState({ selectStatusAction: e.target.value })
                elementId = this.props.tempSelectedElementId
                if (!elementId) {
                    return null
                }
                this.props.dispatch({
                    type: "FILTER_BY_STATUS",
                    data: {
                        status: e.target.value,
                        elementId: elementId
                    }
                })
                break
            default:
                return null
        }
    }
    onClick = () =>{
        if(this.props.display === false){
            this.props.dispatch({ type: "SHOW_HIDE_SIDEBAR", data: null })
        }else{
            this.props.dispatch({type:"CLEAR_SIDEBAR_COMMENTS"})
        }
    }
    render() {
        return (
            <div className="sidebar">
                <aside style={{ display: this.props.display ? "inline-block" : "none" }}>
                    <h4 style={{ margin: "15px 0px 0px 30px" }}>Comments </h4><br />
                    <div className="siderbar-inputs">
                        <div className="searchBar">
                            <img src="https://cdn4.iconfinder.com/data/icons/kripto-black-2/512/kripto-search-b.png" alt="search" />
                            <input id="searchInput" type='search' name='searchComments' value={this.state.search} onChange={this.onChange} /><br /><br />
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td><p className="pCaptions">Sort By : </p></td>
                                    <td><select id="sortSelect" value={this.state.sortSelect} onChange={this.onChange}>
                                        <option value="OLDESTFIRST">Oldest to Newest</option>
                                        <option value="NEWESTFIRST">Newest to Oldest</option>
                                    </select></td>
                                </tr>
                                <tr>
                                    <td><p className="pCaptions">Status : </p></td>
                                    <td><select id="statusSelect" value={this.state.select} onChange={this.onChange}>
                                        <option value="ALL">All</option>
                                        <option value="OPEN">Open</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </select></td>
                                </tr>
                            </tbody>
                        </table>
                    </div><br /><br />
                    <Comments searchedComment={this.state.search}
                        sort={this.state.sortSelect}
                        elementId={this.props.tempSelectedElementId}
                        dispatch={this.props.dispatch}
                        filteredComments={this.props.filteredComments} />
                </aside>
                <button type="button" style={{position:"fixed" , zIndex:"2"}} onClick={this.onClick}>
                    ☰
            </button>
            </div>
        )
    }
}