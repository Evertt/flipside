import { cubicOut } from 'svelte/easing'

export function slide(node, { delay = 0, duration = 400, easing = cubicOut }) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const height = parseFloat(style.height);
  const padding_top = parseFloat(style.paddingTop);
  const padding_bottom = parseFloat(style.paddingBottom);
  const margin_top = parseFloat(style.marginTop);
  const margin_bottom = parseFloat(style.marginBottom);
  const border_top_width = parseFloat(style.borderTopWidth);
  const border_bottom_width = parseFloat(style.borderBottomWidth);

  return {
    delay,
    duration,
    easing,
    css: t => `overflow: hidden;` +
      `opacity: ${t * opacity};` +
      `height: ${t * height}px;` +
      `padding-top: ${t * padding_top}px;` +
      `padding-bottom: ${t * padding_bottom}px;` +
      `margin-top: ${t * margin_top}px;` +
      `margin-bottom: ${t * margin_bottom}px;` +
      `border-top-width: ${t * border_top_width}px;` +
      `border-bottom-width: ${t * border_bottom_width}px;`
  };
}