import React, { Component } from 'react';
import Identicon from 'identicon.js';
import MEditor from "@uiw/react-md-editor";

class Main extends Component {


  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <h2>Share Image</h2>

              <form onSubmit = {(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                const authorName = this.authorName.value
                this.props.uploadImage(description, authorName)
              }} >
                <input type='file' accept = ".jpg, .jpeg, .png, .bmp, .gif" onChange = {this.props.captureFile} />
                <div className = "form-group mr-2-sm-2">
                    <br></br>

                    <input
                       id = "authorName"
                       type = "text"
                       ref = {(input) => {this.authorName = input}}
                       className = "form-control"
                       placeholder = "Display name"
                       required

                     />

                    <textarea
                      id = "imageDescription"
                      type = "text"
                      ref = {(input) => { this.imageDescription = input }}
                      className = "form-control"
                      placeholder = "Description"
                      rows = '4'
                      cols = '60'
                      required
                    />

                </div>


                <button type = "submit" className = "btn btn-primary btn-block btn-lg">Upload File</button>
              </form>

              <p>&nbsp;</p>
              { this.props.images.map((image, key) => {
                return(
                    <div className="card mb-4" key={key} >
                      <div className="card-header">
                        <img
                            className='mr-2'
                            width='30'
                            height='30'
                            src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                        />

                        <small className="text-muted">{image.author}  <br></br>  ({image.authorName})</small>
                      </div>

                      <ul id="imageList" className="list-group list-group-flush">
                        <li className="list-group-item">
                          <p className="text-center"><img src={`https://ipfs.infura.io/ipfs/${image.hash}`} style={{ maxWidth: '420px'}}/></p>
                          <p>{image.description}</p>
                        </li>
                        <li key={key} className="list-group-item py-2">
                          <small className="float-left mt-1 text-muted">
                            Donation count: {window.web3.utils.fromWei(image.tipAmount.toString(), 'Ether')} ETH
                          </small>
                          <button
                              className="btn btn-link btn-sm float-right pt-0"
                              name={image.id}
                              onClick={(event) => {
                                let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                                console.log(event.target.name, tipAmount)
                                this.props.tipImageOwner(event.target.name, tipAmount)
                              }}
                          >
                            Donate 0.1 eth
                          </button>
                        </li>
                      </ul>
                    </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;