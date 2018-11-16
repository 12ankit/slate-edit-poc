import React, { Component } from 'react'

export default class SideBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: "",
            select: ""
        }
    }
    onChange = (e) => {
        if (e.target.type === "search") {
            this.setState({ search: e.target.value })
        } else {
            this.setState({ select: e.target.value })
        }
    }
    render() {
        return (
            <aside className="sidebar">
                <input type='search' name='searchComments' value={this.state.search} onChange={this.onChange} />
                <nav>
                    <ul>
                        <li>
                            <select value={this.state.select} onChange={this.onChange}>
                                <option value="all">All</option>
                                <option value="open">Open</option>
                                <option value="resolved">resolved</option>
                            </select>
                        </li>
                    </ul>
                </nav>
                <div className="comments">
                    <ul>
                        {this.props.comments.map((comment, index) => {
                            if (comment.status !== "UNTOUCHED") {
                                return <li key={index} elementId={comment.elementId}>
                                    {comment.elementName}<br />
                                    {comment.text}<br />
                                    {comment.status}
                                </li>
                            }
                        })}
                    </ul>
                </div>
            </aside>
        )
    }
}