'use client';

import { useEffect, useRef } from 'react';

/**
 * HeroShader — full-bleed interactive WebGL backdrop for the homepage hero.
 *
 * Renders a warm "brass foil" iridescent shader tinted to the CBC palette
 * (paper + amber + cream + a whisper of cool gray). Reacts to mouse position
 * and clicks. Designed to sit behind the hero copy with a radial mask + vignette
 * so headline + meta cards stay readable.
 *
 * Honors prefers-reduced-motion: pauses animation and renders a single still frame.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_click;
uniform vec2 u_clickPos;

void main(){
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x,u_res.y);
  vec2 m = (u_mouse - 0.5) * 2.0;
  vec2 cp = (u_clickPos - 0.5) * 2.0;

  vec3 N = normalize(vec3(0.0, 0.0, 1.0));
  vec3 V = normalize(vec3(-m * 0.9, 1.0));
  float fres = pow(1.0 - max(dot(N,V), 0.0), 2.0);

  float stripe = sin((p.x*1.4 + p.y*0.9)*7.0 + dot(m, vec2(2.0,1.5)) + u_time*0.2);
  float band = sin(length(p-m)*5.5 - u_time*0.4);

  float dc = length(p-cp);
  float ripple = sin(dc*26.0 - u_click*12.0) * exp(-dc*2.4) * u_click;

  // CBC palette (mirrors @theme tokens in globals.css)
  vec3 paper = vec3(0.051, 0.043, 0.031);   // --color-paper        #0d0b08
  vec3 deep  = vec3(0.13, 0.09, 0.06);
  vec3 amber = vec3(0.83, 0.54, 0.27);      // --color-accent       #c98245
  vec3 cream = vec3(1.00, 0.953, 0.902);    // --color-ink          #fff3e6
  vec3 cool  = vec3(0.604, 0.706, 0.784);   // --color-cool         #9ab4c8

  float w = 0.5 + 0.5*stripe + 0.2*band + dot(p, m)*0.4 + ripple;
  vec3 col = mix(paper, deep, 0.5 + 0.5*p.y);
  col = mix(col, amber, smoothstep(0.1, 0.7, w));
  col = mix(col, cream, smoothstep(0.7, 1.05, w));
  col = mix(col, cool*0.55, smoothstep(0.55, 1.0, fres) * 0.18);

  float spec = pow(max(0.0, 1.0 - length(p-m)*1.2), 8.0);
  col += spec * cream * 0.55;

  float sp = step(
    0.997,
    fract(sin(dot(floor(gl_FragCoord.xy*0.5), vec2(12.9898,78.233))) * 43758.5453 + u_time*0.5)
  );
  col += sp * 0.55 * cream;

  col *= 1.0 - 0.22 * length(p);
  gl_FragColor = vec4(col, 1.0);
}
`;

type State = {
  mouse: [number, number];
  target: [number, number];
  click: number;
  clickPos: [number, number];
  start: number;
};

export function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('HeroShader compile error', gl.getShaderInfoLog(s));
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uClick = gl.getUniformLocation(prog, 'u_click');
    const uClickPos = gl.getUniformLocation(prog, 'u_clickPos');

    const state: State = {
      mouse: [0.5, 0.5],
      target: [0.5, 0.5],
      click: 0,
      clickPos: [0.5, 0.5],
      start: performance.now(),
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = container.clientWidth;
      const h = container.clientHeight;
      canvas.width = Math.max(2, Math.floor(w * dpr));
      canvas.height = Math.max(2, Math.floor(h * dpr));
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    // Track mouse globally relative to the container — feels right when the
    // shader is full-bleed behind a hero, even if the cursor is over text.
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      state.target = [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
    };
    const onDown = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      state.click = 1.0;
      state.clickPos = [
        (e.clientX - r.left) / r.width,
        1 - (e.clientY - r.top) / r.height,
      ];
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);

    let raf = 0;
    const draw = () => {
      state.mouse[0] += (state.target[0] - state.mouse[0]) * 0.08;
      state.mouse[1] += (state.target[1] - state.mouse[1]) * 0.08;
      state.click *= 0.94;
      const t = reduceMotion ? 0 : (performance.now() - state.start) / 1000;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, state.mouse[0], state.mouse[1]);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uClick, state.click);
      gl.uniform2f(uClickPos, state.clickPos[0], state.clickPos[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="hero-shader" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="hero-shader__veil" />
    </div>
  );
}
