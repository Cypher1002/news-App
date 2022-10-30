import React, { Component } from 'react'

export class NewsItem extends Component {

    render() {
        let {title,description, imageurl,newsUrl,author, date} =this.props;
        return (
            <div>
                <div className="card">
                    <img src={imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <small className="text-muted">by {!author?"unknown":author} on {new Date(date).toGMTString()}</small>
                            <p className="card-text">{description}... </p>
                            <a  rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem