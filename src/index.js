//jshint esversion:6

import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';


class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: [],
      order: 1,
      showList: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.showOrHideList = this.showOrHideList.bind(this);
    this.crossOrUncrossItem = this.crossOrUncrossItem.bind(this);
  }

  onChange(event) {
    this.setState({term: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();

    let newItem = {
      id: this.state.order,
      text: this.state.term,
      isCrossedOut: false,
    };

    if (this.state.term !== "") {
      this.setState({
        term: "",
        items: [...this.state.items, newItem],
        order: this.state.order + 1,
      });
    }
  }

  deleteItem(id) {
    let update = this.state.items.filter(el => el.id !== id);
    this.setState({
      items: update,
    });
  }

  showOrHideList() {
    this.setState({
      showList: !this.state.showList,
    });
    console.log(this.state.showList);
  }
  //work in progress...
  crossOrUncrossItem(id) {
    // let currItem = this.state.items.filter(el => el.id === id);
    // currItem.isCrossedOut = !currItem.isCrossedOut;
    // console.log("Current item is...");
    // console.log(currItem);
    // let update = this.state.items.filter(el => el.id !== id);
    // update.push(currItem);
    // console.log("After pushing current item to update " + update);
    // this.setState({
    //   items: update,
    // });
  }

  render() {
    if (this.state.showList) {
      return (
        <div className="to-do-list">
          <div className="header">
            <h2 className="title" onClick={this.showOrHideList}>To Do List</h2>
            <CreateNew value={this.state.term} onChange={this.onChange} onSubmit={this.onSubmit}/>
          </div>
          <ListItems items={this.state.items} crossOrUncrossItem={this.crossOrUncrossItem} onDelete={this.deleteItem}/>
        </div>
      );
    }
    return (
      <div className="to-do-list hidden">
        <div className="header" onClick={this.showOrHideList}>
        <h2 className="title">To Do List</h2>
        <CreateNew value={this.state.term} onChange={this.onChange} onSubmit={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

function CreateNew(props) {
  return (
    <form onSubmit={props.onSubmit}>
      <input className="input-text" value={props.value} onChange={props.onChange} />
      <button className="btn add-btn">+</button>
    </form>
  );
}

function ListItems(props) {
  console.log(props);
  return (
    <ul className="list">
      {props.items.map((item) => (
        <li className="item" key={item.id} onClick={() => props.crossOrUncrossItem(item.id)}><button className="btn" onClick={() => props.onDelete(item.id)}>-</button> {item.text}</li>
      ))}
    </ul>
  )
}

ReactDOM.render(<ToDoList />, document.getElementById("root"));
