import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setA,
  setB,
  setC,
  setO,
  setG,
  setGSlope,
} from '../../../store/reducers/menuReducer';
import * as THREE from 'three';

import Init from '../../init';

import { snapLockBoxesModel } from './module/snapLockBoxesAttr';

const SnapLockBoxes = () => {
  const dispatch = useDispatch();
  const { A, B, C, O, G, GSlope, animate, lineArea, materialColor } =
    useSelector((state) => state.menuReducer);

  const [scene, setScene] = useState(new THREE.Scene());

  useEffect(() => {
    dispatch(setA(175));
    dispatch(setB(105));
    dispatch(setC(75));
    dispatch(setO(1));
    dispatch(setG(5));
    dispatch(setGSlope(4));
  }, [dispatch]); //? default side box set.

  useEffect(() => {
    const groupAll = new THREE.Group();
    groupAll.add(
      snapLockBoxesModel(A, B, C, O, G, GSlope, animate, materialColor),
      lineArea
    );

    setScene((prevState) => {
      prevState.add(groupAll);
      return prevState;
    }); //?  set state ด้วยค่า prevState ก่อนหน้า ให้ prevState = scene, prevState เพิ่ม pivot_all object.

    return () => {
      setScene(new THREE.Scene());
    };
  }, [A, B, C, O, G, GSlope, animate, lineArea, materialColor]);

  return <Init sceneModel={scene} />;
};

export default SnapLockBoxes;