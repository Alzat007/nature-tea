The current experience uses Three.js standard PBR shaders and instanced matrices.
Tea leaf motion is calculated by TeaLeaves and TeaSwarm without allocating objects
per frame. This folder is reserved for optional GLSL motion when larger particle
counts justify moving the existing deterministic noise function to the GPU.
