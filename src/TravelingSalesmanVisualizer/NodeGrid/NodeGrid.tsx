import { start } from 'node:repl';
import React, { Component } from 'react';
import Node from '../Node/Node'
import './NodeGrid.css';
import { bruteForce } from  '../Algorithms/BruteForce'

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
        //this.selectNode = this.selectNode.bind(this);
    }

    componentDidMount() {
        const nodes = [];
        let keyInd = 0;
        for(let colInd = 0; colInd < GRID_HEIGHT; colInd++) {
            const row:any = [];
            for(let rowInd = 0; rowInd < GRID_WIDTH; rowInd++) {
                row.push(<Node key={keyInd} nodeId={keyInd} xPos={colInd} yPos={rowInd} grid={this} selected={false} bgColor={""}/>);
                keyInd++;
            }
            nodes.push(row);    
        }

        this.setState({nodes});

    }

    deleteSelectedNode(node:Node) {
        //delete node from the selected nodes
        var helper = this.state.selectedNodes;
        var index = -1;

        helper.find((item, ind) => {
            if(item.props.nodeId === node.props.nodeId) return index = ind;
        });
        console.log(index)
        if(index !== -1) {
            helper.splice(index, 1);
            this.setState({selectedNodes: helper});
        }
    }

    addSelectedNode(node:Node) {
        //add node to selected nodes
        this.state.selectedNodes.push(node);
    }

    nextNode(startNode:Node, goalNode:Node): Node | null {
        //returns null if new node not found or goal and start are the same
        if(startNode.props.nodeId === goalNode.props.nodeId) return null; //check if goal and start the same

        let nextNodeX = startNode.props.xPos;
        let nextNodeY = startNode.props.yPos;

        if(startNode.props.xPos > goalNode.props.xPos) {
            nextNodeX -= 1;
  
        } else if (startNode.props.xPos < goalNode.props.xPos) {
            nextNodeX += 1;
           
        } 

        if(startNode.props.yPos > goalNode.props.yPos) {
            nextNodeY -= 1;
           
        } else if(startNode.props.yPos < goalNode.props.yPos) {
            nextNodeY += 1;
           
        }

        let found:Node | undefined;
        for(let indx = 0; indx < this.state.nodes.length; indx++) {
            let arr = this.state.nodes[indx];
            for(let i = 0; i < arr.length; i++) {
                if(arr[i].props.yPos === nextNodeY && arr[i].props.xPos === nextNodeX) {
                    if(arr[i].props.selected === true && arr[i].props.nodeId !== goalNode.props.nodeId) {
                        if(nextNodeX-startNode.props.xPos !== 0 && nextNodeY-startNode.props.yPos !== 0) {
                            nextNodeX = startNode.props.xPos;
                        } else {
                            if(nextNodeX === startNode.props.xPos) nextNodeX++; else nextNodeY++;
                        }
                        i = 0;
                        indx = 0;
                    } else {    
                        found = arr[i];
                        i = arr.length;
                        indx = this.state.nodes.length;
                    }
                }
            }
        }
        /* this.state.nodes.forEach((arr) => {
            for(let i = 0; i < arr.length-1; i++) {
                if(arr[i].props.yPos === nextNodeY && arr[i].props.xPos === nextNodeX) {
                    found = arr[i];
                }
            }
        }); */
        
        //returns next node if found, otherwise null
        return found !== undefined ? found : null;
    }

    visualizeNode(node:Node | null, color:string) {
        //changes color of individual node. Used for visualizations
        if(node !== null) {
            const newList = this.state.nodes.map((row) => {
                
                const newRow = row.map((item:Node) => {
                    if(item.props.nodeId == node.props.nodeId && node.props.bgColor !== "red" ) {
                        //if we need to do visualizations without clicking(selecting)
                        color = color;
                        if(item.props.bgColor === "purple") {
                            color = "black"
                        };
                        return <Node key={item.props.nodeId} nodeId={item.props.nodeId} xPos={item.props.xPos} yPos={item.props.yPos} grid={this} selected={false} bgColor={color}/>
                    } 
                    return item;
                });
                return newRow;
                
            });
            this.setState({nodes: newList});
        }

    }

    clearPaths = () => {
        const newList = this.state.nodes.map((row) => {
                
            const newRow = row.map((item:Node) => {
                if(item.props.bgColor !==  "red") {
                    return <Node key={item.props.nodeId} nodeId={item.props.nodeId} xPos={item.props.xPos} yPos={item.props.yPos} grid={this} selected={false} bgColor={""}/>
                } 
                return item;
            });
            return newRow;
            
        });
        this.setState({nodes: newList});
    }

    render() {
        const {nodes} = this.state;
        return(
            
            <div className='nodegrid'>
                <div> <button onClick={() => bruteForce(this)}></button> </div>
                {nodes.map((row:any, rowInd:number) => {
                    return <div>
                        {row.map((node:Node, colInd:number) => node)}
                    </div>
                }

                )}
            </div>
        );
    }
}