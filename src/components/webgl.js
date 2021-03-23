import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import texture from './function/texture';
import rotateObject from './function/rotateObject';
import assignUVs from './function/assignUVs';
import { useSelector } from 'react-redux';
import OrbitControls from 'three-orbitcontrols';

const Webgl = (props) => {
  const {
    valueA,
    valueB,
    valueC,
    valueO,
    valueR,
    valueG,
    valueGSlope,
  } = useSelector(
    (state) => ({
      valueA: state.menuReducer.valueA,
      valueB: state.menuReducer.valueB,
      valueC: state.menuReducer.valueC,
      valueO: state.menuReducer.valueO,
      valueR: state.menuReducer.valueR,
      valueG: state.menuReducer.valueG,
      valueGSlope: state.menuReducer.valueGSlope,
    }),
    []
  );

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x404040);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
    camera.position.z = 700;

    const axesHelper = new THREE.AxesHelper(700);
    scene.add(axesHelper);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minZoom = 0.5;
    controls.maxZoom = 12;
    controls.minDistance = 10;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1.0;

    const light = new THREE.PointLight(0xffffff, 1);
    light.name = 'light';
    camera.add(light);
    scene.add(camera);

    const gridHelper = new THREE.GridHelper(10000, 1000);
    gridHelper.name = 'gridHelper';
    scene.add(gridHelper);

    /* #region  //* Material */

    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      wireframe: false,
      opacity: valueO,
      transparent: true,
      map: texture,
    });
    const extrudeSettings = {
      depth: valueC,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 2,
      bevelSize: 0,
      bevelThickness: 1,
    };
    const extrudeSettings_A_Top_bottom = {
      depth: (valueB - 130) / 2,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 2,
      bevelSize: 0,
      bevelThickness: 1,
    };
    const extrudeSettings_B_Top_bottom = {
      depth: Math.abs(valueA / 2 - 1),
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 2,
      bevelSize: 0,
      bevelThickness: 1,
    };
    const extrudeSettings_g = {
      depth: valueC - 8,
      bevelEnabled: true,
      bevelSegments: 0,
      steps: 2,
      bevelSize: 0,
      bevelThickness: 1,
    };

    /* #endregion */
    /* #region  //* Model */

    /* #region  //* หน้า A */

    /* #region  //* Plane */

    //*  Plane
    const plane_A_side_shape = new THREE.Geometry();
    plane_A_side_shape.vertices.push(
      new THREE.Vector3(0, 0, 0), // 0
      new THREE.Vector3(valueA, 0, 0), // 1
      new THREE.Vector3(valueA, 0, -2.5), // 2,
      new THREE.Vector3(0, 0, -2.5), // 3,

      new THREE.Vector3(valueA, valueC, -2.5), // 4,
      new THREE.Vector3(0, valueC, -2.5), // 5,
      new THREE.Vector3(0, valueC, 0), // 6
      new THREE.Vector3(valueA, valueC, 0) // 7
    );

    //*  Front Plane
    let face = new THREE.Face3(0, 1, 6);
    face.materialindex = 0;
    plane_A_side_shape.faces.push(face);
    face = new THREE.Face3(6, 7, 1);
    face.materialindex = 0;
    plane_A_side_shape.faces.push(face);

    //*  Back Plane
    face = new THREE.Face3(3, 2, 5);
    face.materialindex = 1;
    plane_A_side_shape.faces.push(face);
    face = new THREE.Face3(5, 4, 2);
    face.materialindex = 1;
    plane_A_side_shape.faces.push(face);

    //*  faceVertexUvs - ทำให้พื้นผิวสะท้อนแสง และเงา
    plane_A_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);
    plane_A_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);

    plane_A_side_shape.computeFaceNormals();

    const plane_A_side = new THREE.Mesh(plane_A_side_shape, material);
    plane_A_side.name = 'plane_A_side';

    /* #endregion */
    /* #region  //* Corrugate */

    //* Corrugate
    const points_a = [];

    points_a.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueA - 2.5) / 2); i += 2.5) {
      points_a.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_a.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_a = new THREE.CatmullRomCurve3(points_a);

    const points_A_curve = curve_a.getPoints(1000);

    const corrugated_A_shape = new THREE.Shape();
    corrugated_A_shape.holes.push(
      new THREE.Path().setFromPoints(points_A_curve)
    );

    const corrugate_a = new THREE.ExtrudeGeometry(
      corrugated_A_shape,
      extrudeSettings
    );

    const plane_A_corrugated = new THREE.Mesh(corrugate_a, material);
    plane_A_corrugated.name = 'plane_A_corrugated';
    plane_A_corrugated.position.z = -0.1;
    rotateObject(plane_A_corrugated, -90);

    /* #endregion */

    /* #endregion */
    /* #region  //* หน้า A (หลัง) */

    /* #region  //* Plane */

    //*  Plane
    const plane_A_back_shape = new THREE.Geometry();
    plane_A_back_shape.vertices.push(
      new THREE.Vector3(0, 0, 0), // 0
      new THREE.Vector3(Math.abs(valueA - 2.5), 0, 0), // 1
      new THREE.Vector3(Math.abs(valueA - 2.5), 0, -2.5), // 2,
      new THREE.Vector3(0, 0, -2.5), // 3,

      new THREE.Vector3(Math.abs(valueA - 2.5), valueC, -2.5), // 4,
      new THREE.Vector3(0, valueC, -2.5), // 5,
      new THREE.Vector3(0, valueC, 0), // 6
      new THREE.Vector3(Math.abs(valueA - 2.5), valueC, 0) // 7
    );

    //*  Front Plane
    face = new THREE.Face3(0, 1, 6);
    face.materialindex = 0;
    plane_A_back_shape.faces.push(face);
    face = new THREE.Face3(6, 7, 1);
    face.materialindex = 0;
    plane_A_back_shape.faces.push(face);

    //*  Back Plane
    face = new THREE.Face3(3, 2, 5);
    face.materialindex = 1;
    plane_A_back_shape.faces.push(face);
    face = new THREE.Face3(5, 4, 2);
    face.materialindex = 1;
    plane_A_back_shape.faces.push(face);

    //*  faceVertexUvs - ทำให้พื้นผิวสะท้อนแสง และเงา
    plane_A_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);
    plane_A_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);

    plane_A_back_shape.computeFaceNormals();

    const plane_A_back = new THREE.Mesh(plane_A_back_shape, material);
    plane_A_back.name = 'plane_A_back';

    /* #endregion */
    /* #region  //* Corrugate */

    //*  Corrugate
    const points_A_back = [];

    points_A_back.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueA - 7.5) / 2); i += 2.5) {
      points_A_back.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_A_back.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_A_back = new THREE.CatmullRomCurve3(points_A_back);

    const points_A_back_curve = curve_A_back.getPoints(1000);

    const corrugated_A_back_shape = new THREE.Shape();
    corrugated_A_back_shape.holes.push(
      new THREE.Path().setFromPoints(points_A_back_curve)
    );

    const corrugate_A_back = new THREE.ExtrudeGeometry(
      corrugated_A_back_shape,
      extrudeSettings
    );

    const plane_A_back_corrugated = new THREE.Mesh(corrugate_A_back, material);
    plane_A_back_corrugated.name = 'plane_A_back_corrugated';
    plane_A_back_corrugated.position.z = -0.1;
    rotateObject(plane_A_back_corrugated, -90);

    /* #endregion */

    /* #endregion */
    /* #region  //* หน้า B */

    /* #region  //* Plane */

    //*  Plane
    const plane_B_side_shape = new THREE.Geometry();
    plane_B_side_shape.vertices.push(
      new THREE.Vector3(0, 0, 0), // 0
      new THREE.Vector3(valueB, 0, 0), // 1
      new THREE.Vector3(valueB, 0, -2.5), // 2,
      new THREE.Vector3(0, 0, -2.5), // 3,

      new THREE.Vector3(valueB, valueC, -2.5), // 4,
      new THREE.Vector3(0, valueC, -2.5), // 5,
      new THREE.Vector3(0, valueC, 0), // 6
      new THREE.Vector3(valueB, valueC, 0) // 7
    );

    //*  Front Plane
    face = new THREE.Face3(0, 1, 6);
    face.materialindex = 0;
    plane_B_side_shape.faces.push(face);
    face = new THREE.Face3(6, 7, 1);
    face.materialindex = 0;
    plane_B_side_shape.faces.push(face);

    //*  Back Plane
    face = new THREE.Face3(3, 2, 5);
    face.materialindex = 1;
    plane_B_side_shape.faces.push(face);
    face = new THREE.Face3(5, 4, 2);
    face.materialindex = 1;
    plane_B_side_shape.faces.push(face);

    //*  faceVertexUvs - ทำให้พื้นผิวสะท้อนแสง และเงา
    plane_B_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_B_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);
    plane_B_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_B_side_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);

    plane_B_side_shape.computeFaceNormals();

    const plane_B_side = new THREE.Mesh(plane_B_side_shape, material);
    plane_B_side.name = 'plane_B_side';

    /* #endregion */
    /* #region  //* Corrgugate */

    //*  Corrgugate
    const points_b = [];

    points_b.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueB - 2.5) / 2); i += 2.5) {
      points_b.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_b.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_b = new THREE.CatmullRomCurve3(points_b);

    const points_B_curve = curve_b.getPoints(1000);

    const corrugated_B_shape = new THREE.Shape();
    corrugated_B_shape.holes.push(
      new THREE.Path().setFromPoints(points_B_curve)
    );

    const corrugate_b = new THREE.ExtrudeGeometry(
      corrugated_B_shape,
      extrudeSettings
    );

    const plane_B_corrugated = new THREE.Mesh(corrugate_b, material);
    plane_B_corrugated.name = 'plane_B_corrugated';
    plane_B_corrugated.position.z = -0.1;
    rotateObject(plane_B_corrugated, -90);

    /* #endregion */

    /* #endregion */
    /* #region  //* บน-ล่าง A */

    /* #region  //* Plane */

    //*  Plane
    const plane_A_top_bottom_shape = new THREE.Geometry();
    plane_A_top_bottom_shape.vertices.push(
      new THREE.Vector3(2.5, 0, 0), // 0
      new THREE.Vector3(Math.abs(valueA - 2.5), 0, 0), // 1
      new THREE.Vector3(Math.abs(valueA - 2.5), 0, -2.5), // 2,
      new THREE.Vector3(2.5, 0, -2.5), // 3,

      new THREE.Vector3(
        Math.abs(valueA - 2.5),
        Math.abs((valueB - 130) / 2),
        -2.5
      ), // 4,
      new THREE.Vector3(2.5, Math.abs((valueB - 130) / 2), -2.5), // 5,
      new THREE.Vector3(2.5, Math.abs((valueB - 130) / 2), 0), // 6
      new THREE.Vector3(Math.abs(valueA - 2.5), Math.abs((valueB - 130) / 2), 0) // 7
    );

    //*  Front Plane
    face = new THREE.Face3(0, 1, 6);
    face.materialindex = 0;
    plane_A_top_bottom_shape.faces.push(face);
    face = new THREE.Face3(6, 7, 1);
    face.materialindex = 0;
    plane_A_top_bottom_shape.faces.push(face);

    //*  Back Plane
    face = new THREE.Face3(3, 2, 5);
    face.materialindex = 1;
    plane_A_top_bottom_shape.faces.push(face);
    face = new THREE.Face3(5, 4, 2);
    face.materialindex = 1;
    plane_A_top_bottom_shape.faces.push(face);

    //*  faceVertexUvs - ทำให้พื้นผิวสะท้อนแสง และเงา
    plane_A_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);
    plane_A_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);

    plane_A_top_bottom_shape.computeFaceNormals();

    const plane_A_top_bottom = new THREE.Mesh(
      plane_A_top_bottom_shape,
      material
    );
    plane_A_top_bottom.name = 'plane_A_top_bottom';

    /* #endregion */
    /* #region  //* Corrgugate */

    //*  Corrgugate
    const points_A_top_bottom = [];

    points_A_top_bottom.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueA - 7.5) / 2); i += 2.5) {
      points_A_top_bottom.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_A_top_bottom.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_A_top_bottom = new THREE.CatmullRomCurve3(points_A_top_bottom);

    const points_A_top_bottom_curve = curve_A_top_bottom.getPoints(1000);

    const corrugated_A_top_bottom_shape = new THREE.Shape();
    corrugated_A_top_bottom_shape.holes.push(
      new THREE.Path().setFromPoints(points_A_top_bottom_curve)
    );

    const corrugated_A_top_bottom = new THREE.ExtrudeGeometry(
      corrugated_A_top_bottom_shape,
      extrudeSettings_A_Top_bottom
    );

    const plane_A_top_bottom_corrugated = new THREE.Mesh(
      corrugated_A_top_bottom,
      material
    );
    plane_A_top_bottom_corrugated.name = 'plane_A_top_bottom_corrugated';
    plane_A_top_bottom_corrugated.position.set(2.5, 0, -0.1);
    rotateObject(plane_A_top_bottom_corrugated, -90);

    /* #endregion */

    /* #endregion */
    /* #region  //* บน-ล่าง A (หลัง) */

    /* #region  //* Plane */

    //*  Plane
    const plane_A_top_bottom_back_shape = new THREE.Geometry();
    plane_A_top_bottom_back_shape.vertices.push(
      new THREE.Vector3(2.5, 0, 0), // 0
      new THREE.Vector3(Math.abs(valueA - 5), 0, 0), // 1
      new THREE.Vector3(Math.abs(valueA - 5), 0, -2.5), // 2,
      new THREE.Vector3(2.5, 0, -2.5), // 3,

      new THREE.Vector3(
        Math.abs(valueA - 5),
        Math.abs((valueB - 130) / 2),
        -2.5
      ), // 4,
      new THREE.Vector3(2.5, Math.abs((valueB - 130) / 2), -2.5), // 5,
      new THREE.Vector3(2.5, Math.abs((valueB - 130) / 2), 0), // 6
      new THREE.Vector3(Math.abs(valueA - 5), Math.abs((valueB - 130) / 2), 0) // 7
    );

    //*  Front Plane
    face = new THREE.Face3(0, 1, 6);
    face.materialindex = 0;
    plane_A_top_bottom_back_shape.faces.push(face);
    face = new THREE.Face3(6, 7, 1);
    face.materialindex = 0;
    plane_A_top_bottom_back_shape.faces.push(face);

    //*  Back Plane
    face = new THREE.Face3(3, 2, 5);
    face.materialindex = 1;
    plane_A_top_bottom_back_shape.faces.push(face);
    face = new THREE.Face3(5, 4, 2);
    face.materialindex = 1;
    plane_A_top_bottom_back_shape.faces.push(face);

    //*  faceVertexUvs - ทำให้พื้นผิวสะท้อนแสง และเงา
    plane_A_top_bottom_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_top_bottom_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);
    plane_A_top_bottom_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_A_top_bottom_back_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);

    plane_A_top_bottom_back_shape.computeFaceNormals();

    const plane_A_top_bottom_back = new THREE.Mesh(
      plane_A_top_bottom_back_shape,
      material
    );
    plane_A_top_bottom_back.name = 'plane_A_top_bottom_back';
    plane_A_top_bottom_back.position.x = 2.5;

    /* #endregion */
    /* #region  //* Corrgugate */

    //*  Corrgugate
    const points_A_top_bottom_back = [];

    points_A_top_bottom_back.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueA - 12.5) / 2); i += 2.5) {
      points_A_top_bottom_back.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_A_top_bottom_back.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_A_top_bottom_back = new THREE.CatmullRomCurve3(
      points_A_top_bottom_back
    );

    const points_A_top_bottom_back_curve = curve_A_top_bottom_back.getPoints(
      1000
    );

    const corrugated_A_top_bottom_back_shape = new THREE.Shape();
    corrugated_A_top_bottom_back_shape.holes.push(
      new THREE.Path().setFromPoints(points_A_top_bottom_back_curve)
    );

    const corrugated_A_top_bottom_back = new THREE.ExtrudeGeometry(
      corrugated_A_top_bottom_back_shape,
      extrudeSettings_A_Top_bottom
    );

    const plane_A_top_bottom_back_corrugated = new THREE.Mesh(
      corrugated_A_top_bottom_back,
      material
    );
    plane_A_top_bottom_back_corrugated.name =
      'plane_A_top_bottom_back_corrugated';
    plane_A_top_bottom_back_corrugated.position.set(5, 0, -0.1);
    rotateObject(plane_A_top_bottom_back_corrugated, -90);

    /* #endregion */

    /* #endregion */
    /* #region  //* บน-ล่าง B */

    /* #region  //* Plane */

    //*  Plane
    const plane_B_top_bottom_shape = new THREE.Geometry();
    plane_B_top_bottom_shape.vertices.push(
      new THREE.Vector3(2.5, 0, 0), // 0
      new THREE.Vector3(Math.abs(valueB - 2.5), 0, 0), // 1
      new THREE.Vector3(Math.abs(valueB - 2.5), 0, -2.5), // 2,
      new THREE.Vector3(2.5, 0, -2.5), // 3,

      new THREE.Vector3(Math.abs(valueB - 2.5), Math.abs(valueA / 2 - 1), -2.5), // 4,
      new THREE.Vector3(2.5, Math.abs(valueA / 2 - 1), -2.5), // 5,
      new THREE.Vector3(2.5, Math.abs(valueA / 2 - 1), 0), // 6
      new THREE.Vector3(Math.abs(valueB - 2.5), Math.abs(valueA / 2 - 1), 0) // 7
    );

    //*  Front Plane
    face = new THREE.Face3(0, 1, 6);
    face.materialindex = 0;
    plane_B_top_bottom_shape.faces.push(face);
    face = new THREE.Face3(6, 7, 1);
    face.materialindex = 0;
    plane_B_top_bottom_shape.faces.push(face);

    //*  Back Plane
    face = new THREE.Face3(3, 2, 5);
    face.materialindex = 1;
    plane_B_top_bottom_shape.faces.push(face);
    face = new THREE.Face3(5, 4, 2);
    face.materialindex = 1;
    plane_B_top_bottom_shape.faces.push(face);

    //*  faceVertexUvs - ทำให้พื้นผิวสะท้อนแสง และเงา
    plane_B_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_B_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);
    plane_B_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0, 1),
      new THREE.Vector2(1, 0),
    ]);
    plane_B_top_bottom_shape.faceVertexUvs[0].push([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(1, 1),
      new THREE.Vector2(0, 1),
    ]);

    plane_B_top_bottom_shape.computeFaceNormals();

    const plane_B_top_bottom = new THREE.Mesh(
      plane_B_top_bottom_shape,
      material
    );
    plane_B_top_bottom.name = 'plane_B_top_bottom';

    /* #endregion */
    /* #region  //* Corrgugate */

    //*  Corrgugate
    const points_B_top_bottom = [];

    points_B_top_bottom.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueB - 7.5) / 2); i += 2.5) {
      points_B_top_bottom.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_B_top_bottom.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_B_top_bottom = new THREE.CatmullRomCurve3(points_B_top_bottom);

    const points_B_top_bottom_curve = curve_B_top_bottom.getPoints(1000);

    const corrugated_B_top_bottom_shape = new THREE.Shape();
    corrugated_B_top_bottom_shape.holes.push(
      new THREE.Path().setFromPoints(points_B_top_bottom_curve)
    );

    const corrugated_B_top_bottom = new THREE.ExtrudeGeometry(
      corrugated_B_top_bottom_shape,
      extrudeSettings_B_Top_bottom
    );

    const plane_B_top_bottom_corrugated = new THREE.Mesh(
      corrugated_B_top_bottom,
      material
    );
    plane_B_top_bottom_corrugated.name = 'plane_B_top_bottom_corrugated';
    plane_B_top_bottom_corrugated.position.set(2.5, 0, -0.1);
    rotateObject(plane_B_top_bottom_corrugated, -90);

    /* #endregion */

    /* #endregion */
    /* #region  //* ฝาเสียบกาว */

    /* #region  //* Plane */

    //*  Plane
    const glue_Lid_shape = new THREE.Shape();

    glue_Lid_shape.moveTo(0, 0);
    glue_Lid_shape.lineTo(valueGSlope, valueG);
    glue_Lid_shape.lineTo(valueC - valueGSlope, valueG);
    glue_Lid_shape.lineTo(valueC, 0);

    const glue_lid = new THREE.ShapeGeometry(glue_Lid_shape);
    assignUVs(glue_lid);

    const plane_Glue_lid_front = new THREE.Mesh(glue_lid, material);
    plane_Glue_lid_front.name = 'plane_Glue_lid_front';
    rotateObject(plane_Glue_lid_front, 0, 0, 90);

    const plane_Glue_lid_back = new THREE.Mesh(glue_lid, material);
    plane_Glue_lid_back.name = 'plane_Glue_lid_back';
    plane_Glue_lid_back.position.z = -2.5;
    rotateObject(plane_Glue_lid_back, 0, 0, 90);

    /* #endregion */
    /* #region  //* Corrugate */

    //*  Corrugate

    const points_G = [];

    points_G.push(new THREE.Vector3(0, 0));

    for (let i = 0; i <= Math.abs((valueG - 2.5) / 2); i += 2.5) {
      points_G.push(new THREE.Vector3(i * 2 + 2.5, 2.4));
      points_G.push(new THREE.Vector3(i * 2 + 5, 0));
    }

    const curve_G = new THREE.CatmullRomCurve3(points_G);

    const points_G_curve = curve_G.getPoints(1000);

    const glue_Lid_corrugate_shape = new THREE.Shape();
    glue_Lid_corrugate_shape.holes.push(
      new THREE.Path().setFromPoints(points_G_curve)
    );

    const corrugated_Glue_lid = new THREE.ExtrudeGeometry(
      glue_Lid_corrugate_shape,
      extrudeSettings_g
    );

    const plane_Glue_lid_corrugated = new THREE.Mesh(
      corrugated_Glue_lid,
      material
    );
    plane_Glue_lid_corrugated.name = 'plane_Glue_lid_corrugated';
    plane_Glue_lid_corrugated.position.set(-valueG, valueGSlope, -0.1);
    rotateObject(plane_Glue_lid_corrugated, -90, 0, 0);

    /* #endregion */

    /* #endregion */

    /* #endregion */
    /* #region  //* Mesh - แกนหมุน */

    /* #region  //* side_A_front */

    let side_A_front = new THREE.Group();
    side_A_front.name = 'side_A_front';
    side_A_front.add(plane_A_side, plane_A_corrugated);

    let side_A_top_front = new THREE.Group();
    side_A_top_front.name = 'side_A_top_front';
    side_A_top_front.add(plane_A_top_bottom, plane_A_top_bottom_corrugated);

    let side_A_bottom_front = new THREE.Group();
    side_A_bottom_front.name = 'side_A_bottom_front';
    side_A_bottom_front.add(side_A_top_front.clone());

    /* #endregion */
    /* #region  //* side_A_back */

    const side_A_top_back = new THREE.Group();
    side_A_top_back.name = 'side_A_top_back';
    side_A_top_back.add(
      plane_A_top_bottom_back,
      plane_A_top_bottom_back_corrugated
    );

    const side_A_back = new THREE.Group();
    side_A_back.name = 'side_A_back';
    side_A_back.add(plane_A_back, plane_A_back_corrugated);
    side_A_back.position.x = -valueA + 2.5;

    let side_Glue_lid = new THREE.Group();
    side_Glue_lid.name = 'side_Glue_lid';
    side_Glue_lid.add(
      plane_Glue_lid_front,
      plane_Glue_lid_back,
      plane_Glue_lid_corrugated
    );

    /* #endregion */
    /* #region  //* side_B_left */

    let side_B_left = new THREE.Group();
    side_B_left.name = 'side_B_left';
    side_B_left.add(plane_B_side, plane_B_corrugated);
    side_B_left.position.x = -valueB;

    let side_B_top_left = new THREE.Group();
    side_B_top_left.name = 'side_B_top_left';
    side_B_top_left.add(plane_B_top_bottom, plane_B_top_bottom_corrugated);

    /* #endregion */
    /* #region  //* side_B_right */

    let side_B_right = new THREE.Group();
    side_B_right.name = 'side_B_right';
    side_B_right.add(side_B_left.clone());

    /* #endregion */

    /* #endregion */
    /* #region  //* Object3D - จุดหมุน */

    /* #region  //* pivot_A_front */

    let pivot_A_top_front = new THREE.Object3D();
    pivot_A_top_front.name = 'pivot_A_top_front';
    pivot_A_top_front.add(side_A_top_front);
    pivot_A_top_front.position.y = valueC;

    let pivot_A_bottom_front = new THREE.Object3D();
    pivot_A_bottom_front.name = 'pivot_A_bottom_front';
    pivot_A_bottom_front.add(side_A_bottom_front);
    pivot_A_bottom_front.position.z = -2.5;
    rotateObject(pivot_A_bottom_front, -180);

    let pivot_A_front = new THREE.Object3D();
    pivot_A_front.name = 'pivot_A_front';
    pivot_A_front.add(side_A_front, pivot_A_top_front, pivot_A_bottom_front);

    /* #endregion */
    /* #region  //* pivot_A_back */

    let pivot_A_top_back = new THREE.Object3D();
    pivot_A_top_back.name = 'pivot_A_top_back';
    pivot_A_top_back.add(side_A_top_back);
    pivot_A_top_back.position.set(-valueA, valueC, 0);

    let pivot_A_bottom_back = new THREE.Object3D();
    pivot_A_bottom_back.name = 'pivot_A_bottom_back';
    pivot_A_bottom_back.add(side_A_top_back.clone());
    pivot_A_bottom_back.position.set(-valueA, 0, -2.5);
    rotateObject(pivot_A_bottom_back, -180);

    let pivot_Glue_lid = new THREE.Object3D();
    pivot_Glue_lid.name = 'pivot_Glue_lid';
    pivot_Glue_lid.add(side_Glue_lid);
    pivot_Glue_lid.position.x = -valueA + 2.5;

    let pivot_A_back = new THREE.Object3D();
    pivot_A_back.name = 'pivot_A_back';
    pivot_A_back.add(
      side_A_back,
      pivot_A_top_back,
      pivot_A_bottom_back,
      pivot_Glue_lid
    );
    pivot_A_back.position.x = -valueB;

    /* #endregion */
    /* #region  //* pivot_B_left */

    let pivot_top_B_left = new THREE.Object3D();
    pivot_top_B_left.name = 'pivot_top_B_left';
    pivot_top_B_left.add(side_B_top_left);
    pivot_top_B_left.position.set(-valueB, valueC, 0);

    let pivot_bottom_B_left = new THREE.Object3D();
    pivot_bottom_B_left.name = 'pivot_bottom_B_left';
    pivot_bottom_B_left.add(side_B_top_left.clone());
    pivot_bottom_B_left.position.set(-valueB, 0, -2.5);
    rotateObject(pivot_bottom_B_left, -180);

    let pivot_B_left = new THREE.Object3D();
    pivot_B_left.name = 'pivot_B_left';
    pivot_B_left.add(
      side_B_left,
      pivot_top_B_left,
      pivot_bottom_B_left,
      pivot_A_back
    );

    /* #endregion */
    /* #region  //* pivot_B_right */

    let pivot_top_B_right = new THREE.Object3D();
    pivot_top_B_right.name = 'pivot_top_B_right';
    pivot_top_B_right.add(side_B_top_left.clone());
    pivot_top_B_right.position.set(-valueB, valueC, 0);

    let pivot_bottom_B_right = new THREE.Object3D();
    pivot_bottom_B_right.name = 'pivot_bottom_B_right';
    pivot_bottom_B_right.add(side_B_top_left.clone());
    pivot_bottom_B_right.position.set(-valueB, 0, -2.5);
    rotateObject(pivot_bottom_B_right, 180);

    let pivot_B_right = new THREE.Object3D();
    pivot_B_right.name = 'pivot_B_right';
    pivot_B_right.add(side_B_right, pivot_top_B_right, pivot_bottom_B_right);
    pivot_B_right.position.set(valueA, 0, -2.5);
    rotateObject(pivot_B_right, 0, 180);

    /* #endregion */
    /* #region  //* pivot_all */

    let pivot_all = new THREE.Object3D();
    pivot_all.name = 'pivot_all';
    pivot_all.add(pivot_A_front, pivot_B_left, pivot_B_right);

    scene.add(pivot_all);

    /* #endregion */

    /* #endregion */

    const element = document.getElementById('webgl'); //?  สร้าง element wrbgl

    if (element !== null) {
      element.appendChild(renderer.domElement);
    } //?  ถ้า element != null ให้เรนเดอร์ parent child renderer.domElement

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      element.removeChild(renderer.domElement);
    }; //?  didMount โดยการ remove parent child ของ renderer.domElement ออกไป
  }, [valueA, valueB, valueC, valueG, valueGSlope, valueO]);

  return <div id="webgl"></div>;
};

export default Webgl;