import React, { Component, createRef } from "react";
import * as d3 from "d3";

import { COLORS } from "../util/constants";

class ProxyDonut extends Component {
    constructor(props) {
        super(props);

        this.svgRef = createRef();
        this.width = 0;
        this.height = 0;
    }

    componentDidMount() {
        this.initChart();
        this.drawChart();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.category != this.props.category) {
            this.drawChart();
        }
    }

    initChart() {
        const style = window.getComputedStyle(this.svgRef.current);

        this.width = parseInt(
            style.getPropertyValue("width").replace("px", "")
        );

        this.height = parseInt(
            style.getPropertyValue("height").replace("px", "")
        );

        const svg = d3
            .select(this.svgRef.current)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .append("g")
            .attr(
                "transform",
                `translate(${this.width / 2}, ${this.height / 2})`
            );
    }

    drawChart() {
        const svg = d3.select(this.svgRef.current).select("g");

        const radius = Math.min(this.width, this.height) / 2;
        const donutWidth = 10;

        const arc = d3
            .arc()
            .padAngle(0.05)
            .innerRadius(radius - donutWidth)
            .outerRadius(radius)
            .cornerRadius(15);

        const data = [
            this.props.category.POSITIVE,
            this.props.category.NEGATIVE,
            this.props.category.NEUTRAL
        ];

        const pie = d3
            .pie()
            .value(d => d)
            .sort(null);

        const path = svg.selectAll("path").data(pie(data));

        path.enter()
            .append("path")
            .merge(path)
            .attr("d", arc)
            .attr("fill", (d, i) => {
                return [COLORS.success, COLORS.warning, COLORS.caution][i];
            })
            .attr("transform", "translate(0, 0)");

        path.exit().remove();
    }

    render() {
        return <svg ref={this.svgRef}></svg>;
    }
}

export default ProxyDonut;
