import React, { Component } from 'react';
import Node from '../Node/Node'
import './NodeGrid.css';

const GRID_WIDTH = 40;
const GRID_HEIGHT = 20;

interface State {
    nodes: any[];
    selectedNodes: Node[];
}

interface Props {
    
}

export default class NodeGrid extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = { nodes: [], selectedNodes: []};
    }

    componentDidMount() {
        const nodes = [];
        
        for(let i = 0; i < GRID_HEIGHT; i++) {
            const row = [];
            for(let ind = 0; ind < GRID_WIDTH; ind++) {
                row.push([]);
            }
            nodes.push(row);    
        }

        this.setState({nodes});

    }

    deleteNode(node:Node) {
        //delete node from the selected nodes
        var helper = this.state.selectedNodes;
        var index = helper.indexOf(node);
        if(index !== -1) {
            helper.splice(index, 1);
            this.setState({selectedNodes: helper});
        }
    }

    addNode(node:Node) {
        //add node to selected nodes
        this.state.selectedNodes.push(node);
        console.log(this.state.selectedNodes);
    }

    render() {
        const {nodes} = this.state;
        return(
            <div className='nodegrid'>
                {nodes.map((row:any, rowInd:number) => {
                    return <div>
                        {row.map((node:any, colInd:number) => <Node xPos={rowInd} yPos={colInd} grid={this}></Node>)}
                    </div>
                }

                )}
            </div>
        );
    }
}