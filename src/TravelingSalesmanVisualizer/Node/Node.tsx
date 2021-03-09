import React, { Component } from 'react';
import NodeGrid from '../NodeGrid/NodeGrid';
import './Node.css'

interface State {
    bgColor:string
    selected:boolean
}

interface Props {
    xPos:number,
    yPos:number,
    grid:NodeGrid
}

export default class Node extends Component<Props, State> {
    constructor(props:any) {
        super(props);
        this.state = {
            bgColor: "",
            selected: false
        }
    }


    handleClick = () => {
        /* when node clicked select/unselect it and add/delete node from 
        grid nodes */
        if(this.state.selected == true) {
            this.setState({selected: false});
            this.setState({bgColor: ""});
            this.props.grid.deleteNode(this);
            return;
        }
        this.setState({selected: true});
        this.setState({bgColor: "blue"});
        this.props.grid.addNode(this);
        
    }

    render() {
        return(
            <div className="node" style={{backgroundColor: this.state.bgColor}} onClick={this.handleClick}></div>
        );
    }
}