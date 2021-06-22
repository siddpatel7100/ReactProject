import React from 'react';
import {
    Card, CardImg, Breadcrumb, BreadcrumbItem, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import { Link } from 'react-router-dom'


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

function RenderComment({ comments }) {
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

            </div>
        )
    } else {
        return (<div></div>)
    }
}

const DishDetails = (props) => {

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

                <RenderComment comments={props.comments}></RenderComment>
            </div>
        </div>



    )
}


export default DishDetails