import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: 'in',
        PageSize: 5,
        category: 'general',
    }

    static propTypes = {
        country: propTypes.string,
        PageSize: propTypes.number,
        category: propTypes.string,
    }
    articles = []
    constructor(props) {

        super(props);
        this.state = {
            articles: [], //idhr [] aayega
            loading: false,
            page: 1
        }
        document.title = `${this.props.category}-NewsBrewer`
    }

    async UpdateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a2049e3081b4f87acd68fc2f3b49cc1&page=${this.state.page}&pageSize=${this.props.PageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalresults: parsedData.totalresults,
            loading: false,
            // totalresults:0
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.UpdateNews()

    }

    handlenext = async () => {
        //    console.log("previous")
        //    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a2049e3081b4f87acd68fc2f3b49cc1&page=${this.state.page+1}&pageSize=${this.props.PageSize}`;
        //    this.setState({loading:true});
        //    let data = await fetch(url);
        //    let parsedData = await  data.json();
        //    console.log(parsedData)
        //    this.setState({
        //    page:this.state.page+1,pageNo
        //    articles:parsedData.articles,
        //    loading:false
        //    }) 

        this.setState({ page: this.state.page + 1 })
        this.UpdateNews()
    }
    handleprevious = async () => {
        console.log("next")
        // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a2049e3081b4f87acd68fc2f3b49cc1&page=${this.state.page-1}&pageSize=${this.props.PageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await  data.json();
        // console.log(parsedData)
        // console.log(this.state.articles)
        // this.setState({
        // page:this.state.page-1,
        // articles:parsedData.articles,
        // loading:false
        // }) 
        this.setState({ page: this.state.page - 1 })
        this.UpdateNews()
    }

    fetchMoreData = async () => {
      this.setState({page: this.state.page+1})
        
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=5a2049e3081b4f87acd68fc2f3b49cc1&page=${this.state.page}&pageSize=${this.props.PageSize}`;
    //   this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData)
      this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalresults: parsedData.totalresults,
          Totalresults:0
      })

      };
    

    render() {
        return (
            <div>
                <h2 className="text-center">News-Brewer top headlines- {this.props.category}</h2>
                {this.state.loading&&<Spinner/>} 
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalresults}
                    loader={<h4>Loading...</h4>}
                >   
                     <div className='container'>                   
                      <div className="row">


                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 48) : "_blank"} description={element.description ? element.description.slice(0, 88) : ""}
                                    imageurl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                    </div>


                </InfiniteScroll>
               </div>
        )
    }
}

export default News