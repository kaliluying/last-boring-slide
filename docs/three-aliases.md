# three.js aliases used by the deck code

The bundle re-exports three.js through getter objects, so every `THREE.X` in the original
source became a short local name. This table resolves the aliases that appear in
`src/deck/*.js` (80 symbols; identifier nodes counted with babel, so
property names and `for (... of ...)` are not miscounted).

| alias | three.js export | uses |
|-------|-----------------|------|
| `F` | `Vector3` | 172 |
| `Zt` | `Mesh` | 67 |
| `$t` | `BufferAttribute` | 65 |
| `re` | `GLSL3` | 58 |
| `Nt` | `Vector2` | 56 |
| `oe` | `DoubleSide` | 55 |
| `ce` | `RawShaderMaterial` | 54 |
| `pe` | `OneFactor` | 53 |
| `ie` | `Vector4` | 46 |
| `ne` | `Matrix4` | 44 |
| `ge` | `Scene` | 40 |
| `Qt` | `BufferGeometry` | 39 |
| `Ie` | `CustomBlending` | 28 |
| `Ue` | `InstancedBufferAttribute` | 27 |
| `Oe` | `InstancedBufferGeometry` | 24 |
| `je` | `OneMinusSrcAlphaFactor` | 22 |
| `Ke` | `PlaneGeometry` | 22 |
| `qe` | `Quaternion` | 20 |
| `an` | `RepeatWrapping` | 19 |
| `ae` | `Float32BufferAttribute` | 18 |
| `Be` | `Sphere` | 16 |
| `$e` | `UnsignedByteType` | 15 |
| `He` | `LinearFilter` | 14 |
| `On` | `CylinderGeometry` | 14 |
| `Se` | `Matrix3` | 14 |
| `Hn` | `CanvasTexture` | 13 |
| `Ye` | `PerspectiveCamera` | 13 |
| `Mn` | `NoColorSpace` | 12 |
| `Je` | `NearestFilter` | 11 |
| `In` | `Camera` | 10 |
| `Pn` | `LinearMipmapLinearFilter` | 10 |
| `ci` | `SphereGeometry` | 10 |
| `Cn` | `Euler` | 10 |
| `Nn` | `HalfFloatType` | 9 |
| `Vi` | `DynamicDrawUsage` | 9 |
| `Kn` | `Group` | 8 |
| `Tn` | `DataTexture` | 8 |
| `An` | `FloatType` | 7 |
| `Hi` | `InstancedMesh` | 7 |
| `Mi` | `BoxGeometry` | 7 |
| `ni` | `ShaderMaterial` | 7 |
| `Un` | `RGBAFormat` | 6 |
| `bo` | `AdditiveBlending` | 6 |
| `Ci` | `OrthographicCamera` | 5 |
| `yo` | `TorusGeometry` | 5 |
| `wo` | `ZeroFactor` | 5 |
| `Zi` | `Points` | 5 |
| `de` | `Color` | 5 |
| `Io` | `TubeGeometry` | 4 |
| `go` | `IcosahedronGeometry` | 4 |
| `ei` | `ClampToEdgeWrapping` | 3 |
| `Jn` | `WebGLRenderTarget` | 3 |
| `Bi` | `DepthTexture` | 3 |
| `hi` | `UnsignedIntType` | 3 |
| `ts` | `RedFormat` | 3 |
| `ro` | `Shape` | 3 |
| `Fo` | `NormalBlending` | 3 |
| `Vs` | `CapsuleGeometry` | 3 |
| `lo` | `FrontSide` | 3 |
| `Qi` | `RGFormat` | 3 |
| `Ai` | `Curve` | 2 |
| `Ws` | `ExtrudeGeometry` | 2 |
| `qs` | `CatmullRomCurve3` | 2 |
| `Ea` | `LessEqualCompare` | 2 |
| `$o` | `Data3DTexture` | 2 |
| `ba` | `TextureLoader` | 2 |
| `Of` | `WebGLRenderer` | 1 |
| `Mo` | `NoToneMapping` | 1 |
| `ms` | `NoBlending` | 1 |
| `Xl` | `InstancedInterleavedBuffer` | 1 |
| `Zo` | `InterleavedBufferAttribute` | 1 |
| `gl` | `WebGL3DRenderTarget` | 1 |
| `Zu` | `DstAlphaFactor` | 1 |
| `Ju` | `OneMinusDstAlphaFactor` | 1 |
| `fr` | `LatheGeometry` | 1 |
| `lr` | `CircleGeometry` | 1 |
| `yl` | `DataUtils` | 1 |
| `fn` | `Object3D` | 1 |
| `dr` | `ShapeGeometry` | 1 |
| `hr` | `RingGeometry` | 1 |
