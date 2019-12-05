import React, { Component } from "react";
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class Sidebar extends Component {
    constructor(props) {
    super(props);
    this.state = {
    
    };
    }
    handleChange = e => {
    let { name, value } = e.target;
    if (e.target.type === "checkbox") {
        value = e.target.checked;
    }
    };
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
                <Button color="success" onClick={() => onSave(this.state.activeItem)}>
                Go
                </Button>
            </Form>
        );
    }
}
