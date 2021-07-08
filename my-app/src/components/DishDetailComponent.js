import React from 'react';
import {
    Card, CardImg, Breadcrumb, BreadcrumbItem, CardText, CardBody,
    CardTitle, Button, Modal, ModalBody, ModalHeader, Row, Col, Label
} from 'reactstrap';
import { Link } from 'react-router-dom'
import { Component } from 'react';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent';
const minLength = (len) => (val) => (val) && (val.length >= len)
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const required = (val) => val && val.length

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }
    handleLogin(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <React.Fragment>
                <Button className='bg-white text-dark' onClick={this.toggleModal}>
                    <i className="fa fa-pencil da-lg"></i>{' '}Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleLogin(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={4}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={4}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" name="author" placeholder="Your Name"
                                        className="form-control"
                                        validators={{ minLength: minLength(3), maxLength: maxLength(15) }} />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{
                                            maxLength: "Must be 15 charater or less",
                                            minLength: "Must be greater than 2 characters"
                                        }} >
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={4}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment"
                                        className="form-control"
                                        validators={{ required }} rows="6" />
                                    <Errors className="text-danger" model=".author" show="touched"
                                        messages={{ required: "COmment Required" }} >
                                    </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}
function RenderDish({ dish }) {
    if (dish != null) {
        return (

            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle> {dish.name}</CardTitle>
                    <CardText> {dish.description} </CardText>
                </CardBody>
            </Card>

        );
    }
    else {
        return (
            <div></div>
        );
    }
}

function RenderComment({ dishId, comments, addComment }) {
    if (comments != null) {
        const comm = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, &nbsp;
                        {new Intl.DateTimeFormat('en-US',
                            {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit'
                            }).format(new Date(Date.parse(comment.date)))}</p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4>Comment</h4>
                <ul className='list-unstyled'>
                    {comm}
                </ul>
                <CommentForm comments={comments} dishId={dishId} addComment={addComment}></CommentForm>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

const DishDetails = (props) => {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else
        if (props.dish == null) {
            return (<div></div>);
        }
    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb>

                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>

                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}></RenderDish>
                </div>
                <RenderComment comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}></RenderComment>

            </div>
        </div>



    )
}


export default DishDetails