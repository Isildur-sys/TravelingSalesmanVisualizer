import React, {useEffect} from 'react';
import NodeGrid from '../NodeGrid/NodeGrid';
import Node from '../Node/Node'
import { getNodeText } from '@testing-library/dom';

let index:number = 0;

export const bruteForce = (grid:NodeGrid) => {
    const nodes:Node[] = grid.state.selectedNodes;
    let solution:Node[] = []; //best solution found 
    let solutionLength:number; //length of the best solution
    console.log(nodes)

    traversePoints(nodes, grid); 
    
}

const traversePoints = (nodes:Node[], grid:NodeGrid) => {
    let ind = 1;
    let currNode:Node = nodes[0];
    let endNode:Node = nodes[1];

    var id = setInterval(() => {
        let helperNode = grid.nextNode(currNode, endNode);

        if(helperNode === null) {
            if(ind === nodes.length){
                clearInterval(id); 
                return;
            }
            endNode = nodes[ind];
            ind++;
        } else {
            currNode = helperNode;
            grid.visualizeNode(currNode, "purple");
        }
        
    }, 100)
}
