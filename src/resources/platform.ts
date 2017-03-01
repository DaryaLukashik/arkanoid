import * as image from "../../dist/platform.svg";
import * as $ from "jquery";
import {Svg, Bodies} from "matter-js";

let vertexSets: any[] = [];

$(image).find('path').each(function(i, path: any) {
    vertexSets.push(Svg.pathToVertices(path, 30));
});

export default Bodies.fromVertices(400, 80, vertexSets, {
    inertia: Infinity,
    isStatic: true,
    friction: 0,
    restitution: 1,
    render: {
    }
}, true);
