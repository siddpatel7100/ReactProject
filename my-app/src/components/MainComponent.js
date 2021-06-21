import { Navbar, NavbarBrand } from 'reactstrap';
import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes'
import DishDetails from './DishDetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Redirect,Route} from 'react-router'



class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dishes: DISHES,
            
        };
    }
   
    render() {
        const HomePage = ()=> {
            return(
                <Home/>
            )
        }
        return (
            <div>
                <Header />
                <Switch>
                    <Route path = "/home" component={HomePage}/>
                    <Route exact path = "/menu" component = {()=><Menu dishes = {this.state.dishes}/>}/>
                    <Redirect to="/home"></Redirect>
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default  Main;
