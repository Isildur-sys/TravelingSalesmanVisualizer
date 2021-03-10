import React, {Component} from 'react';
import NodeGrid from './NodeGrid/NodeGrid'

export default class TravelingSalesmanVisualizer extends Component {
    private grid:any;
    constructor(props:any) {
        super(props);
        this.grid = React.createRef();
    }

    componentDidMount() {
        console.log(this.grid);
    }

    render() {
        return(
            <div>foo
                <NodeGrid ref={this.grid}></NodeGrid>
            </div>
        );
    }
}