import * as THREE from 'three';

const marker = () => {
  const label = A / 6;
  const defaultUnit = { mm: 1, cm: 10, in: 25.4 };

  unit = value ? value : 'mm';

  /* #region  //* Label */

  const geometry = new THREE.PlaneBufferGeometry(label, label);
  const loader = new THREE.TextureLoader();

  const meshLabelA = new THREE.Mesh(
    // geometry.clone(),
    new THREE.MeshBasicMaterial({ map: loader.load(pictureAInput) })
  );

  const meshLabelB = new THREE.Mesh(
    // geometry.clone(),
    new THREE.MeshBasicMaterial({ map: loader.load(pictureBInput) })
  );

  const meshLabelC = new THREE.Mesh(
    // geometry.clone(),
    new THREE.MeshBasicMaterial({ map: loader.load(pictureCInput) })
  );

  const lineMarkA = new THREE.Object3D();
  lineMarkA.position.set(-(A / 2) - B, C / 2 + label, 2);
  lineMarkA.add(meshLabelA);

  const lineMarkB = new THREE.Object3D();
  lineMarkB.position.set(-(B / 2), C / 2 + label, 2);
  lineMarkB.add(meshLabelB);

  const lineMarkC = new THREE.Object3D();
  lineMarkC.position.set((A - label * 2) / 2, C / 2, 2);
  lineMarkC.add(meshLabelC);

  /* #endregion */
  /* #region  //* Text */
  const loaderTextA = new THREE.FontLoader();
  loaderTextA.load('./fonts/helvetiker_regular.typeface.json', function (font) {
    const color = 0x00000;
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });
    const message = `${
      unit === 'mm'
        ? (A / defaultUnit[unit]).toFixed(2)
        : (A / defaultUnit[unit]).toFixed(1)
    } ${unit}`;
    const shapes = font.generateShapes(message, 20);
    const geometry = new THREE.ShapeBufferGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid =
      -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    const text = new THREE.Mesh(geometry, matLite);
    lableA.add(text);
  });

  const lableA = new THREE.Object3D();
  lableA.position.set(-A / 2 - B, C / 2 - 10, 2);

  //* Start size lable.
  const lableB = new THREE.Object3D();
  lableB.position.set(-B / 2, C / 2 - 10, 2);

  const loaderTextB = new THREE.FontLoader();

  //* Start load text A.
  loaderTextB.load('./fonts/helvetiker_regular.typeface.json', function (font) {
    const color = 0x00000;
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    const message = `${
      unit === 'in'
        ? (B / defaultUnit[unit]).toFixed(2)
        : (B / defaultUnit[unit]).toFixed(1)
    } ${unit}`;
    const shapes = font.generateShapes(message, 20);
    const geometry = new THREE.ShapeBufferGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid =
      -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    const text = new THREE.Mesh(geometry, matLite);
    lableB.add(text);
  });

  //*  Font Loader Function
  const loaderTextC = new THREE.FontLoader();
  loaderTextC.load('./fonts/helvetiker_regular.typeface.json', function (font) {
    const color = 0x00000;
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide,
    });

    //*  Message
    const message = `${
      unit === 'in'
        ? (C / defaultUnit[unit]).toFixed(2)
        : (C / defaultUnit[unit]).toFixed(1)
    } ${unit}`;
    const shapes = font.generateShapes(message, 20);
    const geometry = new THREE.ShapeBufferGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid =
      -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    //*  Mesh
    const text = new THREE.Mesh(geometry, matLite);
    lableC.add(text);
  });

  //* Position.
  const lableC = new THREE.Object3D();
  lableC.position.set(A / 2 + 2 + label, C / 2 - 10, 2);

  //* Start size lable.
  const lableWidth = new THREE.Object3D();
  lableWidth.position.set(-A - B + 4 - G + 10 - C / 4 / 2, C / 2 - 10, 2);
  rotateObject(lableWidth, 0, 0, 90);

  const loaderTextWidth = new THREE.FontLoader();

  //* Start load text A.
  loaderTextWidth.load(
    './fonts/helvetiker_regular.typeface.json',
    function (font) {
      const color = 0x00000;
      const matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      });

      const message = `${
        unit === 'in'
          ? (C + (125 * 2) / defaultUnit[unit]).toFixed(2)
          : (C + (125 * 2) / defaultUnit[unit]).toFixed(1)
      } ${unit}`;
      const shapes = font.generateShapes(message, 20);
      const geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();

      const xMid =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);

      const text = new THREE.Mesh(geometry, matLite);
      lableWidth.add(text);
    }
  );

  //* Start size lable.
  const lableHeight = new THREE.Object3D();
  lableHeight.position.set(0, C + 125 + C / 4 / 2 - 10, 2);

  const loaderTextHeight = new THREE.FontLoader();

  //* Start load text A.
  loaderTextHeight.load(
    './fonts/helvetiker_regular.typeface.json',
    function (font) {
      const color = 0x00000;
      const matLite = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide,
      });

      const message = `${
        unit === 'in'
          ? (C + (125 * 2) / defaultUnit[unit]).toFixed(2)
          : (C + (125 * 2) / defaultUnit[unit]).toFixed(1)
      } ${unit}`;
      const shapes = font.generateShapes(message, 20);
      const geometry = new THREE.ShapeBufferGeometry(shapes);
      geometry.computeBoundingBox();

      const xMid =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
      geometry.translate(xMid, 0, 0);

      const text = new THREE.Mesh(geometry, matLite);
      lableHeight.add(text);
    }
  );

  /* #endregion */
  /* #region  //* Pointer */

  //*  Arrow Left
  const arrow_left = (size) => {
    const scene = new THREE.Scene();

    const arrowHead = new THREE.Shape();
    arrowHead.moveTo(0, 0);
    arrowHead.lineTo(10, 5);
    arrowHead.lineTo(10, -5);
    arrowHead.lineTo(0, 0);
    const headMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(arrowHead),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    const arrow_line = [];
    arrow_line.push(new THREE.Vector3(10, 0));
    arrow_line.push(new THREE.Vector3(size, 0));
    const arrow_mesh = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(arrow_line),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    // scene.add(headMesh, arrow_mesh);
  };

  //*  Arrow Right
  const arrow_right = (size) => {
    const scene = new THREE.Scene();

    const arrowHead = new THREE.Shape();
    arrowHead.moveTo(0, 0);
    arrowHead.lineTo(-10, 5);
    arrowHead.lineTo(-10, -5);
    arrowHead.lineTo(0, 0);
    const headMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(arrowHead),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    const arrow_line = [];
    arrow_line.push(new THREE.Vector3(-10, 0));
    arrow_line.push(new THREE.Vector3(-size, 0));
    const arrow_mesh = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(arrow_line),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    // scene.add(headMesh, arrow_mesh);
  };

  //*  Arrow Top
  const arrow_top = (size) => {
    const scene = new THREE.Scene();

    const arrowHead = new THREE.Shape();
    arrowHead.moveTo(0, 0);
    arrowHead.lineTo(5, -10);
    arrowHead.lineTo(-5, -10);
    arrowHead.lineTo(0, 0);
    const headMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(arrowHead),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    const arrow_line = [];
    arrow_line.push(new THREE.Vector3(0, -10));
    arrow_line.push(new THREE.Vector3(0, -size));
    const arrow_mesh = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(arrow_line),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    // scene.add(headMesh, arrow_mesh);
  };

  //*  Arrow Down
  const arrow_down = (size) => {
    const scene = new THREE.Scene();

    const arrowHead = new THREE.Shape();
    arrowHead.moveTo(0, 0);
    arrowHead.lineTo(5, 10);
    arrowHead.lineTo(-5, 10);
    arrowHead.lineTo(0, 0);
    const headMesh = new THREE.Mesh(
      new THREE.ShapeGeometry(arrowHead),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    const arrow_line = [];
    arrow_line.push(new THREE.Vector3(0, 10));
    arrow_line.push(new THREE.Vector3(0, size));
    const arrow_mesh = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(arrow_line),
      new THREE.MeshBasicMaterial({ color: 0x00000 })
    );

    // scene.add(headMesh, arrow_mesh);
  };

  //*  Arrow Center
  const arrow_c = (size) => {
    const scene = new THREE.Scene();

    const arrow_line = [];
    arrow_line.push(new THREE.Vector3(0, 0));
    arrow_line.push(new THREE.Vector3(-size, 0));
    const arrow_mesh = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(arrow_line),
      new THREE.MeshBasicMaterial({ color: 0x000000 })
    );

    // scene.add(arrow_mesh);
  };

  const a_arrow_l = new THREE.Object3D();
  a_arrow_l.position.set(-A - B + 2, C / 2, 2);
  a_arrow_l.add(arrow_left(A / 4)); //  <-- arrow_left([ความยาวเส้น])

  const a_arrow_r = new THREE.Object3D();
  a_arrow_r.position.set(-(A / A) - B + 2, C / 2, 2);
  a_arrow_r.add(arrow_right(A / 4));

  const b_arrow_l = new THREE.Object3D();
  b_arrow_l.position.set(-B, C / 2, 2);
  // b_arrow_l.add(arrow_left(A / 2).clone());

  const b_arrow_r = new THREE.Object3D();
  b_arrow_r.position.set(-(B / B), C / 2, 2);
  b_arrow_r.add(arrow_right(A / 2));

  const c_arrow_t = new THREE.Object3D();
  c_arrow_t.position.set((A - 1) / 2, C, 2);
  // c_arrow_t.add(arrow_top(A / 3).clone());

  const c_arrow_d = new THREE.Object3D();
  c_arrow_d.position.set((A - 1) / 2, 0, 2);
  // c_arrow_d.add(arrow_down(A / 3).clone());

  const line_height_t = new THREE.Object3D();
  // line_height_t.add(arrow_c(C / 4).clone());
  line_height_t.position.set(-A - B + 4 - G, C + 125, 2);

  const line_height_d = new THREE.Object3D();
  // line_height_d.add(arrow_c(C / 4).clone());
  line_height_d.position.set(-A - B + 4 - G, -125, 2);

  const line_width_l = new THREE.Object3D();
  // line_width_l.add(arrow_c(C / 4).clone());
  line_width_l.position.set(-A - B - G + 4, C + 125, 2);
  rotateObject(line_width_l, 0, 0, -90);

  const line_width_r = new THREE.Object3D();
  // line_width_r.add(arrow_c(C / 4).clone());
  line_width_r.position.set(A + B, C + 125, 2);
  rotateObject(line_width_r, 0, 0, -90);

  const arrow_height_t = new THREE.Object3D();
  arrow_height_t.position.set(-A - B + 4 - G - C / 4 / 2, C + 125, 2);
  // arrow_height_t.add(arrow_top(C / 1.5).clone());

  const arrow_height_d = new THREE.Object3D();
  arrow_height_d.position.set(-A - B + 4 - G - C / 4 / 2, -125, 2);
  // arrow_height_d.add(arrow_down(C / 1.5).clone());

  const arrow_width_l = new THREE.Object3D();
  arrow_width_l.position.set(-A - B - G + 4, C + 125 + C / 4 / 2, 2);
  // arrow_width_l.add(arrow_left((A + B + G) / 1.25).clone());

  const arrow_width_r = new THREE.Object3D();
  arrow_width_r.position.set(A + B, C + 125 + C / 4 / 2, 2);
  // arrow_width_r.add(arrow_right((A + B) / 1.25).clone());

  /* #endregion */
  /* #region  //* Group Scene */

  const geometryBoxGroup = new THREE.Object3D();
  geometryBoxGroup.add(
    lineMarkA,
    lineMarkB,
    lineMarkC,

    lableA,
    lableB,
    lableC,
    lableWidth,
    lableHeight,

    a_arrow_l,
    a_arrow_r,
    b_arrow_l,
    b_arrow_r,
    c_arrow_t,
    c_arrow_d,

    line_height_t,
    line_height_d,
    line_width_l,
    line_width_r,

    arrow_height_t,
    arrow_height_d,
    arrow_width_l,
    arrow_width_r
  );
  // scene.add(geometryBoxGroup);
};