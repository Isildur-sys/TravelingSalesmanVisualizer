import React, {useEffect} from 'react';
import NodeGrid from '../NodeGrid/NodeGrid';
import Node from '../Node/Node'
import { getNodeText } from '@testing-library/dom';
import { factory } from 'typescript';

let solution:Node[] = []; //best solution found 
let solutionLength:number; //length of the best solution

let permutationNodes:Node[];
let start:Node;
let n:Number;
let c:any[];
let index:any;

export const bruteForce = (grid:NodeGrid) => {
    permutationNodes =  grid.state.selectedNodes.slice();
    start = permutationNodes[0]; //store first node
    permutationNodes.shift(); //delete first node, no need for it when generating permutations
    n = permutationNodes.length;
    c = [];
    index = 0;
    for(index = 0;index < n; index++) {
        c[index] = 0;
    }

    index = 1;
    traversePoints(grid.state.selectedNodes, grid); //start visualizations with nodes in the initial order
}

export const generateNewIteration = (grid:NodeGrid) => {
    //switches node positions around with Heap's algorithm to create the next path to visualize
    if(index < n) {
        let temp;
        if(c[index] < index) {
            
            let resultNodes = [start]; //store nodes for the next visualization, including starting node
            
            if(index%2 === 0) {
                temp = permutationNodes[0];
                permutationNodes[0] = permutationNodes[index];
                permutationNodes[index] = temp;
            } else {
                temp = permutationNodes[c[index]];
                permutationNodes[c[index]] = permutationNodes[index];
                permutationNodes[index] = temp;
            }
            resultNodes.push.apply(resultNodes, permutationNodes);
            traversePoints(resultNodes, grid);
            grid.clearPaths();
            c[index] += 1;
            index = 1;
        } else {
            c[index] = 0;
            index += 1;
            generateNewIteration(grid); //next iteration
        }
    }

}

const traversePoints = (nodes:Node[], grid:NodeGrid) => {
    //visualizes given path
    let ind = 1;
    let currNode:Node = nodes[0];
    let endNode:Node = nodes[1];

    var id = setInterval(() => {
        let helperNode = grid.nextNode(currNode, endNode);
        
        if(helperNode === null) {
            if(ind === nodes.length){
                clearInterval(id);
                return generateNewIteration(grid); //call to generate new visualization
            }
            endNode = nodes[ind];
            ind++;
        } else {
            currNode = helperNode;
            grid.visualizeNode(currNode, "purple");
        }
        
    }, 50)

}