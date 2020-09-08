import React, { Component } from "react";
import axios from "axios";
import "./App.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      addModal: false,
      tasks: [],
      updateModal: false,
      updateId: "",
      addTask: "",
    };
    this.submitAdd = this.submitAdd.bind(this);
    this.getTasks = this.getTasks.bind(this);
  }

  componentWillMount() {
    this.getTasks();
  }

  getTasks() {
    axios.post("http://localhost:8000/api/get").then((res) => {
      this.setState({ tasks: res.data }, function () {
        console.log(this.state.tasks);
      });
    });
  }
  submitAdd() {
    axios({
      method: "post",
      json: true,
      url: "http://localhost:8000/api/create",
      data: {
        task: this.state.addTask,
      },
    })
      .then((res) => {
        this.getTasks();
      })
      .catch((error) => console.log(error));
  }
  render() {
    let add = (
      <div id="id01" class="w3-modal" style={{ display: "block" }}>
        <div class="w3-modal-content" style={{height:"200px"}}>
          <div class="w3-container" style={{padding: "50px",display:"inline"}}>
            <span
              onClick={() => {
                this.setState({ addModal: false });
              }}
              class="w3-button w3-display-topright"
            >
              &times;
            </span>
            <input
              type="text"
              name="tasks"
              className="w3-input w3-center"
              style={{width:"50%", marginLeft:"auto", marginRight:"auto"}}
              onChange={(e) => {
                this.setState({ addTask: e.target.value });
              }}
            />
            <button
              onClick={() => {
                this.submitAdd();
              }}

              className="w3-button w3-large w3-circle w3-xlarge w3-ripple w3-black w3-center"
              style={{ marginLeft:"48%", marginRight:"50%", marginTop:"20px"}}
            >
              {" "}
              +{" "}
            </button>
          </div>
        </div>
      </div>
    );
    return (
      <div>
        <div class="w3-bar w3-black">
          <a href="#!" onClick={() => this.setState({ addModal: true })} class="w3-bar-item w3-button">
            Ajouter
          </a>
        </div>
        {this.state.addModal ? add : ""}


        <div class="w3-container w3-display-middle">
          <ul class="w3-ul">
            {this.state.tasks.map((item, key) => {
              return (
                <li
                  key={key}
                  style={
                    item.state
                      ? { backgroundColor: "lightgreen", width: "50vh" }
                      : { backgroundColor: "", width: "50vh" }
                  }
                >
                  {item.tache}{" "}
                  <div style={{marginLeft:"5vh", display:"inline"}}>
                  <button
                    className="w3-btn w3-padding-large w3-hover-red w3-red"
                    onClick={() => {
                      axios({
                        method: "post",
                        json: true,
                        url: "http://localhost:8000/api/delete",
                        data: {
                          taskId: item._id,
                        },
                      })
                        .then((res) => {
                          if (res.data.success) {
                            this.getTasks();
                          }
                        })
                        .catch((error) => console.log(error));
                    }}
                  >
                    {" "}
                    -{" "}
                  </button>
                  <button
                    className="w3-btn w3-green w3-padding-large w3-hover-red"
                    onClick={() => {
                      axios({
                        method: "post",
                        json: true,
                        url: "http://localhost:8000/api/update",
                        data: {
                          taskId: item._id,
                        },
                      })
                        .then((res) => {
                          console.log(res)
                          if (res.data.success) {
                            this.getTasks();
                          }
                        })
                        .catch((error) => console.log(error));
                    }}
                  >
                    Fait
                  </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
