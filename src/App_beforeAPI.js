import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordon Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function isSearched(searchTerm) {
  return function(item) {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase())
  }
}

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList});
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
        </div>
          <Table 
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
        
        {/* <form>
          <input 
            type="text" 
            value={searchTerm}
            onChange={this.onSearchChange}
          />
        </form>
        {list.filter(isSearched(searchTerm)).map(item =>  
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => this.onDismiss(item.objectID)}
                type= "button"
              >
                Dismiss
              </button>
            </span>
          </div>
          )} */}
      </div>
    );
  }
}

// Class Component
// class Search extends Component {
//   render() {
//     const { value, onChange, children } = this.props;
//     return (
//       <form>
//         {children} <input 
//           type="text"
//           value={value}
//           onChange={onChange}
//         />
//       </form>
//     );
//   }
// }

// Functional Component
const Search = ({ value, onChange, children }) =>
    <form>
      {children} <input 
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>

// Class Component
// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props;
//     return (
//       <div>
//         {list.filter(isSearched(pattern)).map(item =>
//           <div key={item.objectID}>
//             <span>
//               <a href={item.url}>{item.title}</a>
//             </span>
//             <span>{item.author}</span>
//             <span>{item.num_comments}</span>
//             <span>{item.points}</span>
//             <span>
//               <Button onClick={() => onDismiss(item.objectID)}>
//                 Dismiss
//               </Button>
//             </span>
//           </div> )}
//       </div>
//     );
//   }
// }

// Functional Component
const Table = ({ list, pattern, onDismiss }) =>
    <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button 
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div> )}
      </div>

// Class Component
// class Button extends Component {
//   render() {
//     const {
//       onClick,
//       className = '',
//       children,
//     } = this.props;

//     return (
//       <button
//         onClick={onClick}
//         className={className}
//         type="button"
//       >
//         {children}
//       </button>
//     );
//   }
// }

// Functional Component
const Button = ({ onClick, className = '', children }) =>
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    
export default App;