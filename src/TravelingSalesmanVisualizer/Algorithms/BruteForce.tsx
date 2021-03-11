import React, {useEffect} from 'react';
import NodeGrid from '../NodeGrid/NodeGrid';
import Node from '../Node/Node'
import { getNodeText } from '@testing-library/dom';
import { factory } from 'typescript';

let permutations:any = [];
let originalNodes:Node[] = [];
let solution:Node[] = []; //best solution found 
let solutionLength:number; //length of the best solution

export const bruteForce = (grid:NodeGrid) => {
    let nodes:Node[] = [];
    if(originalNodes.length === 0) {
        originalNodes = grid.state.selectedNodes;
        nodes = originalNodes;
        createPermutationList(originalNodes.length-1);
        console.log(permutations);
    } else {
        let isEqual:boolean = false;
        for(let i = 0; i < originalNodes.length - 1; i++) {
            if(originalNodes[i].props.nodeId !== nodes[i].props.nodeId) {
                isEqual = true;
            }
        }
        
    }
    let perms:any = [];
    for(let i = 0; i < 6; i++) {
        perms = nextPermutation(permutations, []);
        console.log(perms + " <--- " + i)
     
    }
    console.log(permutations)
    traversePoints(nodes, grid);
}

const createPermutationList = (n:number):any => {
    let res = [0]
    if(permutations.length === 0) {
        permutations.push(0);
    }
    for(let i = 0; i < n; i++) {
        if(originalNodes.length-1 === n) {
            permutations.push(createPermutationList(n-1));
        } else if(n === 1){
            return [0];
        } else {
            res.push(createPermutationList(n-1))
        }
    }
    return res;
}

const nextPermutation = (list:Array<any>, result:Array<number>):Array<number> => {  
    
    let length = list.length-1; //exclude the counter in the beginning of every array

    if(list.length === 1) {
        list[0] = list[0] + 1;
        console.log("returning")
        return result;
    }

    for(let i = 1; i < list.length; i++) {
        if(list[i][0] < factorial(length)/length) {
            result.push(i-1);
            list[0] = list[0] + 1;
            return nextPermutation(list[i], result);
        }
        
        
    }
    return [];
}

const factorial = (x:number):number => {
    return (x > 1) ? x * factorial(x-1) : 1;
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
