import * as image from "../../dist/platform.svg";
import * as $ from "jquery";
import {Svg, Bodies} from "matter-js";

let vertexSets: any[] = [];

$(image).find('path').each(function(i, path: any) {
    vertexSets.push(Svg.pathToVertices(path, 30));
});

export default Bodies.fromVertices(400, 80, vertexSets, {
    isStatic: true,
    friction: 0,
    restitution: 1,
    render: {
        // fillStyle: 'red',
        // strokeStyle: 'blue',
        // lineWidth: 3
    }
}, true);
