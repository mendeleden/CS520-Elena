import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        console.log("From Side Bar")
        console.log(this.props.name)
        this.state = {
            address_from: "",
            address_to: "",
            route_opt: "",
            data : ""
        };
    }

    onsearchClick = e => {
        e.preventDefault();
        axios
        .get("http://ec2-3-85-127-123.compute-1.amazonaws.com:8000/simple/route/216,%20Pond%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States/14,%20Mill%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States")
        .then(res => { 
            console.log(res.data.lat_lon_steps); 
            console.log(res.data.midpoint_lat);
            console.log(res.data.midpoint_lon);
            this.setState({value: res.data.lat_lon_steps});
        })
        .catch(err => console.log(err));
      };
    
    submitRoute() {
        axios
            .get("http://ec2-3-85-127-123.compute-1.amazonaws.com:8000/simple/route/216,%20Pond%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States/14,%20Mill%20Street,%20Natick,%20Massachusetts,%2001760,%20United%20States")
            .then(res => this.setRoute(res))
            .catch(err => console.log(err));
    }

    render() {
        const { toggle, onSave } = this.props;
        return (
            <Form className="sidebar">
                <FormGroup>
                    <Label for="address_from">From: </Label>
                    <Input
                        type="text"
                        name="address_from"
                        value={this.state.address_from}
                        onChange={this.handleChange}
                        placeholder="Enter Address"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="address_to">To: </Label>
                    <Input
                        type="text"
                        name="address_to"
                        value={this.state.address_to}
                        onChange={this.handleChange}
                        placeholder="Enter Address"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="route_opt">Route Options: </Label>
                    <Input
                        type="text"
                        name="route_opt"
                        checked={this.state.route_opt}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button type="submit">
                    onClick={this.onsearchClick}>
                    Go
                </Button>
            </Form>
        );
    }
}

export default Sidebar;
