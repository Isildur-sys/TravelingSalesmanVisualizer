import React, { Component } from 'react';
import NodeGrid from '../NodeGrid/NodeGrid';
import './Node.css'

interface State {

}

interface Props {
    nodeId:number,
    xPos:number,
    yPos:number,
    grid:NodeGrid,
    selected:boolean,
    bgColor:string,
    //selectNode: ((node:Node, clicked:Boolean) => void)
}

export default class Node extends Component<Props, State> {

    constructor(props:any) {
        super(props);
        this.state = {

        }
        
    }

    handleClick() {
        /* when node selection required to change */
        
        const newList = this.props.grid.state.nodes.map((row) => {
            
            const newRow = row.map((item:Node) => {
                if(item.props.xPos == this.props.xPos && item.props.yPos == this.props.yPos) {
                    let state = false;
                    let color = "";
                    
                    //if node has been clicked
                    if(item.props.selected === false) state = true;
                    if(item.props.selected === false) {
                        //if this is first node to be clicked set color green, red otherwise
                        if(this.props.grid.state.selectedNodes.length === 0) color = "orange"; else color = "red"
                        
                    }
                    if(item.props.selected === true) this.props.grid.deleteSelectedNode(item); else this.props.grid.addSelectedNode(item)
                    
                    return <Node nodeId={item.props.nodeId} xPos={item.props.xPos} yPos={item.props.yPos} grid={this.props.grid} selected={state} bgColor={color}/>
                } 
                return item;
            });
            return newRow;
            
        });

        this.props.grid.setState({nodes: newList});
        

    }

    render() {
        return(
            <div className="node" style={{backgroundColor: this.props.bgColor}} onClick={() => this.handleClick()}></div>
        );
    }
}