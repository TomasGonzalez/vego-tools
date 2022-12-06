import * as d3 from 'd3';
import { useEffect } from 'react';

const defaultValues = {
  value: 0,
  min: -Infinity,
  max: +Infinity,
  step: 'any',
  width: 1152,
  zoomRange: [0, 1],
  zoomTranslateExtent: [-Infinity, +Infinity],
  zoomScaleExtent: [0, +Infinity],
  zoomDisabled: false,
  height: 0,
};

interface defaultValueType {
  value: number;
  min: number;
  max: number;
  step: string | number | bigint;
  width: number;
  zoomRange: number[];
  zoomTranslateExtent: number[];
  zoomScaleExtent: number[];
  zoomDisabled: boolean;
  height?: number;
}

function ruler(options: defaultValueType) {
  // Validation
  const {
    value: currentValue,
    min,
    max,
    step,
    width,
    zoomRange,
    zoomTranslateExtent,
    zoomScaleExtent,
    zoomDisabled,
    height,
  } = options;

  const pixelRange = [0, width];

  // We use the state as an intermediary to throttle the interactions
  const initState = {
    value: { currentValue, zoomRange },
    timeout: 0,
  };

  const state = createState(initState);

  // TODO: add an option in state.set to check for value equality?
  function updateCurrentValue(value: any, by: any) {
    if (value !== state.currentValue) {
      state.set('currentValue', value, { by });
    }
  }

  function updateZoomRange(value: any, by: any) {
    if (state.zoomRange.some((d: any, i: any) => d !== value[i])) {
      state.set('zoomRange', value, { by });
    }
  }

  function clamp(v: number) {
    return Math.min(Math.max(v, min), max);
  }

  function snap(v: any) {
    const reference = min === -Infinity ? 0 : min;
    const n = Math.round((v - reference) / step);
    const u = reference + n * step;
    return u > max ? u - step : u;
  }

  const restrictValue = step === 'any' ? clamp : (v: any) => snap(clamp(v));

  const zoomedScale = d3.scaleLinear().range(pixelRange);

  function getValueFromX(x: any) {
    zoomedScale.domain(state.zoomRange);
    return restrictValue(zoomedScale.invert(x));
  }

  function getXFromValue(v: any) {
    zoomedScale.domain(state.zoomRange);
    return zoomedScale(v);
  }

  function getZoomRangeFromTransform(transform: { k: number; x: number }) {
    const { k, x: tx } = transform;
    const za = -tx / k;
    const zb = (width - tx) / k;
    return [za, zb];
  }

  function getTransformFromZoomRange(zoomRange: [number, number]) {
    const [za, zb] = zoomRange;
    const k = width / (zb - za);
    const tx = -za * k;
    return d3.zoomIdentity.translate(tx, 0).scale(k);
  }

  // Create the control
  const svg = d3
    .create('svg')
    .attr('viewBox', [0, 0, width, height])
    .attr('width', width)
    .attr('height', height)
    .classed('ruler', true)
    .style('overflow', 'hidden');
  const dial = createDial(svg, { height: height / 3 });
  const control = svg.node();
  const controlInvalidation = disposal(control);
  const zoomBehavior = d3
    .zoom()
    .scaleExtent(zoomScaleExtent)
    .translateExtent([
      [zoomTranslateExtent[0], 0],
      [zoomTranslateExtent[1], 0],
    ]);

  function createDial(svg: any, { height = 20 } = {}) {
    // Draw the main shape
    const main = svg.append('g').attr('class', 'dial');

    const g = main.append('g');

    const dialShape =
      'M0 0 l 15 20 v 18 q 0 5 -5 5 h -20 q -5 0 -5 -5 v -18 l 15 -20';

    const p = g
      .append('path')
      .attr('fill', '#ccc')
      .attr('fill-opacity', '0.85')
      .attr('stroke', '#333')
      .attr('stroke-width', '1px')
      .attr('d', dialShape);

    // Add stripes for texture
    const stripes = g
      .selectAll('rect')
      .data([-7.5, -1.5, 4.5])
      .enter()
      .append('rect')
      .attr('fill', '#515151')
      .attr('width', '3')
      .attr('height', '16')
      .attr('x', (d: any) => d)
      .attr('y', '21');

    const s = Math.max(height, 6) / 20;
    g.attr('transform', `scale(${s}, ${s})`);
    main.setX = (x: any) => main.attr('transform', `translate(${x}, 0)`);
    return main;
  }

  function drawDial() {
    dial.setX(getXFromValue(state.currentValue));
  }

  function createScale(
    svg: any,
    {
      zoomRange,
      height,
      width,
      margin: { top = 0, bottom = 0 } = {},
      min,
      max,
    }: any
  ) {
    const scale = d3.scaleLinear().domain(zoomRange).range([0, width]);
    const valueFormat = d3.format('~r');
    const axisGenerator = d3
      .axisBottom(scale)
      .ticks(4)
      .tickFormat(valueFormat)
      .tickSizeInner(height - top - bottom)
      .tickSizeOuter(0);

    svg.selectAll('g.scale').remove();
    const scaleG = svg
      .append('g')
      .attr('transform', `translate(0,${top})`)
      .attr('class', 'scale') // lower: to go under the dial
      .lower();

    // background to visually mark the forbidden areas
    if (zoomRange[0] < min) {
      scaleG
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', scale(min) - scale(zoomRange[0]))
        .attr('height', height)
        .style('fill', '#ddd');
    }
    if (zoomRange[1] > max) {
      scaleG
        .append('rect')
        .attr('x', scale(max))
        .attr('y', 0)
        .attr('width', scale(zoomRange[1]) - scale(max))
        .attr('height', height)
        .style('fill', '#ddd');
    }
    const g = scaleG.append('g').attr('class', 'axis');

    axisGenerator(g);

    function addTicks(tickArg: any, length: any) {
      g.selectAll('.tick')
        .data(scale.ticks(tickArg), (d: any) => d)
        .enter()
        .append('line')
        .attr('class', 'tick')
        .attr('stroke', 'currentColor')
        .attr('y1', 0)
        .attr('y2', Math.max(length || 8, 6))
        .attr('x1', scale)
        .attr('x2', scale);
    }

    addTicks(12, height / 3);
    addTicks(100, height / 7.5);

    // style
    g.selectAll('.tick').style('color', 'black').style('stroke-width', 1);
    g.selectAll('.axis text')
      .style('transform', 'translate(2.5ch, -1em)')
      .style('font-size', `${Math.max((16 * height) / 60, 10)}px`)
      .style('color', 'grey')
      .style('user-select', 'none');

    return svg;
  }

  function drawScale() {
    createScale(svg, { zoomRange: state.zoomRange, height, width, min, max });
  }

  function updateZoom() {
    const transform = getTransformFromZoomRange(state.zoomRange);
    svg.call(zoomBehavior.transform, transform);
  }

  // init
  updateZoom();
  drawDial();
  drawScale();

  // React to changes in the state
  function onStateCurrentValue(event: any) {
    // send an event if the update comes from the control's interactions
    if (event.detail.by !== 'outside') {
      control?.dispatchEvent(new CustomEvent('input'));
    }
    // redraw
    drawDial();
  }
  state.addEventListener('currentValue', onStateCurrentValue);
  controlInvalidation.then(() =>
    state.removeEventListener('currentValue', onStateCurrentValue)
  );

  function onStateZoomRange(event: any) {
    // send an event if the update comes from the control's interactions
    if (event.detail.by !== 'outside') {
      control?.dispatchEvent(new CustomEvent('zoomed'));
    }
    if (event.detail.by !== zoomBehavior) {
      updateZoom();
    }
    drawDial();
    drawScale();
  }
  state.addEventListener('zoomRange', onStateZoomRange);
  controlInvalidation.then(() =>
    state.removeEventListener('zoomRange', onStateZoomRange)
  );

  // Interactions that modifies the current value (click, dial drag, setter)
  svg.on(
    'click',
    (event) =>
      // ignore the click if a drag has been started - https://observablehq.com/@d3/click-vs-drag
      !event.defaultPrevented &&
      d3.pointers(event).length > 0 &&
      updateCurrentValue(getValueFromX(d3.pointers(event)[0][0]), 'click')
  );
  controlInvalidation.then(() => svg.on('click', null));
  const dragBehavior = d3
    .drag()
    .on('start', () => dial.attr('cursor', 'grabbing'))
    .on('drag', (event) => updateCurrentValue(getValueFromX(event.x), 'drag'))
    .on('end', () => dial.attr('cursor', 'grab'));
  dial.call(dragBehavior);
  controlInvalidation.then(() =>
    dragBehavior.on('start', null).on('drag', null).on('end', null)
  );

  Object.defineProperty(control, 'value', {
    enumerable: true,
    get: () => state.currentValue,
    set: (value) => {
      updateCurrentValue(value, 'outside');
    },
  });

  // Interactions that change the zoom range (zoom, setter)
  if (!zoomDisabled) {
    function onZoomBehaviorZoom(event: any) {
      updateZoomRange(getZoomRangeFromTransform(event.transform), zoomBehavior);
    }
    zoomBehavior.on('zoom', onZoomBehaviorZoom);
    controlInvalidation.then(() => zoomBehavior.on('zoom', null));

    svg.call(zoomBehavior);
  }

  Object.defineProperty(control, 'zoomRange', {
    enumerable: true,
    get: () => state.zoomRange,
    set: (value) => {
      updateZoomRange(value, 'outside');
    },
  });

  // Return the control
  return control;
}

function useTimeline() {
  useEffect(() => {
    ruler(defaultValues);
  }, []);
}

export default useTimeline;
