import React, { Component } from 'react';
import Node from '../Node/Node'
import './NodeGrid.css';

const GRID_WIDTH = 40;
const GRID_HEIGHT = 20;

interface State {
    nodes: any[];
}

interface Props {
    
}

export default class NodeGrid extends Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = { nodes: [] };
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


    render() {
        const {nodes} = this.state;
        console.log(nodes);
        return(
            <div className='nodegrid'>
                {nodes.map((row:any, index:any) => {
                    return <div>
                        {row.map((node:any, nodeInd:any) => <Node></Node>)}
                    </div>
                }

                )}
            </div>
        );
    }
}