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
        <p>THE NATURE VESSEL</p>
        <small>
          3D is unavailable in this browser.
          <br />
          Explore the tea through the story below.
        </small>
      </output>
    ) : (
      this.props.children
    );
  }
}
