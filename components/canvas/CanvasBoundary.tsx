'use client';
import { Component, type ReactNode } from 'react';
export default class CanvasBoundary extends Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <output className="canvas-fallback">
        <p>UYGHUR MEDICINAL TEA · 传统药茶</p>
        <small>
          3D is unavailable in this browser.
          <br />
          The full bilingual story remains available below.
        </small>
      </output>
    ) : (
      this.props.children
    );
  }
}
